
import React from 'react';
import { useUser } from '../contexts/UserContext';
import { useLanguage } from '../contexts/LanguageContext';

interface DailyWorkViewProps {
    onFinish: () => void;
}

const DailyWorkView: React.FC<DailyWorkViewProps> = ({ onFinish }) => {
    const { flowState } = useUser();
    const { t } = useLanguage();
    const exercises = flowState.dailyExercises;

    return (
        <div className="flex flex-col gap-6 max-w-2xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-black italic tracking-tighter text-center mb-1 text-white uppercase">{t('gym.title')}</h2>
            <p className="text-center text-xs font-bold uppercase tracking-widest text-secondary mb-4 opacity-50">Focus on eccentric control today.</p>

            <div className="bg-surface-dark rounded-2xl border border-[#334155] overflow-hidden">
                {exercises.map((ex, i) => (
                    <div key={i} className="p-4 border-b border-[#334155] last:border-0 flex justify-between items-center group hover:bg-[#1e293b] transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="size-10 rounded-full bg-[#0b1120] flex items-center justify-center text-primary font-bold border border-[#334155]">
                                {i + 1}
                            </div>
                            <div>
                                <div className="font-bold text-white text-lg tracking-tight uppercase italic">{ex.name}</div>
                                <div className="text-[10px] uppercase font-black tracking-widest text-secondary">{t('gym.target')}</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-white font-mono font-bold">{ex.sets} x {ex.reps}</div>
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={onFinish}
                className="mt-4 bg-primary text-[#0b1120] font-black py-4 rounded-2xl text-lg hover:shadow-glow transition-all flex items-center justify-center gap-2 uppercase tracking-tight"
            >
                <span className="material-symbols-outlined">check_circle</span>
                {t('gym.finish')}
            </button>
        </div>
    );
};

export default DailyWorkView;
