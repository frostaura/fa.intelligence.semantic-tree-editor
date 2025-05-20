// src/Diagrams/diagramUtils.tsx
import React from 'react';
import { Position, Topic } from './types';

export const calculateNodePositions = (nodes: Topic[]): Record<string, Position> => {
  const positions: Record<string, Position> = {};
  const layerSpacing = 500;
  const nodeSpacing = 350;

  // Position 'person' nodes (users) at the top.
  const users = nodes.filter((n) => n.type === 'person');
  users.forEach((user, i) => {
    positions[user.id] = {
      x: (i - (users.length - 1) / 2) * nodeSpacing,
      y: -layerSpacing * 1.5,
    };
  });

  // Position layers and their components.
  const layers = ['ui_layer', 'api_layer', 'persistence_layer', 'external_services'];
  layers.forEach((layerId, layerIndex) => {
    const layerY = layerIndex * layerSpacing - layerSpacing / 2;
    positions[layerId] = { x: 0, y: layerY };

    const layerComponents = nodes.filter((n) => n.parent === layerId);
    layerComponents.forEach((component, i) => {
      positions[component.id] = {
        x: (i - (layerComponents.length - 1) / 2) * nodeSpacing,
        y: layerY,
      };
    });
  });

  return positions;
};

export const calculateIntersectionPoint = (
  fromPos: Position,
  toPos: Position,
  fromId: string,
  toId: string,
  nodeWidth: number,
  nodeHeight: number
) => {
  const dx = toPos.x - fromPos.x;
  const dy = toPos.y - fromPos.y;
  const angle = Math.atan2(dy, dx);
  const w = nodeWidth / 2;
  const h = nodeHeight / 2;
  const absX = Math.abs(Math.cos(angle));
  const absY = Math.abs(Math.sin(angle));
  let x, y;
  if (absX * h <= absY * w) {
    y = h * Math.sign(dy);
    x = (y * dx) / dy;
  } else {
    x = w * Math.sign(dx);
    y = (x * dy) / dx;
  }
  return { x, y };
};

export const calculatePath = (
  from: Position,
  to: Position,
  fromId: string,
  toId: string,
  nodeWidth: number,
  nodeHeight: number
) => {
  const fromIntersect = calculateIntersectionPoint(from, to, fromId, toId, nodeWidth, nodeHeight);
  const toIntersect = calculateIntersectionPoint(to, from, toId, fromId, nodeWidth, nodeHeight);

  const startPoint = {
    x: from.x + fromIntersect.x,
    y: from.y + fromIntersect.y,
  };

  const endPoint = {
    x: to.x + toIntersect.x,
    y: to.y + toIntersect.y,
  };

  const dx = endPoint.x - startPoint.x;
  const dy = endPoint.y - startPoint.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const controlPointOffset = Math.min(distance * 0.3, 100);

  const midX = (startPoint.x + endPoint.x) / 2;
  const midY = (startPoint.y + endPoint.y) / 2;

  const controlPoint1 = {
    x: startPoint.x + (midX - startPoint.x) * 0.5,
    y: startPoint.y + (midY - startPoint.y) * 0.5 + controlPointOffset,
  };

  const controlPoint2 = {
    x: endPoint.x - (endPoint.x - midX) * 0.5,
    y: endPoint.y - (endPoint.y - midY) * 0.5 + controlPointOffset,
  };

  return `M ${startPoint.x},${startPoint.y} C ${controlPoint1.x},${controlPoint1.y} ${controlPoint2.x},${controlPoint2.y} ${endPoint.x},${endPoint.y}`;
};

export const calculateLabelPosition = (
  start: Position,
  end: Position,
  fromParent: string | undefined,
  toParent: string | undefined,
  nodePositions: Record<string, Position>
) => {
  const layers = ['ui_layer', 'api_layer', 'persistence_layer', 'external_services'];
  const fromLayerIndex = layers.indexOf(fromParent || '');
  const toLayerIndex = layers.indexOf(toParent || '');
  const fromLayerY = fromParent ? nodePositions[fromParent].y : start.y;
  const toLayerY = toParent ? nodePositions[toParent].y : end.y;
  const labelX = (start.x + end.x) / 2;
  let labelY;
  if (fromLayerIndex !== toLayerIndex) {
    const upperY = Math.min(fromLayerY, toLayerY);
    const lowerY = Math.max(fromLayerY, toLayerY);
    labelY = upperY + (lowerY - upperY) * 0.35;
  } else {
    labelY = fromLayerY - 180;
  }
  if (fromParent === 'persistence_layer' || toParent === 'persistence_layer') {
    labelY -= 40;
  }
  return { x: labelX, y: labelY };
};

export const renderSystemBoundary = (
  system: Topic,
  childNodes: Topic[],
  nodePositions: Record<string, Position>
) => {
  if (childNodes.length === 0) return null;
  const padding = 180;
  const childPositions = childNodes
    .map((node) => nodePositions[node.id])
    .filter(Boolean) as Position[];
  if (childPositions.length === 0) return null;
  const minX = Math.min(...childPositions.map((p) => p.x)) - padding;
  const maxX = Math.max(...childPositions.map((p) => p.x)) + padding;
  const minY = Math.min(...childPositions.map((p) => p.y)) - padding;
  const maxY = Math.max(...childPositions.map((p) => p.y)) + padding;

  return (
    <g key={`boundary-${system.id}`}>
      <rect
        x={minX}
        y={minY}
        width={maxX - minX}
        height={maxY - minY}
        fill="none"
        stroke="#475569"
        strokeWidth={1.5}
        strokeDasharray="6 4"
        rx={12}
        className="opacity-40"
      />
      <text x={minX + 20} y={minY - 15} fill="#94A3B8" className="text-sm font-semibold">
        {system.title}
      </text>
    </g>
  );
};
