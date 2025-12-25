
import React from 'react';
import StaffSidebar from '../../components/StaffSidebar';
import { mockPlayers } from '../../data/mockPlayers';

const Questionnaires: React.FC = () => {
    return (
        <div className="flex bg-background-dark min-h-screen text-white font-display">
            <StaffSidebar />
            <main className="flex-1 p-8 overflow-y-auto">
                <header className="mb-12">
                    <h1 className="text-4xl font-black tracking-tight">Cuestionarios Diarios</h1>
                    <p className="text-secondary text-lg">Resumen de respuestas de bienestar y RPE.</p>
                </header>

                <div className="grid grid-cols-1 gap-4">
                    {mockPlayers.map((player, idx) => (
                        <div key={idx} className="bg-surface-dark p-6 rounded-3xl border border-[#334155] flex items-center justify-between group hover:border-primary/30 transition-all">
                            <div className="flex items-center gap-6">
                                <img src={player.image} alt={player.name} className="size-16 rounded-2xl object-cover" />
                                <div>
                                    <div className="font-bold text-xl">{player.name}</div>
                                    <div className="text-xs text-secondary font-bold uppercase tracking-widest">Enviado a las 08:45 AM</div>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="text-center px-4 py-2 bg-[#0b1120] rounded-xl border border-[#334155]">
                                    <div className="text-[10px] text-secondary uppercase font-bold">Wellness</div>
                                    <div className="text-primary font-black">9/10</div>
                                </div>
                                <div className="text-center px-4 py-2 bg-[#0b1120] rounded-xl border border-[#334155]">
                                    <div className="text-[10px] text-secondary uppercase font-bold">RPE</div>
                                    <div className="text-yellow-400 font-black">7</div>
                                </div>
                                <button className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-secondary transition-all">
                                    <span className="material-symbols-outlined">visibility</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Questionnaires;
