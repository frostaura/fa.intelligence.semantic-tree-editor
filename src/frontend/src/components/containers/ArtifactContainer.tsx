import React, { useState, useContext, useEffect } from 'react';
import { FaDownload, FaEdit, FaEye, FaExpand, FaCompress } from 'react-icons/fa';
import { AnimatedButton } from '../buttons/AnimatedButton';
import { IconEngine } from '../../services/engines/IconEngine';
import { generatePDF } from '../../services/engines/PDFEngine';
import { SemanticEditor } from '../input/SemanticEditor';
import { UserContext } from '../../App';
import { OutputRenderer } from '../../renderers/OutputRenderer';
import { IStep } from '../../interfaces/models/IStep';
import { Languages } from '../../enums/semantic/Languages';
import { MetadataContainer } from './MetadataContainer';
import { askAsync } from '@/services/data/LLMData';
import { projectIdeaRefiningQuestions } from '@/prompts/edit.project_idea_refining_questions';
import { architectureRefiningQuestions } from '@/prompts/edit.project_architecture_refining';

interface ArtifactContainerProps {
  step: IStep;
  onClose: () => void;
  onEdit: () => void;
}

const getContextForStep = (stepKey: string) => {
  switch (stepKey) {
    case 'architecture':
      return architectureRefiningQuestions;
    default:
      return projectIdeaRefiningQuestions;
  }
};

export const ArtifactContainer = React.memo(
  ({ step, onClose, onEdit }: ArtifactContainerProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [state] = useContext(UserContext);
    const [isMaximized, setIsMaximized] = useState(false);
    const isDiagram = step.outputType === Languages.Diagram;

    const toggleEditMode = () => {
      setIsEditing((prev) => !prev);
      onEdit();
    };

    const toggleMaximize = () => {
      setIsMaximized((prev) => !prev);
    };

    // Prevent body scrolling when a diagram is shown.
    useEffect(() => {
      if (isDiagram) {
        document.body.classList.add('overflow-hidden');
      } else {
        document.body.classList.remove('overflow-hidden');
      }
      return () => {
        document.body.classList.remove('overflow-hidden');
      };
    }, [isDiagram]);

    if (!step.output) return null;

    const context = getContextForStep(step.key);

    return (
      <div
        className={`fixed inset-0 bg-black/80 flex items-center justify-center z-50 animate-fadeIn ${isMaximized ? 'w-full h-full' : ''
          }`}
        onClick={onClose}
      >
        <div
          className={`relative ${isMaximized ? 'w-full h-full' : 'w-[90vw] max-h-[90vh]'
            } animate-scaleIn`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-lg p-[1px]">
            <div
              className={`relative bg-black/95 rounded-lg flex flex-col ${isMaximized ? 'w-full h-full' : 'h-[90vh]'
                }`}
            >
              {/* Header */}
              <div className="flex justify-between items-center p-8 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full">
                    <span className="text-2xl text-white">
                      {step.outputType && IconEngine(step.outputType)}
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold text-white">
                    {step.role}
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  {/* Maximize button */}
                  <AnimatedButton onClick={toggleMaximize} showAnimation>
                    {isMaximized ? (
                      <FaCompress className="w-5 h-5 text-white" />
                    ) : (
                      <FaExpand className="w-5 h-5 text-white" />
                    )}
                  </AnimatedButton>

                  {/* Export PDF button (only if markdown & not editing) */}
                  {!isEditing && step.outputType === Languages.Markdown && step.output && (
                    <AnimatedButton
                      onClick={() => generatePDF(step.output!, step.role)}
                      showAnimation
                    >
                      <FaDownload className="w-5 h-5 text-white" />
                    </AnimatedButton>
                  )}

                  {/* Edit / View toggle button */}
                  <AnimatedButton onClick={toggleEditMode} showAnimation>
                    {isEditing ? (
                      <FaEye className="w-5 h-5 text-white" />
                    ) : (
                      <FaEdit className="w-5 h-5 text-white" />
                    )}
                  </AnimatedButton>

                  {/* Close button */}
                  <AnimatedButton onClick={onClose} showAnimation>
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </AnimatedButton>
                </div>
              </div>

              {/* Content */}
              {/* 
                  If it's a diagram, we use 'overflow-hidden' so the container itself won't scroll.
                  For non-diagram outputs, we allow vertical scrolling.
              */}
              <div className={`flex-1 ${isDiagram ? 'overflow-hidden' : 'overflow-y-auto'} px-8 pb-8 scrollbar-hide`}>
                {isEditing ? (
                  <SemanticEditor
                    context={context}
                    value={step.output}
                    language={isDiagram ? Languages.JSON : (step.outputType || Languages.Markdown)}
                    options={state.semanticEditor}
                    askLLMAsync={askAsync}
                    height="50vh"
                    onChange={(newValue) => {
                      step.output = newValue;
                    }}
                  />
                ) : (
                  <div className={`flex-1 px-8 pb-8 scrollbar-hide flex ${isDiagram ? 'overflow-hidden' : 'overflow-y-auto'}`}>
                    <div className="w-full h-full">
                      <OutputRenderer
                        output={step.output}
                        outputType={step.outputType}
                      />
                    </div>
                    {step.metadata && <MetadataContainer metadata={step.metadata} />}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

ArtifactContainer.displayName = 'ArtifactDisplay';
