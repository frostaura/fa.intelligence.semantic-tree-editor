// src/Diagrams/DiagramTooltip.tsx
import React, { FC } from 'react';
import { Topic } from './types';

interface DiagramTooltipProps {
  topic: Topic;
  x: number;
  y: number;
}

export const DiagramTooltip: FC<DiagramTooltipProps> = ({ topic, x, y }) => {
  if (!topic.description) return null;

  return (
    <div
      className="absolute z-20 bg-[#1E293B] text-slate-200 p-4 rounded-lg shadow-xl border border-slate-600 max-w-xs"
      style={{
        left: x + 10,
        top: y + 10,
        pointerEvents: 'none',
      }}
    >
      <p className="text-sm leading-relaxed">{topic.description}</p>
    </div>
  );
};
