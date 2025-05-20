// src/Diagrams/DiagramRenderer.tsx
import React, {
  useState,
  useCallback,
  useRef,
  useMemo,
  MouseEvent,
  WheelEvent,
  FC,
} from 'react';
import {DiagramNode} from './DiagramNode';
import { DiagramControls } from './DiagramControls';
import { DiagramTooltip } from './DiagramTooltip';
import { Topic, Position } from './types';
import {
  calculateNodePositions,
  calculatePath,
  calculateLabelPosition,
  renderSystemBoundary,
} from './DiagramUtils';

// Import node colors from DiagramNode
import { NODE_COLORS } from './DiagramNode';

const NODE_WIDTH = 240;
const NODE_HEIGHT = 100;
const DEFAULT_SCALE = 0.5;

interface DiagramRendererProps {
  data: Topic[];
}

export const DiagramRenderer: FC<DiagramRendererProps> = ({ data }) => {
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: DEFAULT_SCALE });
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState<Position>({ x: 0, y: 0 });
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<Position>({ x: 0, y: 0 });
  const svgRef = useRef<SVGSVGElement>(null);

  // Panning & Zooming handlers
  const handleWheel = useCallback((e: WheelEvent<SVGSVGElement>) => {
    e.preventDefault();
    const scaleFactor = e.deltaY > 0 ? 0.9 : 1.1;
    setTransform((prev) => ({
      ...prev,
      scale: Math.max(0.1, Math.min(2, prev.scale * scaleFactor)),
    }));
  }, []);

  const handleMouseDown = useCallback((e: MouseEvent<SVGSVGElement>) => {
    setDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent<SVGSVGElement>) => {
      if (!dragging) return;
      const dx = e.clientX - dragStart.x;
      const dy = e.clientY - dragStart.y;
      setTransform((prev) => ({
        ...prev,
        x: prev.x + dx,
        y: prev.y + dy,
      }));
      setDragStart({ x: e.clientX, y: e.clientY });
    },
    [dragging, dragStart]
  );

  const handleMouseUp = useCallback(() => {
    setDragging(false);
  }, []);

  // Node hover handlers for the tooltip.
  const handleNodeMouseEnter = useCallback((e: MouseEvent, nodeId: string) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (rect) {
      setTooltipPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
    setHoveredNode(nodeId);
  }, []);

  const handleNodeMouseLeave = useCallback(() => {
    setHoveredNode(null);
  }, []);

  // Zoom control functions.
  const zoomIn = () => {
    setTransform((prev) => ({
      ...prev,
      scale: Math.min(2, prev.scale * 1.2),
    }));
  };

  const zoomOut = () => {
    setTransform((prev) => ({
      ...prev,
      scale: Math.max(0.1, prev.scale * 0.8),
    }));
  };

  const resetView = () => {
    setTransform({ x: 0, y: 0, scale: DEFAULT_SCALE });
  };

  const nodePositions = useMemo(() => calculateNodePositions(data), [data]);
  const hoveredTopic = hoveredNode ? data.find((t) => t.id === hoveredNode) : null;

  return (
    <div className="relative w-full h-full min-h-screen bg-[#020617] overflow-hidden">
      <DiagramControls zoomIn={zoomIn} zoomOut={zoomOut} resetView={resetView} />
      {hoveredTopic && hoveredTopic.description && (
        <DiagramTooltip topic={hoveredTopic} x={tooltipPosition.x} y={tooltipPosition.y} />
      )}
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox="-1200 -800 2400 1600"
        preserveAspectRatio="xMidYMid meet"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className={dragging ? 'cursor-grabbing' : 'cursor-grab'}
      >
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="#93C5FD" />
          </marker>
        </defs>
        <style>
          {`
            @keyframes lineFlow {
              0% { stroke-dashoffset: 30; }
              100% { stroke-dashoffset: 0; }
            }

            .animated-line {
              stroke-dasharray: 10,5;
              stroke-dashoffset: 30;
              animation: lineFlow 1.5s linear infinite;
            }
          `}
        </style>
        <g transform={`translate(${transform.x}, ${transform.y}) scale(${transform.scale})`}>
          {/* Render system boundaries for system nodes */}
          {data
            .filter((n) => n.type === 'system')
            .map((system) => {
              const childNodes = data.filter((n) => n.parent === system.id);
              return renderSystemBoundary(system, childNodes, nodePositions);
            })}
          {/* Render connection paths */}
          {data.map((node) =>
            (node.connections || []).map((conn, index) => {
              const fromPos = nodePositions[node.id];
              const toPos = nodePositions[conn.to];
              if (fromPos && toPos) {
                const nodeColor = NODE_COLORS[node.type]?.stroke || '#60A5FA'; // Get node stroke color
                return (
                  <path
                    key={`path-${node.id}-${conn.to}-${index}`}
                    d={calculatePath(fromPos, toPos, node.id, conn.to, NODE_WIDTH, NODE_HEIGHT)}
                    fill="none"
                    stroke={nodeColor}
                    strokeWidth={1.8}
                    markerEnd="url(#arrowhead)"
                    className="animated-line"
                  />
                );
              }
              return null;
            })
          )}
          {/* Render nodes */}
          {data.map((node) => {
            if (node.type === 'system') return null;
            const pos = nodePositions[node.id];
            if (!pos) return null;
            return (
              <DiagramNode
                key={node.id}
                topic={node}
                x={pos.x}
                y={pos.y}
                isHovered={hoveredNode === node.id}
                onMouseEnter={handleNodeMouseEnter}
                onMouseLeave={handleNodeMouseLeave}
              />
            );
          })}
          {/* Render connection labels */}
          {data.map((node) =>
            (node.connections || []).map((conn, index) => {
              const fromPos = nodePositions[node.id];
              const toPos = nodePositions[conn.to];
              if (fromPos && toPos && conn.label) {
                const labelPos = calculateLabelPosition(fromPos, toPos, node.parent, data.find((n) => n.id === conn.to)?.parent, nodePositions);
                return (
                  <text key={`label-${node.id}-${conn.to}-${index}`} x={labelPos.x} y={labelPos.y} textAnchor="middle" fill="#E5E7EB" className="text-xs font-medium">
                    {conn.label}
                  </text>
                );
              }
              return null;
            })
          )}
        </g>
      </svg>
    </div>
  );
};
