import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { IProject } from '@/interfaces/models/IProject';
import { IStep } from '@/interfaces/models/IStep';
import { ArtifactContainer } from '../containers/ArtifactContainer';
import { FaFileLines, FaCode } from 'react-icons/fa6';
import { Languages } from '../../enums/semantic/Languages';

type CenterProjectDisplayProps = {
  project: IProject;
  step: IStep;
  isTransitioning: boolean;
};

const getOutputIcon = (outputType?: Languages) => {
  switch (outputType) {
    case Languages.Markdown:
      return <FaFileLines className="w-4 h-4 text-white" />;
    case Languages.JavaScript:
    case Languages.TypeScript:
    case Languages.Python:
    case Languages.CSharp:
    case Languages.Java:
      return <FaCode className="w-4 h-4 text-white" />;
    default:
      return <FaFileLines className="w-4 h-4 text-white" />;
  }
};

export const CenterProjectDisplay = memo(({ project, step, isTransitioning }: CenterProjectDisplayProps) => {
  const [selectedStep, setSelectedStep] = useState<IStep | null>(null);
  const artifactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (artifactRef.current && !artifactRef.current.contains(event.target as Node)) {
        setSelectedStep(null);
      }
    };

    if (selectedStep) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectedStep]);

  useEffect(() => {
    setSelectedStep(null);
  }, [isTransitioning, step]);

  const handleViewOutput = useCallback(() => {
    setSelectedStep(step);
  }, [step]);

  const handleCloseArtifact = useCallback(() => {
    setSelectedStep(null);
  }, []);

  return (
    <>
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full transition-all duration-300 ${isTransitioning ? 'scale-90 opacity-50 rotate-180' : 'scale-100 opacity-100 rotate-0'}`}>
        <div className="absolute inset-0">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 opacity-70 blur-xl transform scale-110" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full p-1">
          <div className="relative bg-black rounded-full p-4 h-full overflow-hidden flex flex-col items-center justify-center">
            <div className="text-white text-2xl">{step.icon}</div>
            <h2 className="text-white font-bold text-lg text-center">{step.role}</h2>
            {step.output && step.outputType && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                <button
                  onClick={handleViewOutput}
                  className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                  title="View Output"
                >
                  {getOutputIcon(step.outputType)}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {selectedStep && (
        <ArtifactContainer
          step={selectedStep}
          onClose={handleCloseArtifact}
        />
      )}
    </>
  );
});

CenterProjectDisplay.displayName = 'CenterProjectDisplay';