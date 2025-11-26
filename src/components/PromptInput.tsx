
import React, { useState, useRef, memo, useCallback } from 'react';
import { PaperAirplaneIcon, PhotoIcon, XMarkIcon, AdjustmentsHorizontalIcon, CameraIcon, UserIcon, PaintBrushIcon, ChatBubbleBottomCenterTextIcon, BriefcaseIcon, SparklesIcon, SunIcon, MoonIcon, StarIcon, SwatchIcon, FaceSmileIcon } from '@heroicons/react/24/solid';
import { BrainstormOptions } from '../types';
import {
    COLOR_PRESETS, MAKEUP_STYLES, HAIR_STYLES, BACKGROUND_COLORS, OUTFIT_COLORS, FURNITURE_COLORS, BUSINESS_TONES,
    SHOT_TYPES, CAMERA_ANGLES, BODY_DIRECTIONS, HEAD_DIRECTIONS, GAZE_TYPES,
    SITTING_POSES, ACTION_DETAILS, BUSINESS_SHOT_TYPES, BUSINESS_CHAIRS, BUSINESS_HAIR_OPTIONS, BUSINESS_ACCESSORIES,
    PORTRAIT_SKIN_TONES, PORTRAIT_HAIR_STYLES, PORTRAIT_COLOR_GRADING, PORTRAIT_BACKGROUNDS, PORTRAIT_MAKEUP
} from '../constants';

interface PromptInputProps {
    onBrainstorm: (prompt: string, imageBase64: string | undefined, options: BrainstormOptions) => void;
    isLoading: boolean;
    isDarkMode: boolean;
    toggleTheme: () => void;
    useProModel: boolean;
    setUseProModel: (val: boolean) => void;
}

// --- UI HELPERS ---
const SectionTitle: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = "" }) => (
    <h4 className={`text-slate-400 dark:text-slate-500 text-xs uppercase font-bold mb-2 tracking-wider flex items-center gap-2 ${className}`}>{children}</h4>
);

const Checkbox: React.FC<{ label: string, checked: boolean, onChange: (c: boolean) => void, className?: string }> = ({ label, checked, onChange, className = "" }) => (
    <label className={`flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 cursor-pointer hover:text-indigo-600 dark:hover:text-white select-none transition-colors ${className}`}>
        <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="rounded border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-indigo-600 focus:ring-indigo-500" />
        {label}
    </label>
);

const TogglePill: React.FC<{ label: string, checked: boolean, onChange: (c: boolean) => void, highlight?: boolean }> = ({ label, checked, onChange, highlight = false }) => (
    <label className={`flex items-center gap-2 text-xs sm:text-sm cursor-pointer select-none px-3 py-1.5 rounded-full transition-all ${checked ? (highlight ? "bg-pink-50 dark:bg-pink-900/30 text-pink-600 font-bold" : "bg-indigo-50 dark:bg-slate-700 text-indigo-600 font-bold") : "bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200"}`}>
        <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="hidden" />
        {label}
    </label>
);

