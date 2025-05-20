import React from 'react';
import { IProject } from '@/interfaces/models/IProject';
import { IStep } from '@/interfaces/models/IStep';

type CircularButtonProps = {
  project: IProject | IStep;
  onClick: () => void;
  isTransitioning: boolean;
  rotation: number;
  index: number;
  total: number;
};

const CircularButton: React.FC<CircularButtonProps> = ({ project, onClick, isTransitioning, rotation, index, total }) => {
  const angle = (360 / total) * index + rotation;
  const radians = (angle * Math.PI) / 180;
  const x = 400 + Math.cos(radians) * 250;
  const y = 400 + Math.sin(radians) * 250;

  const title = 'title' in project ? project.title : ('role' in project ? project.role : '');
  const status = 'process' in project ? project.process?.status  : ('status' in project ? project.status : '');
  const icon = 'process' in project ? project.process?.icon : ('icon' in project ? project.icon : '');

  return (
    <button
      className={`absolute w-20 h-20 group transition-all duration-300 ${isTransitioning ? 'opacity-0 scale-75' : 'opacity-100 scale-100'}`}
      style={{ transform: `translate(${x - 40}px, ${y - 40}px)` }}
      onClick={onClick}
      title={title}
    >
      <div className="relative w-full h-full">
        <div className={`absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full blur-md opacity-75 group-hover:opacity-100 transition-opacity ${status === 'new' ? 'animate-pulse' : ''}`} />
        <div className="absolute inset-0 bg-black rounded-full p-3 flex flex-col items-center justify-center">
          <div className="text-white text-2xl">{icon}</div>
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 flex space-x-1">
          </div>
        </div>
      </div>
      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 space-y-1">
        <span className="block text-sm text-white font-medium whitespace-nowrap">{title}</span>
      </div>
    </button>
  );
};

export default CircularButton;
