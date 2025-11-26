import React from 'react';

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="w-full border-b border-slate-200/70 dark:border-slate-800/80 bg-white/70 dark:bg-slate-950/60 backdrop-blur sticky top-0 z-20">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-indigo-500/90 flex items-center justify-center text-xs font-bold text-white shadow-md shadow-indigo-500/40">
            PA
          </div>
          <div>
            <div className="text-sm font-semibold tracking-tight">
              PoseArchitect AI
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Brainstorm &amp; generate pose ideas from your references
            </p>
          </div>
        </div>

        {title && (
          <div className="hidden sm:block text-xs text-slate-500 dark:text-slate-400">
            {title}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