const Select: React.FC<{ value: string, onChange: (v: string) => void, options: { id: string, label: string }[], className?: string, noBorder?: boolean }> = ({ value, onChange, options, className = "", noBorder = false }) => (
    <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 ${noBorder ? 'bg-transparent border-0 p-0 font-bold text-right cursor-pointer' : 'bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700'} ${className}`}
    >
        {options.map(opt => (
            <option key={opt.id} value={opt.id} className="bg-slate-800 text-slate-200">
                {opt.label}
            </option>
        ))}
    </select>
);

// --- TABS ---
interface CreativeTabProps {
    options: BrainstormOptions;
    updateOption: (cat: keyof BrainstormOptions, key: string, val: any) => void;
}

const CreativeCameraTab = memo(({ options, updateOption }: CreativeTabProps) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
            <SectionTitle>Cỡ Cảnh</SectionTitle>
            <div className="flex flex-wrap gap-2">
                {SHOT_TYPES.map(opt => <TogglePill key={opt.id} label={opt.label} checked={(options.shotTypes as any)[opt.id]} onChange={(c) => updateOption('shotTypes', opt.id, c)} />)}
            </div>
        </div>
        <div>
            <SectionTitle>Góc Máy (View)</SectionTitle>
            <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                {CAMERA_ANGLES.map(opt => <Checkbox key={opt.id} label={opt.label} checked={(options.cameraAngles as any)[opt.id]} onChange={(c) => updateOption('cameraAngles', opt.id, c)} />)}
            </div>
        </div>
    </div>
));

const CreativePoseTab = memo(({ options, updateOption }: CreativeTabProps) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
            <SectionTitle>Hướng Cơ Thể & Mặt</SectionTitle>
            <div className="grid grid-cols-2 gap-2 mb-3">
                {BODY_DIRECTIONS.map(opt => <Checkbox key={opt.id} label={opt.label} checked={(options.bodyDirections as any)[opt.id]} onChange={(c) => updateOption('bodyDirections', opt.id, c)} />)}
            </div>
            <div className="grid grid-cols-2 gap-2 border-t border-slate-100 dark:border-slate-700/50 pt-3">
                {HEAD_DIRECTIONS.map(opt => <Checkbox key={opt.id} label={opt.label} checked={(options.headDirections as any)[opt.id]} onChange={(c) => updateOption('headDirections', opt.id, c)} />)}
            </div>
            <SectionTitle className="mt-4">Kiểu Nhìn (Gaze)</SectionTitle>
            <div className="grid grid-cols-2 gap-2">
                {GAZE_TYPES.map(opt => <Checkbox key={opt.id} label={opt.label} checked={(options.gaze as any)[opt.id]} onChange={(c) => updateOption('gaze', opt.id, c)} />)}
            </div>
        </div>
        <div>
            <SectionTitle>Dáng Ngồi / Nằm / Quỳ</SectionTitle>
            <div className="grid grid-cols-2 gap-2 mb-3">
                {SITTING_POSES.map(opt => <Checkbox key={opt.id} label={opt.label} checked={(options.sitting as any)[opt.id]} onChange={(c) => updateOption('sitting', opt.id, c)} />)}
            </div>
            <Checkbox label="Cố định vật thể (Ghế/Bục)" checked={options.sitting.fixedObject} onChange={(c) => updateOption('sitting', 'fixedObject', c)} className="mb-4 text-slate-500" />
            <SectionTitle>Chi tiết Hành Động</SectionTitle>
            <div className="flex flex-wrap gap-2">
                {ACTION_DETAILS.map(opt => <TogglePill key={opt.id} label={opt.label} checked={(options.details as any)[opt.id]} onChange={(c) => updateOption('details', opt.id, c)} highlight={opt.id === 'cuteFace'} />)}
            </div>
        </div>
    </div>
));

const CreativeStyleTab = memo(({ options, updateOption }: CreativeTabProps) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-4">
            <div className="flex flex-col gap-2">
                <Checkbox label="Thêm chữ ký" checked={options.includeSignature} onChange={(c) => updateOption('includeSignature', 'includeSignature', c)} className="font-bold uppercase text-xs tracking-wider" />
                {options.includeSignature && <input type="text" value={options.signatureText} onChange={(e) => updateOption('signatureText', 'signatureText', e.target.value)} placeholder="Nội dung chữ ký..." className="w-full bg-slate-50 dark:bg-slate-900 border border-indigo-100 rounded-lg px-3 py-2 text-sm" />}
            </div>
            <div>
                <SectionTitle>Cố định Trang Phục</SectionTitle>
                <textarea value={options.outfit} onChange={(e) => updateOption('outfit', 'outfit', e.target.value)} placeholder="Mô tả chi tiết bộ đồ..." className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm resize-none h-12" />
            </div>
            <div><SectionTitle>Màu Ảnh</SectionTitle><Select value={options.colorGrading} onChange={(v) => updateOption('colorGrading', 'colorGrading', v)} options={COLOR_PRESETS} /></div>
        </div>
        <div className="space-y-4">
            <div>
                <SectionTitle>Makeup Style</SectionTitle>
                <Select value={options.makeupStyle} onChange={(v) => updateOption('makeupStyle', 'makeupStyle', v)} options={MAKEUP_STYLES} className="mb-3" />
                <Checkbox label="Bỏ Make up" checked={options.noMakeup} onChange={(c) => updateOption('noMakeup', 'noMakeup', c)} className="text-xs" />
            </div>
            <div className="space-y-3">
                <Checkbox label="Không mô tả tóc" checked={options.disableHairDescription} onChange={(c) => updateOption('disableHairDescription', 'disableHairDescription', c)} className="text-xs text-rose-500 font-medium" />
                <div className={options.disableHairDescription ? 'opacity-50 pointer-events-none' : ''}>
                    <SectionTitle>Kiểu Tóc</SectionTitle>
                    <div className="flex gap-4 mb-3">
                        {['short', 'medium', 'long'].map(k => <Checkbox key={k} label={k === 'short' ? 'Ngắn' : k === 'medium' ? 'Trung' : 'Dài'} checked={(options.hairLength as any)[k]} onChange={(c) => updateOption('hairLength', k, c)} className="text-xs" />)}
                    </div>
                    <Select value={options.hairStyle} onChange={(v) => updateOption('hairStyle', 'hairStyle', v)} options={HAIR_STYLES} />
                </div>
            </div>
        </div>
    </div>
));

// --- PORTRAIT MODE TAB ---
interface PortraitModeTabProps {
    options: BrainstormOptions;
    updatePortraitOption: (key: keyof BrainstormOptions['portrait'], val: any) => void;
    updatePortraitMakeup: (key: string, val: any) => void;
}

const PortraitModeTab = memo(({ options, updatePortraitOption, updatePortraitMakeup }: PortraitModeTabProps) => {
    const p = options.portrait;

    // Flatten nested arrays for Select components
    const colorGradingOptions = [
        { id: "warm_header", label: "--- WARM TONES ---" }, ...PORTRAIT_COLOR_GRADING.warm,
        { id: "cool_header", label: "--- COOL TONES ---" }, ...PORTRAIT_COLOR_GRADING.cool,
        { id: "neutral_header", label: "--- NEUTRAL TONES ---" }, ...PORTRAIT_COLOR_GRADING.neutral,
        { id: "contrast_header", label: "--- HIGH CONTRAST ---" }, ...PORTRAIT_COLOR_GRADING.contrast
    ];

    const backgroundOptions = [
        { id: "studio_header", label: "--- STUDIO ---" }, ...PORTRAIT_BACKGROUNDS.studio,
        { id: "outdoor_header", label: "--- OUTDOOR ---" }, ...PORTRAIT_BACKGROUNDS.outdoor,
        { id: "fantasy_header", label: "--- FANTASY ---" }, ...PORTRAIT_BACKGROUNDS.fantasy
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-fade-in">
            <div className="space-y-4">
                <div>
                    <SectionTitle>1. Màu Da (Skin Tone)</SectionTitle>
                    <Select value={p.skinTone} onChange={(v) => updatePortraitOption('skinTone', v)} options={PORTRAIT_SKIN_TONES} />
                </div>
                <div>
                    <SectionTitle>2. Kiểu Tóc (Hair Style)</SectionTitle>
                    <Select value={p.hairStyle} onChange={(v) => updatePortraitOption('hairStyle', v)} options={PORTRAIT_HAIR_STYLES} />
                </div>
                <div>
                    <SectionTitle>3. Tone Màu (Color Grading)</SectionTitle>
                    <Select value={p.colorGrading} onChange={(v) => updatePortraitOption('colorGrading', v)} options={colorGradingOptions} />
                </div>
                <div>
                    <SectionTitle>4. Background</SectionTitle>
                    <Select value={p.background} onChange={(v) => updatePortraitOption('background', v)} options={backgroundOptions} />
                </div>
            </div>
            <div className="space-y-4">
                <SectionTitle>5. Makeup</SectionTitle>
                <div className="space-y-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
                    <div>
                        <label className="text-xs font-bold text-slate-500 mb-1 block">Eyes</label>
                        <Select value={p.makeup.eyes} onChange={(v) => updatePortraitMakeup('eyes', v)} options={PORTRAIT_MAKEUP.eyes} />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-slate-500 mb-1 block">Face</label>
                        <Select value={p.makeup.face} onChange={(v) => updatePortraitMakeup('face', v)} options={PORTRAIT_MAKEUP.face} />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-slate-500 mb-1 block">Lips</label>
                        <Select value={p.makeup.lips} onChange={(v) => updatePortraitMakeup('lips', v)} options={PORTRAIT_MAKEUP.lips} />
                    </div>
                </div>
                <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-100 dark:border-indigo-800 text-xs text-indigo-700 dark:text-indigo-300">
                    <p className="font-bold mb-1">ℹ️ Note:</p>
                    <ul className="list-disc pl-4 space-y-1">
                        <li>Pose & Gaze are automatically randomized for variety.</li>
                        <li>Global Color is automatically adjusted based on Background.</li>
                        <li>Strict realism & negative prompts are enforced.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
});

interface ProfileModeTabProps {
    options: BrainstormOptions;
    updateBusinessOption: (cat: keyof BrainstormOptions['business'], key: string, val: any) => void;
    updateBusinessDirect: (key: keyof BrainstormOptions['business'], val: any) => void;
    updateBusinessOutfit: (item: string, field: string, val: any) => void;
}

const ProfileModeTab = memo(({ options, updateBusinessOption, updateBusinessDirect, updateBusinessOutfit }: ProfileModeTabProps) => {
    const b = options.business;
    const [activeTab, setActiveTab] = useState<'person' | 'style'>('person');

    const titleClass = "text-indigo-600 dark:text-indigo-400 text-xs uppercase font-bold mb-2 tracking-wider";
    const groupClass = "mb-4 border border-slate-200 dark:border-slate-700 rounded-xl p-3 bg-white dark:bg-slate-800/50";

    const OUTFIT_LABELS: Record<string, string> = {
        blazer: 'Khoác ngoài (Blazer)',
        vest: 'Gi-lê (Vest)',
        shirt: 'Sơ mi (Shirt)',
        turtleneck: 'Áo cổ lọ (Turtleneck)'
    };

    return (
        <div className="mt-2 animate-fade-in">
            <div className="flex overflow-x-auto mb-4 px-2 scrollbar-hide border-b border-slate-100 dark:border-slate-700">
                {[
                    ['person', 'Người mẫu & Tư thế', UserIcon],
                    ['style', 'Trang phục & Bối cảnh', SwatchIcon]
                ].map(([id, label, Icon]) => (
                    <button key={id as string} type="button" onClick={() => setActiveTab(id as 'person' | 'style')} className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-all whitespace-nowrap flex-1 justify-center ${activeTab === id ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-500/10 rounded-t-lg' : 'border-transparent text-slate-500 dark:text-slate-400'}`}>
                        <Icon className="h-4 w-4" />{label}
                    </button>
                ))}
            </div>

            <div className="px-2 min-h-[200px]">
                {activeTab === 'person' && (
                    <div className="animate-fade-in grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                            {/* Subject Section */}
                            <div className={groupClass}>
                                <h4 className={titleClass}>1. Giới Tính & Tóc</h4>
                                <div className="flex gap-6 mb-3">
                                    {['male', 'female'].map(g => (
                                        <label key={g} className="flex items-center gap-2 cursor-pointer"><input type="radio" name="gender" checked={b.gender === g} onChange={() => updateBusinessDirect('gender', g)} className="text-indigo-600 bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 focus:ring-indigo-500" /><span className="text-sm font-medium capitalize text-slate-700 dark:text-slate-300">{g === 'male' ? 'Nam' : 'Nữ'}</span></label>
                                    ))}
                                </div>
                                <div className="flex flex-wrap gap-2">{BUSINESS_HAIR_OPTIONS.map(h => <TogglePill key={h.id} label={h.label} checked={b.hairStyles[h.id]} onChange={(c) => updateBusinessOption('hairStyles', h.id, c)} />)}</div>
                            </div>

                            {/* Shot Type Selection */}
                            <div className={groupClass}>
                                <h4 className={titleClass}>2. Cỡ Cảnh (Shot)</h4>
                                <div className="flex flex-wrap gap-2">
                                    <TogglePill label="Cận mặt" checked={b.selectedShotTypes.closeUp} onChange={(c) => updateBusinessOption('selectedShotTypes', 'closeUp', c)} />
                                    <TogglePill label="Bán thân" checked={b.selectedShotTypes.midShot} onChange={(c) => updateBusinessOption('selectedShotTypes', 'midShot', c)} />
                                    <TogglePill label="Toàn thân" checked={b.selectedShotTypes.fullBody} onChange={(c) => updateBusinessOption('selectedShotTypes', 'fullBody', c)} />
                                </div>
                                <p className="text-xs text-slate-500 mt-2">
                                    💡 1 cỡ = 8 poses | 2 cỡ = 16 poses | 3 cỡ = 16 poses
                                </p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {/* Pose Section */}
                            <div className={groupClass}>
                                <h4 className={titleClass}>3. Góc & Dáng</h4>
                                <div className="flex flex-col gap-1.5 mb-3">
                                    {[['frontal', 'Trực diện (Frontal)'], ['bodyTurn', 'Xoay người (Body Turn)'], ['faceTurn', 'Xoay mặt (Face Turn)']].map(([k, l]) => <Checkbox key={k} label={l} checked={(b.orientation as any)[k]} onChange={(c) => updateBusinessOption('orientation', k, c)} />)}
                                </div>
                                <h4 className="text-[10px] uppercase font-bold text-slate-400 mb-1.5 mt-2">Dáng Ngồi</h4>
                                <div className="flex flex-wrap gap-2">{BUSINESS_CHAIRS.map(s => <TogglePill key={s.id} label={s.label} checked={(b.sitting as any)[s.id]} onChange={(c) => updateBusinessOption('sitting', s.id, c)} />)}</div>
                                {Object.values(b.sitting).some(v => v) && (
                                    <p className="text-xs text-amber-600 dark:text-amber-400 mt-2 flex items-start gap-1">
                                        <span>⚠️</span>
                                        <span>Lưu ý: Dáng ngồi không phù hợp với cỡ cảnh "Cận mặt"</span>
                                    </p>
                                )}
                            </div>

                            {/* Accessories Section */}
                            <div className={groupClass}>
                                <h4 className={titleClass}>4. Phụ Kiện</h4>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                    {BUSINESS_ACCESSORIES.map(acc => <TogglePill key={acc.id} label={acc.label} checked={(b.accessories as any)[acc.id]} onChange={(c) => updateBusinessOption('accessories', acc.id, c)} />)}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'style' && (
                    <div className="animate-fade-in grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Outfit Section */}
                        <div className="space-y-3">
                            <div className={`${groupClass} h-full`}>
                                <h4 className={titleClass}>1. Mix & Match (Layering)</h4>
                                <div className="space-y-2 pl-1">
                                    {['blazer', 'vest', 'shirt', 'turtleneck'].map(item => (
                                        <div key={item} className="flex items-center justify-between h-9 border-b border-dashed border-slate-100 dark:border-slate-700/50 last:border-0">
                                            <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 cursor-pointer select-none">
                                                <input type="checkbox" className="rounded text-indigo-600 bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 focus:ring-indigo-500" checked={b.outfitDetails[item]?.enabled} onChange={(e) => updateBusinessOutfit(item, 'enabled', e.target.checked)} />
                                                <span className={b.outfitDetails[item]?.enabled ? 'text-indigo-600 dark:text-indigo-400 font-bold' : ''}>{OUTFIT_LABELS[item] || item}</span>
                                            </label>
                                            {b.outfitDetails[item]?.enabled && (
                                                <div className="w-32">
                                                    <Select
                                                        value={b.outfitDetails[item]?.color}
                                                        onChange={(v) => updateBusinessOutfit(item, 'color', v)}
                                                        options={OUTFIT_COLORS}
                                                        className="py-1 px-2 text-xs h-7"
                                                        noBorder
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Setting Section */}
                        <div className="space-y-3">
                            <div className={groupClass}>
                                <h4 className={titleClass}>2. Bối Cảnh Studio</h4>
                                <div className="grid grid-cols-1 gap-3">
                                    <div>
                                        <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Màu Nền</label>
                                        <div className="flex gap-2 items-center">
                                            <Select value={b.backgroundColor} onChange={(v) => updateBusinessDirect('backgroundColor', v)} options={BACKGROUND_COLORS} className="py-1.5 flex-grow" />
                                            <Checkbox label="Gradient" checked={b.backgroundType === 'gradient'} onChange={(c) => updateBusinessDirect('backgroundType', c ? 'gradient' : 'solid')} className="text-xs" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Tone Màu Ảnh</label>
                                        <Select value={b.tone} onChange={(v) => updateBusinessDirect('tone', v)} options={BUSINESS_TONES} className="py-1.5" />
                                    </div>
                                </div>
                            </div>
                            <div className={groupClass}>
                                <h4 className={titleClass}>3. Màu Ghế (Nếu ngồi)</h4>
                                <Select value={b.chairColor} onChange={(v) => updateBusinessDirect('chairColor', v)} options={FURNITURE_COLORS} className="py-1.5" />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
});

const PromptInput: React.FC<PromptInputProps> = ({ onBrainstorm, isLoading, isDarkMode, toggleTheme, useProModel, setUseProModel }) => {
    const [input, setInput] = useState('');
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [showOptions, setShowOptions] = useState(true);
    const [activeTab, setActiveTab] = useState<'camera' | 'pose' | 'style' | 'custom'>('camera');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [options, setOptions] = useState<BrainstormOptions>({
        mode: 'creative', useProModel,
        shotTypes: { full: false, medium: false, extreme: false },
        cameraAngles: { front: false, high: false, low: false, birdEye: false, worm: false, back: false, wide: false, telephoto: false, ots: false, pov: false },
        bodyDirections: { frontal: false, fortyFive: false, ninety: false, back: false },
        headDirections: { frontal: false, turned: false, profile: false, tiltedUp: false, tiltedDown: false, lookingBack: false },
        gaze: { direct: false, away: false, down: false, closed: false, squint: false, up: false },
        sitting: { floor: false, object: false, chair: false, fixedObject: false, kneeling: false, prone: false, supine: false, reclining: false, sideLying: false },
        colorGrading: 'none', makeupStyle: 'none', includeSignature: false, signatureText: '', noMakeup: false, outfit: '', disableHairDescription: false, hairDetail: false,
        hairLength: { short: false, medium: false, long: false }, hairStyle: 'none',
        details: { fingers: false, oneHand: false, twoHands: false, faceAngles: false, lowJump: false, twoLegs: false, cuteFace: false },
        customExpression: '', customAction: '', quote: '',
        // 🆕 NEW: Pose Categories
        poseCategories: {
            fullBody: false,
            midShot: false,
            closeUp: false,
            handPoses: false,
            interaction: false,
            headAngles: false,
            cameraAngles: false,
            moodyDark: false,
            lifestyle: false
        },
        business: {
            gender: 'female',
            hairStyles: { default: true },
            // 🆕 UPDATED: selectedShotTypes instead of shotTypes
            selectedShotTypes: { closeUp: true, midShot: true, fullBody: true },
            orientation: { frontal: true, bodyTurn: false, faceTurn: false },
            sitting: { armchair: false, sofa: false, table: false, highChair: false, studioChair: false, woodenChair: false },
            chairColor: 'default',
            tone: 'color', backgroundType: 'solid', backgroundColor: 'gray',
            outfitDetails: { blazer: { enabled: false, color: 'black' }, vest: { enabled: false, color: 'black' }, shirt: { enabled: false, color: 'black' }, turtleneck: { enabled: false, color: 'black' } },
            accessories: { notebook: false, watch: false, pen: false, laptop: false, phone: false, glasses: false, coffee: false, handbag: false }
        },
        // 🆕 NEW: Portrait Mode Options
        portrait: {
            skinTone: 'fair_white',
            hairStyle: 'wavy',
            colorGrading: 'golden_hour',
            background: 'white_clean',
            makeup: {
                eyes: 'peach_shimmer',
                face: 'dewy',
                lips: 'glossy_peach'
            }
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedImage) return;
        if (input.trim() || selectedImage || options.mode === 'business' || options.mode === 'portrait') onBrainstorm(input.trim(), selectedImage, options);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setSelectedImage(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    // Optimized updaters using useCallback
    const updateOption = useCallback((cat: keyof BrainstormOptions, key: string, val: any) =>
        setOptions(p => {
            const category = p[cat];
            if (typeof category === 'object' && category !== null && !Array.isArray(category) && key in category) {
                return { ...p, [cat]: { ...(category as any), [key]: val } };
            }
            return { ...p, [key]: val };
        }), []);

    const updateBusinessOption = useCallback((cat: keyof BrainstormOptions['business'], key: string, val: any) =>
        setOptions(p => ({ ...p, business: { ...p.business, [cat]: { ...(p.business[cat] as any), [key]: val } } })), []);

    const updateBusinessDirect = useCallback((key: keyof BrainstormOptions['business'], val: any) =>
        setOptions(p => ({ ...p, business: { ...p.business, [key]: val } })), []);

    const updateBusinessOutfit = useCallback((item: string, field: string, val: any) =>
        setOptions(p => {
            let newOutfit = { ...p.business.outfitDetails };
            newOutfit = { ...newOutfit, [item]: { ...newOutfit[item as keyof typeof newOutfit], [field]: val } };
            return { ...p, business: { ...p.business, outfitDetails: newOutfit } };
        }), []);

    const updatePortraitOption = useCallback((key: keyof BrainstormOptions['portrait'], val: any) =>
        setOptions(p => ({ ...p, portrait: { ...p.portrait, [key]: val } })), []);

    const updatePortraitMakeup = useCallback((key: string, val: any) =>
        setOptions(p => ({ ...p, portrait: { ...p.portrait, makeup: { ...p.portrait.makeup, [key]: val } } })), []);

    return (
        <div className="w-full max-w-4xl mx-auto p-4">
            <form onSubmit={handleSubmit} className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-30 dark:opacity-40 group-hover:opacity-60 transition duration-1000 hidden md:block"></div>
                <div className="relative flex flex-col bg-white dark:bg-slate-800 rounded-2xl p-3 shadow-xl ring-1 ring-slate-200 dark:ring-slate-700 overflow-hidden">

                    <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-700 mb-2 px-2">
                        <div className="flex-1 flex justify-start">
                            <label className="inline-flex items-center cursor-pointer">
                                <input type="checkbox" checked={useProModel} onChange={(e) => setUseProModel(e.target.checked)} className="sr-only peer" />
                                <div className="relative w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                                <span className="ms-3 text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1">PRO MODE {useProModel && <StarIcon className="h-3 w-3 text-amber-500" />}</span>
                            </label>
                        </div>
                        <div className="bg-slate-100 dark:bg-slate-900/50 p-1 rounded-xl flex shadow-inner">
                            {['creative', 'business', 'portrait'].map(m => (
                                <button key={m} type="button" onClick={() => updateOption('mode', 'mode', m)} className={`px-6 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 ${options.mode === m ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm' : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'}`}>
                                    <div className="flex items-center gap-2 capitalize">
                                        {m === 'creative' ? <SparklesIcon className="h-3.5 w-3.5" /> : m === 'business' ? <BriefcaseIcon className="h-3.5 w-3.5" /> : <FaceSmileIcon className="h-3.5 w-3.5" />}
                                        {m === 'business' ? 'Profile' : m === 'portrait' ? 'Portrait' : m} Mode
                                    </div>
                                </button>
                            ))}
                        </div>
                        <div className="flex-1 flex justify-end">
                            <button type="button" onClick={toggleTheme} className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-all text-xs font-bold">
                                {isDarkMode ? <SunIcon className="h-4 w-4 text-amber-400" /> : <MoonIcon className="h-4 w-4 text-indigo-400" />} {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                            </button>
                        </div>
                    </div>

                    {selectedImage && (
                        <div className="relative mx-4 mt-2 mb-2 w-fit group/image">
                            <img src={selectedImage} alt="Reference" className="h-24 w-auto rounded-lg border border-slate-200 dark:border-slate-600 object-cover shadow-md" />
                            <button type="button" onClick={() => { setSelectedImage(null); if (fileInputRef.current) fileInputRef.current.value = ''; }} className="absolute -top-2 -right-2 bg-white text-slate-400 hover:text-red-500 rounded-full p-1 border shadow-sm"><XMarkIcon className="h-4 w-4" /></button>
                        </div>
                    )}

                    <div className="flex items-end gap-2 relative">
                        <textarea value={input} onChange={(e) => setInput(e.target.value)} disabled={isLoading} placeholder="Vui lòng tải ảnh của bạn lên, rồi nhập mô tả (optional)..." className="w-full bg-transparent text-slate-800 dark:text-slate-100 placeholder:text-slate-500 placeholder:font-bold px-4 py-3 outline-none resize-none min-h-[60px] text-lg rounded-xl focus:bg-slate-50 dark:focus:bg-slate-900/50 transition-colors" rows={1} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit(e); } }} />
                        <div className="flex items-center gap-2 pb-2 pr-2">
                            <input type="file" accept="image/*" ref={fileInputRef} className="hidden" onChange={handleFileChange} />
                            {options.mode === 'creative' && <button type="button" onClick={() => setShowOptions(!showOptions)} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-indigo-500"><AdjustmentsHorizontalIcon className="h-6 w-6" /></button>}
                            <button type="button" onClick={() => fileInputRef.current?.click()} disabled={isLoading} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-indigo-500"><PhotoIcon className="h-6 w-6" /></button>
                            <button type="submit" disabled={!selectedImage || isLoading} className="p-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white shadow-lg active:scale-95">
                                {isLoading ? <div className="h-6 w-6 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <PaperAirplaneIcon className="h-6 w-6" />}
                            </button>
                        </div>
                    </div>

                    {isLoading && <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-shimmer w-full"></div>}

                    {options.mode === 'creative' && showOptions && (
                        <div className="mt-2 animate-fade-in">
                            <div className="flex overflow-x-auto mb-4 px-2 scrollbar-hide border-b border-slate-100 dark:border-slate-700">
                                {[
                                    ['camera', 'Camera', CameraIcon],
                                    ['pose', 'Tư Thế', UserIcon],
                                    ['style', 'Style', PaintBrushIcon],
                                    ['custom', 'Tùy Biến', ChatBubbleBottomCenterTextIcon]
                                ].map(([id, l, I]) => (
                                    <button key={id} type="button" onClick={() => setActiveTab(id)} className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-all ${activeTab === id ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-500/10 rounded-t-lg' : 'border-transparent text-slate-500 dark:text-slate-400'}`}><I className="h-4 w-4" />{l}</button>
                                ))}
                            </div>
                            <div className="px-4 pb-4 min-h-[200px] max-h-[50vh] overflow-y-auto">
                                {activeTab === 'camera' && <CreativeCameraTab options={options} updateOption={updateOption} />}
                                {activeTab === 'pose' && <CreativePoseTab options={options} updateOption={updateOption} />}
                                {activeTab === 'style' && <CreativeStyleTab options={options} updateOption={updateOption} />}
                                {activeTab === 'custom' && (
                                    <div className="space-y-5 max-w-lg mx-auto py-4">
                                        <div><label className="block text-xs text-slate-500 font-bold mb-1.5">Pose biểu cảm</label><input type="text" value={options.customExpression} onChange={(e) => updateOption('customExpression', 'customExpression', e.target.value)} placeholder="Vd: Lạnh lùng, bí ẩn..." className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm" /></div>
                                        <div><label className="block text-xs text-slate-500 font-bold mb-1.5">Pose hành động</label><input type="text" value={options.customAction} onChange={(e) => updateOption('customAction', 'customAction', e.target.value)} placeholder="Vd: Đang chạy, cầm hoa..." className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm" /></div>
                                        <div className="pt-6 border-t border-slate-200 dark:border-slate-700"><label className="block text-xs text-indigo-600 dark:text-indigo-400 uppercase font-bold mb-1.5">QUOTE / Typography</label><input type="text" value={options.quote} onChange={(e) => updateOption('quote', 'quote', e.target.value)} placeholder="Vd: SUMMER VIBES..." className="w-full bg-slate-50 dark:bg-slate-900 border border-indigo-200 rounded-lg px-3 py-2 text-sm font-mono" /></div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {options.mode === 'business' && <ProfileModeTab options={options} updateBusinessOption={updateBusinessOption} updateBusinessDirect={updateBusinessDirect} updateBusinessOutfit={updateBusinessOutfit} />}

                    {options.mode === 'portrait' && <PortraitModeTab options={options} updatePortraitOption={updatePortraitOption} updatePortraitMakeup={updatePortraitMakeup} />}
                </div>
            </form>
        </div>
    );
};

export default PromptInput;
