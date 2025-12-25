
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { mockPlayers, PlayerData } from '../data/mockPlayers';
import StaffSidebar from '../components/StaffSidebar';
import { useLanguage } from '../contexts/LanguageContext';

const StaffDashboard: React.FC = () => {
    const navigate = useNavigate();
    const { t, language } = useLanguage();

    const getStatusStyles = (status: PlayerData['riskStatus']) => {
        switch (status) {
            case 'Optimal':
                return {
                    bg: 'bg-green-500/10',
                    text: 'text-green-400',
                    border: 'border-green-500/20',
                    label: language === 'es' ? 'Óptimo' : 'Optimal'
                };
            case 'Caution':
                return {
                    bg: 'bg-yellow-500/10',
                    text: 'text-yellow-400',
                    border: 'border-yellow-500/20',
                    label: language === 'es' ? 'Precaución' : 'Caution'
                };
            case 'Critical':
                return {
                    bg: 'bg-red-500/10',
                    text: 'text-red-400',
                    border: 'border-red-500/20',
                    label: language === 'es' ? 'Crítico' : 'Critical'
                };
        }
    };

    return (
        <div className="flex bg-background-dark min-h-screen text-white font-display">
            <StaffSidebar />
            <main className="flex-1 p-8 overflow-y-auto">
                <header className="mb-12">
                    <div className="flex items-center gap-4 mb-2">
                        <span className="text-secondary uppercase tracking-widest text-[10px] font-bold italic opacity-60">
                            {language === 'es' ? 'Temporada 2025/26' : 'Season 2025/26'}
                        </span>
                    </div>
                    <h1 className="text-4xl font-black tracking-tighter italic uppercase">{t('staff.title')}</h1>
                    <p className="text-secondary text-sm font-bold uppercase tracking-widest opacity-40">Resumen de carga y riesgo por jugador.</p>
                </header>

                <div className="grid grid-cols-1 gap-4">
                    <div className="bg-surface-dark/50 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-sm">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/5 bg-white/5">
                                    <th className="p-4 text-[10px] font-black uppercase tracking-widest text-secondary opacity-60">Player</th>
                                    <th className="p-4 text-[10px] font-black uppercase tracking-widest text-secondary opacity-60 text-center">{t('staff.risk')}</th>
                                    <th className="p-4 text-[10px] font-black uppercase tracking-widest text-secondary opacity-60 text-center">{t('staff.load')}</th>
                                    <th className="p-4 text-[10px] font-black uppercase tracking-widest text-secondary opacity-60 text-center">{t('staff.sleep')}</th>
                                    <th className="p-4 text-[10px] font-black uppercase tracking-widest text-secondary opacity-60 text-right">{t('staff.actions')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mockPlayers.map((player) => {
                                    const styles = getStatusStyles(player.riskStatus);
                                    return (
                                        <tr key={player.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                                            <td className="p-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="size-10 rounded-full bg-cover bg-center border border-white/10" style={{ backgroundImage: `url(${player.image})` }}></div>
                                                    <div>
                                                        <div className="font-black italic uppercase tracking-tight group-hover:text-primary transition-colors">{player.name}</div>
                                                        <div className="text-[10px] font-bold text-secondary uppercase tracking-widest opacity-60">{player.position}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex justify-center">
                                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${styles.bg} ${styles.text} ${styles.border}`}>
                                                        {styles.label}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="p-4 text-center">
                                                <span className="font-mono font-bold text-lg">{player.load}</span>
                                            </td>
                                            <td className="p-4 text-center">
                                                <span className="font-mono font-bold text-lg">{player.sleep}%</span>
                                            </td>
                                            <td className="p-4 text-right">
                                                <button className="p-2 hover:bg-white/10 rounded-xl transition-colors text-secondary hover:text-white">
                                                    <span className="material-symbols-outlined text-xl">analytics</span>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default StaffDashboard;
