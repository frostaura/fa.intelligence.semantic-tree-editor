// MetadataContainer.tsx
import React, { useState } from 'react';
import { FaFileAlt, FaCalendar, FaClock, FaInfoCircle } from 'react-icons/fa';

interface MetadataContainerProps {
  metadata: {
    created: string;
    modified?: string;
  };
}

export const MetadataContainer: React.FC<MetadataContainerProps> = ({ metadata }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative">
      <button onClick={() => setIsVisible(!isVisible)} className="text-white flex items-center gap-2">
        <FaInfoCircle className="w-5 h-5" />
        {isVisible ? 'Hide Metadata' : 'Show Metadata'}
      </button>
      {isVisible && (
        <div className="relative bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-lg p-[1px] mt-4">
          <div className="relative bg-black/50 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white/90 mb-6 flex items-center gap-2">
              <FaFileAlt className="w-4 h-4" />
              Metadata
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <FaCalendar className="w-4 h-4 text-white/60" />
                  <div>
                    <p className="text-sm text-white/60">Created</p>
                    <p className="text-sm font-medium text-white">
                      {new Date(metadata.created).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
                {metadata.modified && (
                  <div className="flex items-center gap-3">
                    <FaClock className="w-4 h-4 text-white/60" />
                    <div>
                      <p className="text-sm text-white/60">Modified</p>
                      <p className="text-sm font-medium text-white">
                        {new Date(metadata.modified).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
