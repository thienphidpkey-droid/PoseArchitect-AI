"use client";

import React, { useState, useCallback } from 'react';
import PromptInput from '../components/PromptInput';
import ConceptSelector from '../components/ConceptSelector';
import Gallery from '../components/Gallery';
import LoginPage from '../components/LoginPage';
import { brainstormPoses, generateImageFromPose } from '../services/geminiService';
import { AppState, GeneratedImage, PoseConcept, BrainstormOptions, UserRole } from '../types';

const App: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState<UserRole>('user');
    const [useProModel, setUseProModel] = useState(false);

    const [appState, setAppState] = useState<AppState>(AppState.IDLE);
    const [concepts, setConcepts] = useState<PoseConcept[]>([]);
    const [selectedConceptIds, setSelectedConceptIds] = useState<string[]>([]);
    const [images, setImages] = useState<GeneratedImage[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [uploadedImage, setUploadedImage] = useState<string | undefined>(undefined);
    const [progress, setProgress] = useState({ current: 0, total: 0 });

    const [lastBrainstormParams, setLastBrainstormParams] = useState<{
        prompt: string;
        imageBase64: string | undefined;
        options: BrainstormOptions;
    } | null>(null);

    const toggleTheme = () => setIsDarkMode(prev => !prev);

    const getErrorMsg = (error: unknown): string => {
        if (error instanceof Error) return error.message;
        if (typeof error === 'string') return error;
        if (typeof error === 'object' && error !== null && 'message' in error) {
            return (error as any).message;
        }
        return String(error);
    };

    const handleLogin = (role: UserRole) => {
        setUserRole(role);
        setIsAuthenticated(true);
    };

    const handleBrainstorm = useCallback(
        async (prompt: string, imageBase64: string | undefined, options: BrainstormOptions) => {
            setAppState(AppState.BRAINSTORMING);
            setError(null);
            setConcepts([]);
            setSelectedConceptIds([]);
            setUploadedImage(imageBase64);

            const opts = { ...options, useProModel };
            setLastBrainstormParams({ prompt, imageBase64, options: opts });

            try {
                const results = await brainstormPoses(prompt, imageBase64, opts);
                if (results && results.length > 0) {
                    setConcepts(results);
                    setSelectedConceptIds([]);
                    setAppState(AppState.SELECTING);
                } else {
                    throw new Error('No concepts generated.');
                }
            } catch (err: unknown) {
                console.error(err);
                const msg = getErrorMsg(err);
                setError(
                    msg.includes('MISSING_API_KEY')
                        ? 'Chưa cấu hình API Key. Vào Vercel > Settings > Environment Variables để thêm API_KEY.'
                        : 'Lỗi khi tạo concept. Vui lòng kiểm tra API Key và thử lại.',
                );
                setAppState(AppState.IDLE);
            }
        },
        [useProModel],
    );

    const handleRefresh = useCallback(() => {
        if (lastBrainstormParams) {
            handleBrainstorm(
                lastBrainstormParams.prompt,
                lastBrainstormParams.imageBase64,
                { ...lastBrainstormParams.options, useProModel },
            );
        }
    }, [lastBrainstormParams, handleBrainstorm, useProModel]);

    const toggleConcept = useCallback((id: string) => {
        setSelectedConceptIds(prev =>
            prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id],
        );
    }, []);

    const handleGenerateImages = useCallback(async () => {
        if (selectedConceptIds.length === 0) return;

        setAppState(AppState.GENERATING);
        setError(null);
        setProgress({ current: 0, total: selectedConceptIds.length });

        const selectedConcepts = concepts.filter(c => selectedConceptIds.includes(c.id));
        const currentProMode = useProModel;

        try {
            const newImages: GeneratedImage[] = [];
            let completed = 0;

            for (const concept of selectedConcepts) {
                try {
                    const url = await generateImageFromPose(concept, uploadedImage, currentProMode);
                    if (url) {
                        newImages.push({
                            id: crypto.randomUUID(),
                            conceptId: concept.id,
                            url,
                            prompt: concept.enhancedPrompt,
                            createdAt: Date.now(),
                        });
                    }
                } catch (e: any) {
                    if (e?.message === 'MISSING_API_KEY') throw e;
                } finally {
                    completed++;
                    setProgress({ current: completed, total: selectedConceptIds.length });
                }
            }

            if (newImages.length === 0) {
                setError('Không thể tạo ảnh. Có thể do hết API quota.');
            }
            setImages(prev => [...newImages, ...prev]);
        } catch (err: unknown) {
            const msg = getErrorMsg(err);
            setError(
                msg.includes('MISSING_API_KEY')
                    ? 'Chưa cấu hình API Key.'
                    : 'Lỗi tạo ảnh. Kiểm tra hạn mức API.',
            );
        } finally {
            setAppState(AppState.FINISHED);
        }
    }, [selectedConceptIds, concepts, uploadedImage, useProModel]);

    if (!isAuthenticated) {
        return (
            <div className={isDarkMode ? 'dark' : ''}>
                <LoginPage
                    onLogin={handleLogin}
                    isDarkMode={isDarkMode}
                    toggleTheme={toggleTheme}
                />
            </div>
        );
    }

    return (
        <div className={isDarkMode ? 'dark' : ''}>
            <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0f172a] text-slate-800 dark:text-slate-100 font-sans selection:bg-indigo-500/30 transition-colors duration-300">
                {/* Header inline luôn, khỏi import */}
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
                    </div>
                </header>

                <main className="flex-grow flex flex-col items-center w-full">
                    <div className="h-8 md:h-12" />
                    <div className="w-full flex flex-col items-center px-4">
                        <PromptInput
                            onBrainstorm={handleBrainstorm}
                            isLoading={appState === AppState.BRAINSTORMING}
                            isDarkMode={isDarkMode}
                            toggleTheme={toggleTheme}
                            useProModel={useProModel}
                            setUseProModel={setUseProModel}
                        />
                        {error && (
                            <div className="mt-4 p-3 bg-red-100 dark:bg-red-500/10 border border-red-200 text-red-600 dark:text-red-300 rounded-lg text-sm">
                                {error}
                            </div>
                        )}
                    </div>

                    <div className="h-4" />

                    {(appState === AppState.SELECTING ||
                        appState === AppState.GENERATING ||
                        appState === AppState.FINISHED) && (
                            <ConceptSelector
                                concepts={concepts}
                                selectedIds={selectedConceptIds}
                                onToggle={toggleConcept}
                                onGenerate={handleGenerateImages}
                                isGenerating={appState === AppState.GENERATING}
                                onRefresh={handleRefresh}
                                progress={progress}
                                onUpdateSelection={setSelectedConceptIds}
                            />
                        )}

                    <Gallery images={images} concepts={concepts} userRole={userRole} />
                    <div className="h-24" />
                </main>

                <footer className="py-6 text-center text-slate-400 text-xs">
                    Powered by Google Gemini &amp; Imagen
                </footer>
            </div>
        </div>
    );
};

export default App;
