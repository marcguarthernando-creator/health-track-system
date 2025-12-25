
import React, { useState } from 'react';
import StaffSidebar from '@/components/StaffSidebar';

const MedicalInjuryForm: React.FC = () => {
    return (
        <div className="flex bg-background-dark min-h-screen text-white font-display">
            <StaffSidebar />
            <main className="flex-1 p-8">
                <header className="mb-12">
                    <h1 className="text-4xl font-black tracking-tighter italic uppercase text-white">PARTE MÉDICO</h1>
                    <p className="text-secondary text-sm font-bold uppercase tracking-widest opacity-40">Registro clínico de lesiones y tratamientos.</p>
                </header>
                <div className="bg-surface-dark p-8 rounded-3xl border border-white/5 max-w-4xl space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-secondary tracking-widest opacity-60">Jugador</label>
                            <select className="w-full bg-[#0b1120] border border-[#334155] rounded-xl p-3 text-white text-sm focus:border-primary outline-none appearance-none">
                                <option>Seleccionar Jugador...</option>
                                <option>Babel Lipasi</option>
                                <option>Daniel Rodríguez</option>
                                <option>Marc Guart</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-secondary tracking-widest opacity-60">Tipo de Lesión</label>
                            <input className="w-full bg-[#0b1120] border border-[#334155] rounded-xl p-3 text-white text-sm focus:border-primary outline-none" placeholder="Ej: Esguince, Rotura..." />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-secondary tracking-widest opacity-60">Observaciones y Tratamiento</label>
                        <textarea className="w-full bg-[#0b1120] border border-[#334155] rounded-xl p-3 text-white text-sm focus:border-primary outline-none h-32" placeholder="Describir síntomas, diagnóstico y pauta..." />
                    </div>
                    <button className="bg-primary text-[#0b1120] font-black py-4 px-8 rounded-2xl uppercase tracking-widest text-xs hover:brightness-110 shadow-glow transition-all">
                        Guardar Parte Médico
                    </button>
                </div>
            </main>
        </div>
    );
};

export default MedicalInjuryForm;
