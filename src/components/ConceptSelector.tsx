
import React from 'react';
import { PoseConcept } from '../types';
import { CheckCircleIcon, ArrowPathIcon, PlayIcon, InformationCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid';

const PoseIllustration: React.FC<{ type: 'headshot' | 'halfbody' | 'fullbody' }> = ({ type }) => {
  const strokeColor = "currentColor";
  const strokeWidth = 2.5;

  if (type === 'headshot') {
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full text-slate-300 dark:text-slate-600 opacity-80" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        {/* Head */}
        <circle cx="50" cy="40" r="18" />
        {/* Neck */}
        <path d="M50 58 V 65" />
        {/* Shoulders (Close crop) */}
        <path d="M25 85 Q 25 65 50 65 Q 75 65 75 85" />
        {/* Frame */}
        <rect x="15" y="10" width="70" height="80" rx="4" strokeDasharray="4 4" opacity="0.5" />
      </svg>
    );
  }

  if (type === 'halfbody') {
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full text-slate-300 dark:text-slate-600 opacity-80" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        {/* Head */}
        <circle cx="50" cy="30" r="14" />
        {/* Body (Waist up) */}
        <path d="M30 90 L 30 60 Q 30 50 50 50 Q 70 50 70 60 L 70 90" />
        {/* Arms */}
        <path d="M30 60 L 20 80" />
        <path d="M70 60 L 80 80" />
      </svg>
    );
  }

  // Fullbody
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full text-slate-300 dark:text-slate-600 opacity-80" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      {/* Head */}
      <circle cx="50" cy="20" r="10" />
      {/* Body */}
      <line x1="50" y1="30" x2="50" y2="60" />
      {/* Arms */}
      <path d="M30 50 L 50 35 L 70 50" />
      {/* Legs */}
      <path d="M40 90 L 50 60 L 60 90" />
    </svg>
  );
};

const getPoseType = (title: string, index: number): 'headshot' | 'halfbody' | 'fullbody' => {
  const t = title.toLowerCase();
  if (t.includes('cận') || t.includes('head') || t.includes('face') || t.includes('mặt')) return 'headshot';
  if (t.includes('bán') || t.includes('trung') || t.includes('half') || t.includes('mid')) return 'halfbody';
  if (t.includes('toàn') || t.includes('full') || t.includes('xa')) return 'fullbody';
  
  // Fallback based on structure
  if (index < 4) return 'headshot';
  if (index < 8) return 'halfbody';
  return 'fullbody';
};

