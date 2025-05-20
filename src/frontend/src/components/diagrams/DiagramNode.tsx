// src/Diagrams/DiagramNode.tsx
import React, { FC, MouseEvent } from 'react';
import { Topic } from './types';
import { CircleDot, Box, Database, Globe, Users, Cpu, Mail } from 'lucide-react';

export interface DiagramNodeProps {
  topic: Topic;
  x: number;
  y: number;
  isHovered: boolean;
  onMouseEnter: (e: MouseEvent, nodeId: string) => void;
  onMouseLeave: () => void;
}

// Assign distinct colors to different node types for better clarity
export const NODE_COLORS: Record<Topic['type'], { fill: string; stroke: string; icon: string }> = {
  system: { fill: '#1E40AF', stroke: '#3B82F6', icon: '#93C5FD' }, // Deep blue
  container: { fill: '#0284C7', stroke: '#38BDF8', icon: '#7DD3FC' }, // Cyan blue
  component: { fill: '#059669', stroke: '#34D399', icon: '#6EE7B7' }, // Green
  person: { fill: '#B91C1C', stroke: '#EF4444', icon: '#FCA5A5' }, // Red
  database: { fill: '#7C3AED', stroke: '#A78BFA', icon: '#C4B5FD' }, // Purple
  service: { fill: '#D97706', stroke: '#F59E0B', icon: '#FDE047' }, // Yellow-orange
  external: { fill: '#64748B', stroke: '#94A3B8', icon: '#E2E8F0' }, // Gray
};

// Default colors if type is missing
const DEFAULT_NODE_COLOR = { fill: '#1E40AF', stroke: '#3B82F6', icon: '#93C5FD' };

// Function to get an icon with the correct color
const getNodeIcon = (type: Topic['type']) => {
  const iconSize = 24;
  const color = NODE_COLORS[type]?.icon || DEFAULT_NODE_COLOR.icon;
  
  switch (type) {
    case 'system':
      return <Globe size={iconSize} color={color} />;
    case 'container':
      return <Box size={iconSize} color={color} />;
    case 'component':
      return <Cpu size={iconSize} color={color} />;
    case 'person':
      return <Users size={iconSize} color={color} />;
    case 'database':
      return <Database size={iconSize} color={color} />;
    case 'service':
      return <Mail size={iconSize} color={color} />;
    case 'external':
    default:
      return <CircleDot size={iconSize} color={color} />;
  }
};

const NODE_WIDTH = 240;
const NODE_HEIGHT = 100;

export const DiagramNode: FC<DiagramNodeProps> = ({
  topic,
  x,
  y,
  isHovered,
  onMouseEnter,
  onMouseLeave,
}) => {
  const colors = NODE_COLORS[topic.type] || DEFAULT_NODE_COLOR;

  return (
    <g
      transform={`translate(${x},${y})`}
      onMouseEnter={(e) => onMouseEnter(e, topic.id)}
      onMouseLeave={onMouseLeave}
      style={{ cursor: 'pointer' }}
    >
      <rect
        x={-NODE_WIDTH / 2}
        y={-NODE_HEIGHT / 2}
        width={NODE_WIDTH}
        height={NODE_HEIGHT}
        rx={8}
        fill={isHovered ? '#2563EB' : colors.fill} // Vibrant blue on hover
        stroke={isHovered ? '#60A5FA' : colors.stroke}
        strokeWidth={3}
        className="transition-all duration-300"
      />
      <g transform={`translate(${-NODE_WIDTH / 2 + 32}, ${-NODE_HEIGHT / 2 + 32})`}>
        {getNodeIcon(topic.type)}
      </g>
      <text textAnchor="middle" fill="#F8FAFC" className="text-base font-semibold" x={0} y={-10}>
        {topic.title}
      </text>
      {topic.technology && (
        <text textAnchor="middle" fill="#CBD5E1" className="text-sm italic" x={0} y={20}>
          [{topic.technology}]
        </text>
      )}
    </g>
  );
};
