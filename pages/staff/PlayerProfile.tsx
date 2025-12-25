import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockPlayers } from '../../data/mockPlayers';
import { useUser } from '../../contexts/UserContext';

const PlayerProfile: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { role } = useUser();
    const player = mockPlayers.find(p => p.id === id);
    const [activeTab, setActiveTab] = useState('antropo');

    if (!player) return <div className="p-8 text-white">Jugador no encontrado</div>;

    const tabs = [
        { id: 'antropo', label: 'Antropometría & ROM', icon: 'flexibility' },
        { id: 'history', label: 'Historial Médico', icon: 'medical_history' },
        { id: 'reports', label: 'Informes Diarios', icon: 'description' },
        { id: 'pre', label: 'Información Previa', icon: 'info' },
        { id: 'eval', label: 'Evaluación zonas', icon: 'body_system' },
        { id: 'ai', label: 'IA & Bruto', icon: 'psychology' },
    ];

    // Helper to check if current user is Prepa
    const isPrepa = role === 'staff-prepa';
    const isFisio = role === 'staff-fisio';
    const isMedico = role === 'staff-medico';

    return (
        <div className="bg-background-dark min-h-screen text-white font-display flex flex-col">
            {/* Header */}
            <header className="p-6 border-b border-[#334155] bg-surface-darker/50 backdrop-blur-md flex items-center justify-between sticky top-0 z-20">
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => navigate('/staff')}
                        className="p-2 rounded-full hover:bg-white/5 text-secondary hover:text-white transition-all"
                    >
                        <span className="material-symbols-outlined">arrow_back</span>
                    </button>
                    <div>
                        <h1 className="text-2xl font-black italic uppercase tracking-tighter">
                            Perfil de Jugador: <span className="text-primary">{player.name}</span>
                        </h1>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <button className="px-4 py-2 rounded-xl bg-primary/10 text-primary border border-primary/20 font-bold hover:bg-primary/20 transition-all flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">download</span>
                        Exportar Informe
                    </button>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* Left Sidebar: Photo + Biometrics */}
                <aside className="w-80 border-r border-[#334155] p-8 flex flex-col gap-8 overflow-y-auto bg-surface-dark/30">
                    <div className="relative group">
                        <img
                            src={player.image}
                            alt={player.name}
                            className="w-full aspect-[3/4] object-cover rounded-[2rem] border-2 border-[#334155] shadow-2xl group-hover:border-primary transition-all"
                        />
                        <div className="absolute -bottom-4 -right-4 size-16 bg-primary rounded-2xl flex items-center justify-center text-[#0b1120] font-black text-xl shadow-glow">
                            {player.riskScore}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-secondary font-black uppercase text-xs tracking-widest border-b border-[#334155] pb-2">Datos Biométricos</h3>
                        {[
                            { label: 'Edad', val: player.age + ' años' },
                            { label: 'Altura', val: player.height },
                            { label: 'Peso', val: player.weight },
                            { label: 'Posición', val: player.position },
                        ].map((item, i) => (
                            <div key={i}>
                                <div className="text-xs text-secondary mb-1">{item.label}</div>
                                <div className="text-xl font-bold">{item.val}</div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-auto p-4 rounded-2xl bg-primary/5 border border-primary/10">
                        <div className="flex items-center gap-2 text-primary mb-2">
                            <span className="material-symbols-outlined text-sm">psychology</span>
                            <span className="font-bold text-xs uppercase tracking-wider">AI Insight</span>
                        </div>
                        <p className="text-xs text-secondary leading-relaxed italic">
                            "El jugador muestra una fatiga acumulada en la zona rotuliana. Se recomienda reducir carga de impacto en 20% hoy."
                        </p>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto flex flex-col">
                    {/* Tabs Navigation */}
                    <div className="flex px-8 border-b border-[#334155] bg-surface-darker/30 sticky top-0 z-10 backdrop-blur-sm">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-8 py-5 font-bold text-sm uppercase tracking-wider transition-all border-b-2 flex items-center gap-3 ${activeTab === tab.id
                                    ? 'border-primary text-primary bg-primary/5'
                                    : 'border-transparent text-secondary hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <span className="material-symbols-outlined text-xl">{tab.icon}</span>
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="p-10 max-w-5xl">
                        {/* Tab Content: Anthropometry */}
                        {activeTab === 'antropo' && (
                            <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-12">
                                <section>
                                    <h2 className="text-3xl font-black mb-6">Composición Corporal</h2>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                        {[
                                            { label: 'Grasa', val: player.fatPct, color: 'text-red-400' },
                                            { label: 'Músculo', val: player.musclePct, color: 'text-green-400' },
                                            { label: 'Óseo', val: player.bonePct, color: 'text-primary' },
                                            { label: 'Residual', val: player.residualPct, color: 'text-secondary' },
                                        ].map((item, i) => (
                                            <div key={i} className="bg-surface-dark p-6 rounded-3xl border border-[#334155]">
                                                <div className="text-xs font-bold text-secondary uppercase mb-2">{item.label}</div>
                                                <div className={`text-4xl font-black ${item.color}`}>{item.val}</div>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                <section>
                                    <h2 className="text-3xl font-black mb-6">Somatotipo</h2>
                                    <div className="grid grid-cols-3 gap-6">
                                        {[
                                            { label: 'Endomorfia', val: player.endo },
                                            { label: 'Mesomorfia', val: player.meso },
                                            { label: 'Ectomorfia', val: player.ecto },
                                        ].map((item, i) => (
                                            <div key={i} className="bg-surface-dark p-6 rounded-3xl border border-[#334155] text-center">
                                                <div className="text-xs font-bold text-secondary uppercase mb-2">{item.label}</div>
                                                <div className="text-4xl font-black text-white">{item.val}</div>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                <section className="p-8 rounded-3xl bg-[#0b1120] border border-[#334155]">
                                    <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                                        <span className="material-symbols-outlined text-primary">flexibility</span>
                                        ROM (Range of Movement)
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        {['Hombro Flexión 170°', 'Cadera Flexión 125°', 'Dorsiflexión Tobillo 35°', 'Rotación Interna Cadera 40°'].map((rom, i) => (
                                            <div key={i} className="p-4 bg-surface-dark rounded-xl border border-[#334155] flex justify-between">
                                                <span className="text-secondary">{rom.split(' ')[0]} {rom.split(' ')[1]}</span>
                                                <span className="font-bold text-primary">{rom.split(' ')[2]}</span>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            </div>
                        )}

                        {/* Tab Content: Medical History */}
                        {activeTab === 'history' && (
                            <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-8">
                                <div className="flex items-center justify-between mb-2">
                                    <h2 className="text-3xl font-black">Historial de Lesiones</h2>
                                    <button className="p-2 px-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all font-bold text-xs uppercase flex items-center gap-2">
                                        <span className="material-symbols-outlined text-sm">add</span>
                                        Añadir Lesión
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {player.injuries.map(injury => (
                                        <div key={injury.id} className="bg-surface-dark border border-[#334155] rounded-3xl overflow-hidden shadow-lg">
                                            <div className="p-6 flex justify-between items-start border-b border-[#334155]/50">
                                                <div>
                                                    <div className="flex items-center gap-3 mb-1">
                                                        <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-black ${injury.status === 'Active' ? 'bg-red-500 text-white' : 'bg-green-500/20 text-green-400'}`}>
                                                            {injury.status}
                                                        </span>
                                                        <span className="text-secondary text-xs font-bold">{injury.date}</span>
                                                    </div>
                                                    <h4 className="text-xl font-bold">{injury.type} - {injury.location}</h4>
                                                </div>
                                                {isMedico && (
                                                    <button className="p-2 rounded-full hover:bg-white/5 text-secondary" title="Marcar como privado">
                                                        <span className="material-symbols-outlined">visibility_off</span>
                                                    </button>
                                                )}
                                            </div>
                                            <div className="p-6 bg-[#0b1120]/30">
                                                <p className="text-secondary text-sm leading-relaxed mb-4">{injury.notes}</p>
                                                {!isPrepa && (
                                                    <div className="flex gap-4">
                                                        <button className="text-xs font-bold text-primary flex items-center gap-1 hover:underline">
                                                            <span className="material-symbols-outlined text-sm">description</span> Informe Médico
                                                        </button>
                                                        <button className="text-xs font-bold text-primary flex items-center gap-1 hover:underline">
                                                            <span className="material-symbols-outlined text-sm">physical_therapy</span> Informe Fisio
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Tab Content: Daily Reports History */}
                        {activeTab === 'reports' && (
                            <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-6">
                                <h2 className="text-3xl font-black mb-2">Historial de Informes Médicos</h2>
                                <p className="text-secondary mb-8">Informes diarios generados automáticamente tras los cuestionarios del jugador y la sincronización de Whoop/Kinexon.</p>

                                <div className="grid grid-cols-1 gap-4">
                                    {(player.dailyReports || []).map((report, idx) => (
                                        <div
                                            key={report.id}
                                            onClick={() => navigate(`/staff/report/${player.id}`)}
                                            className="bg-surface-dark p-6 rounded-3xl border border-[#334155] flex justify-between items-center group hover:border-primary transition-all cursor-pointer"
                                        >
                                            <div className="flex items-center gap-6">
                                                <div className="size-14 rounded-2xl bg-[#0b1120] flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-[#0b1120] transition-all">
                                                    <span className="material-symbols-outlined text-3xl">description</span>
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-3 mb-1">
                                                        <span className="text-secondary text-xs font-bold uppercase tracking-widest">{report.date}</span>
                                                        <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-black ${report.status === 'OPTIMO' ? 'bg-green-500/20 text-green-400' : report.status === 'PRECAUCION' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>
                                                            {report.status}
                                                        </span>
                                                    </div>
                                                    <h3 className="text-xl font-bold">{report.summary}</h3>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <button className="p-3 rounded-full hover:bg-white/5 text-secondary flex items-center gap-2 font-bold text-xs uppercase">
                                                    <span className="material-symbols-outlined">download</span>
                                                </button>
                                                <span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">chevron_right</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Tab Content: Pre-Club Info */}
                        {activeTab === 'pre' && (
                            <div className="animate-in fade-in slide-in-from-right-4 duration-500 grid grid-cols-1 md:grid-cols-2 gap-8">
                                {[
                                    { label: 'Medicación Habitual', icon: 'pill', items: player.medication, hidden: isPrepa },
                                    { label: 'Suplementación', icon: 'nutrition', items: ['Creatina', 'Proteína Whey'] },
                                    { label: 'Alergias', icon: 'warning', items: player.allergies },
                                    { label: 'Lesiones Previas al Club', icon: 'history', items: ['Fractura de radio tras caída (2021)'] },
                                    { label: 'Antecedentes Familiares', icon: 'family_history', items: ['Diabetes Tipo 2 (Padre)'], hidden: isPrepa },
                                    { label: 'Antecedentes Personales', icon: 'person', items: ['Asma por esfuerzo leve'], hidden: isPrepa },
                                ].filter(s => !s.hidden).map((sec, i) => (
                                    <section key={i} className="bg-surface-dark p-6 rounded-3xl border border-[#334155]">
                                        <div className="flex items-center gap-3 mb-4 text-primary">
                                            <span className="material-symbols-outlined">{sec.icon}</span>
                                            <h3 className="font-black uppercase tracking-wider text-sm">{sec.label}</h3>
                                        </div>
                                        <div className="space-y-2">
                                            {sec.items.length > 0 ? sec.items.map((it, idx) => (
                                                <div key={idx} className="p-3 bg-[#0b1120] rounded-xl text-sm border border-[#334155]">{it}</div>
                                            )) : <div className="text-secondary text-sm italic">Ninguno registrado</div>}
                                        </div>
                                    </section>
                                ))}
                            </div>
                        )}

                        {/* Tab Content: IA & Bruto */}
                        {activeTab === 'ai' && (
                            <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-8">
                                <section>
                                    <h2 className="text-2xl font-black mb-4">Informes Generados por IA</h2>
                                    <div className="space-y-3">
                                        {['Informe Carga Semanal - 24/12/23', 'Análisis Riesgo Lesión - 20/12/23', 'Resumen Evolución Antropométrica'].map((inf, i) => (
                                            <div key={i} className="p-4 bg-surface-dark border border-[#334155] rounded-2xl flex justify-between items-center">
                                                <span className="font-medium">{inf}</span>
                                                <button className="text-primary font-bold text-xs uppercase">Ver Detalles</button>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                                <section>
                                    <h2 className="text-2xl font-black mb-4">Cuestionarios en Bruto</h2>
                                    <div className="bg-[#0b1120] rounded-3xl border border-[#334155] overflow-hidden">
                                        <table className="w-full text-left">
                                            <thead className="bg-white/5 text-xs uppercase text-secondary">
                                                <tr>
                                                    <th className="p-4">Fecha</th>
                                                    <th className="p-4">Wellness</th>
                                                    <th className="p-4">Soreness</th>
                                                    <th className="p-4">sRPE</th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-sm">
                                                {[
                                                    { date: 'Hoy', w: '9/10', s: 'Ninguna', r: '7' },
                                                    { date: 'Ayer', w: '8/10', s: 'Cuádriceps', r: '8' },
                                                    { date: '23 Dic', w: '7/10', s: 'Espalda', r: '6' },
                                                ].map((row, i) => (
                                                    <tr key={i} className="border-t border-[#334155]/50">
                                                        <td className="p-4 font-bold">{row.date}</td>
                                                        <td className="p-4">{row.w}</td>
                                                        <td className="p-4">{row.s}</td>
                                                        <td className="p-4 text-primary font-black">{row.r}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </section>
                            </div>
                        )}

                        {/* Tab Content: Evaluations */}
                        {activeTab === 'eval' && (
                            <div className="animate-in fade-in slide-in-from-right-4 duration-500 grid grid-cols-1 gap-6">
                                {['UPPER BODY', 'SPINAL COLUMN', 'LOWER BODY', 'ABS'].map((zone, i) => (
                                    <div key={i} className="bg-surface-dark p-8 rounded-3xl border border-[#334155] flex justify-between items-center group hover:border-primary transition-all">
                                        <div>
                                            <h3 className="text-2xl font-black mb-1">{zone}</h3>
                                            <p className="text-secondary text-sm">Última evaluación: Diciembre 2025</p>
                                        </div>
                                        <div className="flex items-center gap-8">
                                            <div className="text-right">
                                                <div className="text-primary font-black text-2xl">8.5/10</div>
                                                <div className="text-[10px] text-secondary uppercase font-bold">Puntuación</div>
                                            </div>
                                            <button className="size-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-[#0b1120] transition-all">
                                                <span className="material-symbols-outlined">chevron_right</span>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default PlayerProfile;