const ConceptSelector: React.FC<{ 
    concepts: PoseConcept[], selectedIds: string[], onToggle: (id: string) => void, 
    onGenerate: () => void, isGenerating: boolean, onRefresh: () => void,
    progress: { current: number, total: number }, onUpdateSelection: (ids: string[]) => void
}> = ({ concepts, selectedIds, onToggle, onGenerate, isGenerating, onRefresh, progress, onUpdateSelection }) => {
  
  const handleSelectAll = () => onUpdateSelection(selectedIds.length === concepts.length ? [] : concepts.map(c => c.id));

  return (
    <div className="w-full max-w-[1400px] mx-auto p-4 animate-fade-in relative pb-12">
      <div className="flex justify-between items-center mb-6 gap-4">
        <div className="flex flex-col gap-1">
            <div className="flex items-center gap-4">
                <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">Select Poses <span className="text-slate-500 text-sm font-normal">({selectedIds.length})</span></h2>
                <button onClick={handleSelectAll} className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline">{selectedIds.length === concepts.length ? 'Deselect All' : 'Select All'}</button>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <InformationCircleIcon className="h-3 w-3" /> Select the concepts you like below to generate high-quality images.
            </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-3">
        {concepts.map((concept, index) => {
          const isSelected = selectedIds.includes(concept.id);
          const poseType = getPoseType(concept.title, index);
          // Extract specific pose name from title (Format: Shot / Angle / Pose)
          const poseName = concept.title.split('/').pop()?.trim() || concept.title;

          return (
            <div key={concept.id} onClick={() => onToggle(concept.id)} className={`relative group aspect-[3/4] overflow-hidden rounded-xl border-2 transition-all duration-300 cursor-pointer bg-white dark:bg-slate-800/40 ${isSelected ? 'border-indigo-500 shadow-lg scale-[1.02]' : 'border-slate-100 dark:border-slate-700/50 hover:border-indigo-300'}`}>
              <div className="w-full h-full flex flex-col relative">
                 
                 {/* Header Area: Number Badge Only */}
                 <div className="absolute top-2 right-2 z-10 pointer-events-none transition-all duration-300">
                    {isSelected ? (
                            <CheckCircleIcon className="h-6 w-6 text-indigo-500 bg-white dark:bg-slate-900 rounded-full shadow-sm" />
                    ) : (
                        <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-100/90 dark:bg-slate-900/90 px-2 py-1 rounded-md border border-slate-200 dark:border-slate-700 backdrop-blur-sm">
                            #{index + 1}
                        </span>
                    )}
                 </div>

                 {/* Center Illustration */}
                 <div className="flex-1 flex items-center justify-center p-6 pb-12">
                    <PoseIllustration type={poseType} />
                 </div>
                 
                 {/* Bottom Description (Notes) - Description Text Removed */}
                 <div className="absolute bottom-0 left-0 w-full bg-slate-50/95 dark:bg-slate-900/95 border-t border-slate-100 dark:border-slate-700/50 p-3 pointer-events-none flex items-center justify-center">
                     <p className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase truncate text-center">{poseName}</p>
                 </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Bar - Show if concepts exist (to allow refresh) or generating */}
      {(concepts.length > 0 || isGenerating) && (
        <div className="mt-8 flex flex-col items-center animate-fade-in-up gap-3">
            
            {/* Warning Note */}
            {!isGenerating && (
                <div className="bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 px-4 py-1.5 rounded-full text-xs font-bold border border-amber-200 dark:border-amber-800/50 shadow-sm flex items-center gap-2">
                    <ExclamationTriangleIcon className="h-4 w-4" />
                    ảnh không được lưu, vui lòng tải ảnh bạn thích về
                </div>
            )}

            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xl rounded-full px-4 py-2 sm:px-6 sm:py-3 flex items-center gap-4 w-full max-w-2xl backdrop-blur-xl">
                {isGenerating ? (
                    <div className="flex-grow flex items-center gap-4">
                         <ArrowPathIcon className="h-6 w-6 text-indigo-600 animate-spin" />
                         <div className="flex-grow">
                             <div className="flex justify-between text-xs font-bold mb-1.5"><span className="text-slate-600 dark:text-slate-300">GENERATING...</span><span className="text-indigo-600">{progress.current} / {progress.total}</span></div>
                             <div className="h-2 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300" style={{ width: `${(progress.current / progress.total) * 100}%` }} /></div>
                         </div>
                    </div>
                ) : (
                    <>
                        <div className="flex-grow hidden md:block">
                            <p className="text-sm font-medium text-slate-600 dark:text-slate-300">{selectedIds.length} selected</p>
                            <p className="text-xs text-slate-400">Ready to transform</p>
                        </div>
                        
                        {/* Refresh Button - Renamed to POSE KHÁC */}
                        <button onClick={onRefresh} className="px-5 py-3 rounded-full bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-200 font-bold border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600 shadow-md flex items-center gap-2 transition-all">
                            <ArrowPathIcon className="h-5 w-5" /> <span className="hidden sm:inline">POSE KHÁC</span><span className="sm:hidden">KHÁC</span>
                        </button>

                        {/* Generate Button - Renamed to TẠO ẢNH */}
                        <button 
                            onClick={onGenerate} 
                            disabled={selectedIds.length === 0}
                            className={`px-6 py-3 rounded-full font-bold shadow-lg flex items-center justify-center gap-2 transition-all flex-grow sm:flex-grow-0 ${selectedIds.length === 0 ? 'bg-slate-200 text-slate-400 cursor-not-allowed dark:bg-slate-700 dark:text-slate-500' : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-xl hover:scale-105'}`}
                        >
                            <PlayIcon className="h-5 w-5" /> TẠO ẢNH
                        </button>
                    </>
                )}
            </div>
        </div>
      )}
    </div>
  );
};

export default ConceptSelector;
