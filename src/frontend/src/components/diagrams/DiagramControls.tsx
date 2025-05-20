import { FC } from 'react';
import { ZoomIn, ZoomOut, MoveHorizontal } from 'lucide-react';

interface DiagramControlsProps {
  zoomIn: () => void;
  zoomOut: () => void;
  resetView: () => void;
}

export const DiagramControls: FC<DiagramControlsProps> = ({ zoomIn, zoomOut, resetView }) => {
  return (
    <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
      <button
        onClick={zoomIn}
        className="p-3 bg-[#1E293B] rounded-lg hover:bg-[#2D3B4E] transition-colors"
      >
        <ZoomIn size={20} className="text-slate-200" />
      </button>
      <button
        onClick={zoomOut}
        className="p-3 bg-[#1E293B] rounded-lg hover:bg-[#2D3B4E] transition-colors"
      >
        <ZoomOut size={20} className="text-slate-200" />
      </button>
    </div>
  );
};
