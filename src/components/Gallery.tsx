
import React from 'react';
import { GeneratedImage, PoseConcept, UserRole } from '../types';
import { ArrowDownTrayIcon, ClipboardDocumentIcon } from '@heroicons/react/24/outline';

interface GalleryProps {
  images: GeneratedImage[];
  concepts: PoseConcept[];
  userRole?: UserRole;
}

const Gallery: React.FC<GalleryProps> = ({ images, concepts, userRole }) => {
  if (images.length === 0) return null;

  return (
    <div className="w-full max-w-[1400px] mx-auto p-4 mt-12 animate-fade-in-up">
      <div className="flex items-center gap-4 mb-8 justify-center">
        <div className="h-px w-12 bg-slate-300 dark:bg-slate-700"></div>
        <h2 className="text-2xl font-bold text-center text-slate-800 dark:text-slate-200">
            Your Portfolio
        </h2>
        <div className="h-px w-12 bg-slate-300 dark:bg-slate-700"></div>
      </div>
      
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {images.map((img) => {
          // Find original index to display Pose #
          const originalIndex = concepts.findIndex(c => c.id === img.conceptId);
          const poseNumber = originalIndex !== -1 ? originalIndex + 1 : '?';

          return (
            <div key={img.id} className="break-inside-avoid relative group rounded-2xl overflow-hidden bg-slate-200 dark:bg-slate-800 shadow-lg">
              <img
                src={img.url}
                alt={img.prompt}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Pose Number Badge */}
              <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-mono font-bold border border-white/20 z-10">
                Pose #{poseNumber}
              </div>

              {/* Admin: Show Full Prompt Overlay with Copy AND Download */}
              {userRole === 'admin' && (
                <div className="absolute inset-0 bg-slate-900/90 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col z-20">
                    <div className="flex-1 overflow-y-auto mb-3 scrollbar-thin scrollbar-thumb-white/20 pr-1">
                        <p className="text-xs font-mono text-slate-300 leading-relaxed whitespace-pre-wrap">{img.prompt}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button 
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                navigator.clipboard.writeText(img.prompt);
                                alert('Đã copy prompt vào clipboard!');
                            }}
                            className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-500 border border-indigo-500/50 rounded-lg text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-lg"
                        >
                            <ClipboardDocumentIcon className="h-4 w-4" />
                            COPY PROMPT
                        </button>
                        <a 
                            href={img.url}
                            download={`pose-architect-${img.id}.jpg`}
                            onClick={(e) => e.stopPropagation()}
                            className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/10 flex items-center justify-center transition-colors"
                            title="Download Image"
                        >
                             <ArrowDownTrayIcon className="h-5 w-5" />
                        </a>
                    </div>
                </div>
              )}

              {/* Member/User: Only Download Button (No Prompt) */}
              {userRole !== 'admin' && (
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
                    <a
                      href={img.url}
                      download={`pose-architect-${img.id}.jpg`}
                      className="flex items-center gap-2 bg-white/90 hover:bg-white text-slate-900 px-4 py-2 rounded-full text-xs font-bold transition-all shadow-lg"
                    >
                      <ArrowDownTrayIcon className="h-3 w-3" />
                      Download
                    </a>
                  </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Gallery;
