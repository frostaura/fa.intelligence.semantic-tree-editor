import React, { useContext, useState, useEffect, useMemo } from 'react';
import { useParams } from "react-router-dom";
import { UserContext } from "../../App";
import CircularButton from '../buttons/CircularButton';
import { CenterProjectDisplay } from '../lifecycle/CenterProjectDisplay';
import NavigationButton from '../buttons/NavigationButton';
import { IProject } from "@/interfaces/models/IProject";
import { IStep } from "@/interfaces/models/IStep";
import { useEffectAsync } from "../../hooks/useAsyncEffect";
import { getAsync } from "../../services/data/ProjectsData";
import { Search, X } from 'lucide-react';
import '../../app.css';

interface SearchResult {
  step: IStep;
  path: IStep[];
}

export function LifecycleView() {
  const { id } = useParams<{ id: string }>();
  const [state] = useContext(UserContext);
  const [project, setProject] = useState<IProject | null>(null);
  const [activeStep, setActiveStep] = useState<IStep | null>(null);
  const [parentSteps, setParentSteps] = useState<IStep[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useEffectAsync(async () => {
    if (!id) {
      const initialProject = state.projects[0] || null;
      setProject(initialProject);
      if (initialProject?.process) {
        setActiveStep(initialProject.process);
      }
    } else {
      const fetchedProject = await getAsync(parseInt(id), state);
      setProject(fetchedProject);
      if (fetchedProject?.process) {
        setActiveStep(fetchedProject.process);
      }
    }
  }, [id, state]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 0.05) % 360);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const extractStepsFromProject = (project: IProject): IStep[] => {
    const steps: IStep[] = [];

    const traverseSteps = (step: IStep) => {
      steps.push(step);
      step.steps.forEach(traverseSteps);
    };

    if (project.process) {
      traverseSteps(project.process);
    }

    return steps;
  };

  const searchRecursively = (step: IStep, query: string, currentPath: IStep[] = [], seenSteps = new Set<string>()): SearchResult[] => {
    let results: SearchResult[] = [];
    
    // Skip if we've already seen this step
    if (seenSteps.has(step.key)) {
      return results;
    }
    
    // Mark this step as seen
    seenSteps.add(step.key);
    
    const matchesQuery = 
      step.role.toLowerCase().includes(query) ||
      (step.output?.toLowerCase().includes(query));

    if (matchesQuery) {
      results.push({ step, path: [...currentPath, step] });
    }

    if (step.steps && step.steps.length > 0) {
      for (const childStep of step.steps) {
        const childResults = searchRecursively(childStep, query, [...currentPath, step], seenSteps);
        results = [...results, ...childResults];
      }
    }

    return results;
  };

  const handleProjectClick = (nextStep: IStep) => {
    if (nextStep === activeStep) return;

    setIsTransitioning(true);
    setTimeout(() => {
      if (activeStep) {
        setParentSteps(prev => [...prev, activeStep]);
      }
      setActiveStep(nextStep);
      setIsTransitioning(false);
    }, 300);
  };

  const handleSearchResultClick = (nextStep: IStep, path: IStep[]) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setParentSteps(path);
      setActiveStep(nextStep);
      setIsTransitioning(false);
    }, 300);
  };

  const handleBackClick = () => {
    if (parentSteps.length > 0) {
      setIsTransitioning(true);
      setTimeout(() => {
        const newParentSteps = [...parentSteps];
        const previousStep = newParentSteps.pop();
        setParentSteps(newParentSteps);
        setActiveStep(previousStep || null);
        setIsTransitioning(false);
      }, 300);
    }
  };

  const searchResults = useMemo(() => {
    if (!searchQuery || !project) return [];

    const query = searchQuery.toLowerCase();
    const seenSteps = new Set<string>();
    let results: SearchResult[] = [];

    if (project.process) {
      results = searchRecursively(project.process, query, [], seenSteps);
    }

    return results;
  }, [project, searchQuery]);

  const projectsToDisplay = useMemo(() => {
    if (activeStep) {
      return activeStep.steps || [];
    }
    return project?.process?.steps || [];
  }, [activeStep, project]);

  // Get the parent step for the back button
  const parentStep = useMemo(() => {
    return parentSteps.length > 0 ? parentSteps[parentSteps.length - 1] : null;
  }, [parentSteps]);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#000000] flex items-center justify-center relative overflow-hidden">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">No Project Data Available</h2>
          <p className="text-gray-400">Please create a new project or select an existing one.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#000000] flex items-center justify-center relative overflow-hidden">
      <div className="absolute w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px]" />
      
      <img
        src="/icons/app.icon.png"
        alt="App Icon"
        className="absolute top-4 left-4 w-24 h-24 object-contain z-20"

      />

      <div className="fixed top-8 left-1/2 -translate-x-1/2 w-96 z-10">
        <div className="relative">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full opacity-70 blur-lg" />
          
          {/* Main container with gradient border */}
          <div className="relative bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full p-[1px]">
            <div className="relative bg-black rounded-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearching(true)}
                onBlur={() => setTimeout(() => setIsSearching(false), 200)}
                placeholder="Search stages or artifacts..."
                className="w-full bg-black text-white placeholder-white/50 rounded-full px-5 py-3 pl-12 pr-12 focus:outline-none"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Search results dropdown */}
          {isSearching && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 animate-slideDown">
              <div className="relative">
                {/* Glow effect for dropdown */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-lg opacity-70 blur-sm" />
                
                {/* Main dropdown container */}
                <div className="relative bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-lg p-[1px]">
                  <div className="bg-black/95 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden max-h-[60vh] overflow-y-auto">
                    {searchResults.map(({ step, path }, index) => (
                      <button
                        key={step.key}
                        onClick={() => {
                          handleSearchResultClick(step, path.slice(0, -1));
                          setSearchQuery('');
                        }}
                        className="w-full px-4 py-3 text-left hover:bg-white/10 transition-colors duration-200 border-b border-white/5 last:border-b-0 animate-fadeIn"
                        style={{
                          animationDelay: `${index * 50}ms`,
                          opacity: 0,
                          animation: `fadeIn 0.2s ease-out ${index * 50}ms forwards`
                        }}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-white/90 transform transition-transform duration-200 group-hover:scale-110">
                            {step.icon}
                          </span>
                          <span className="text-white font-medium">{step.role}</span>
                        </div>
                        {path.length > 1 && (
                          <div className="text-xs text-white/50 mt-1.5 pl-8">
                            {path.slice(0, -1).map(p => p.role).join(' → ')}
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="relative w-[800px] h-[800px]">
        <div className="absolute inset-0">
          {projectsToDisplay.map((step, index) => (
            <CircularButton
              key={step.key}
              project={step}
              onClick={() => handleProjectClick(step)}
              isTransitioning={isTransitioning}
              rotation={rotation}
              index={index}
              total={projectsToDisplay.length}
            />
          ))}
        </div>
        {project && activeStep && (
          <CenterProjectDisplay 
            project={project}
            step={activeStep}
            isTransitioning={isTransitioning} 
          />
        )}
        {parentStep && (
          <NavigationButton
            label={parentStep.role}
            Icon={parentStep.icon}
            onClick={handleBackClick}
          />
        )}
      </div>
    </div>
  );
}