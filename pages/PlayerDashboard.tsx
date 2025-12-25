
import React, { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';
import DailyWorkView from '../components/DailyWorkView';

const PlayerDashboard: React.FC = () => {
    const { flowState, updateFlowState, logout, checkDailyReset, userEmail } = useUser();
    const { t } = useLanguage();

    useEffect(() => {
        checkDailyReset();
    }, []);

    const handleWorkoutFinish = () => {
        updateFlowState({ workoutCompleted: true });
    };

    const renderContent = () => {
        const isDone = flowState.workoutCompleted || (flowState.isRestDay && flowState.formsCompleted);

        if (isDone) {
            return (
                <div className="flex flex-col items-center justify-center gap-6 mt-10 animate-in fade-in zoom-in duration-500">
                    <div className="size-24 rounded-full bg-primary/20 flex items-center justify-center text-primary border border-primary/50 shadow-glow">
                        <span className="material-symbols-outlined text-5xl">check_circle</span>
                    </div>
                    <div className="text-center">
                        <h2 className="text-3xl font-black italic tracking-tighter uppercase mb-2">{t('player.done_title')}</h2>
                        <p className="text-secondary text-sm font-bold uppercase tracking-widest leading-relaxed max-w-sm mx-auto opacity-70 px-6">
                            {flowState.isRestDay ? t('player.done_rest') : t('player.done_train')}
                        </p>
                    </div>
                    <Link to="/" className="mt-8 px-8 py-3.5 rounded-full bg-primary text-[#0b1120] font-black uppercase tracking-tighter hover:brightness-110 shadow-glow transition-all">
                        {t('player.back_home')}
                    </Link>
                </div>
            );
        }

        return <DailyWorkView onFinish={handleWorkoutFinish} />;
    };

    return (
        <div className="bg-background-dark min-h-screen text-white flex flex-col font-display">
            <header className="sticky top-0 z-10 bg-[#0b1120]/90 backdrop-blur-md border-b border-[#334155] px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
                    <span className="font-black italic tracking-tighter hidden md:inline">PLAYER <span className="text-primary italic">ZONE</span></span>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-right hidden md:block">
                        <div className="font-black italic text-sm uppercase tracking-tighter">{userEmail === 'jugador@player.com' ? 'Babel Lipasi' : 'Alex Morgan'}</div>
                        <div className="text-[10px] text-secondary font-black uppercase tracking-widest opacity-60">Athlete</div>
                    </div>
                    <div className="size-10 bg-center bg-cover rounded-full border-2 border-[#1e293b] shadow-sm" style={{ backgroundImage: userEmail === 'jugador@player.com' ? 'url("/assets/photos/BABEL_LIPASI.PNG")' : 'url("https://picsum.photos/seed/alex/100/100")' }}></div>
                    <button onClick={logout} className="p-2 rounded-full hover:bg-white/5 text-secondary hover:text-white transition-colors">
                        <span className="material-symbols-outlined">logout</span>
                    </button>
                </div>
            </header>

            <main className="flex-1 p-6 md:p-12 max-w-5xl mx-auto w-full">
                {renderContent()}
            </main>
        </div>
    );
};

export default PlayerDashboard;
