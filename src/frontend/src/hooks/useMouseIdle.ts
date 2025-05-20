import { useEffect } from 'react';

export const useMouseIdle = (setShowEditor: (show: boolean) => void, idleTime = 5000) => {
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const resetTimer = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => setShowEditor(false), idleTime);
    };

    document.addEventListener('mousemove', resetTimer);
    document.addEventListener('keypress', resetTimer);

    resetTimer();

    return () => {
      clearTimeout(timeout);
      document.removeEventListener('mousemove', resetTimer);
      document.removeEventListener('keypress', resetTimer);
    };
  }, [setShowEditor, idleTime]);
};
