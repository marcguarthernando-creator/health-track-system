
import React, { useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockPlayers } from '../../data/mockPlayers';

const DailyMedicalReport: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const player = mockPlayers.find(p => p.id === id);
    const reportRef = useRef<HTMLDivElement>(null);

    const today = new Date();
    const formattedDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;
    // Format: MM_DD_AA_NOMBRE_APELLIDO
    const filename = `${String(today.getMonth() + 1).padStart(2, '0')}_${String(today.getDate()).padStart(2, '0')}_${String(today.getFullYear()).slice(-2)}_${player?.name.replace(/\s+/g, '_').toUpperCase()}.pdf`;

    useEffect(() => {
        if (player) {
            const originalTitle = document.title;
            document.title = filename.replace('.pdf', '');
            return () => { document.title = originalTitle; };
        }
    }, [filename, player]);

    if (!player) return <div className="p-8 text-white">Jugador no encontrado</div>;

    const handleDownload = () => {
        window.print();
    };

    const metrics = [
        { label: 'WBQ Promedio', val: player.integratedMetrics.wbq, ideal: '≤ 3.0', semaphor: 'bg-green-500', var: '-0.2' },
        { label: 'Fatiga (WBQ)', val: player.integratedMetrics.fatigue + '/7', ideal: '≤ 3', semaphor: player.integratedMetrics.fatigue > 3 ? 'bg-yellow-500' : 'bg-green-500', var: '0' },
        { label: 'Dolor Muscular', val: player.integratedMetrics.soreness + '/7', ideal: '≤ 3', semaphor: player.integratedMetrics.soreness > 3 ? 'bg-yellow-500' : 'bg-green-500', var: '-1' },
        { label: 'AAL Máximo', val: player.integratedMetrics.aal, ideal: '< 400', semaphor: player.integratedMetrics.aal > 400 ? 'bg-yellow-500' : 'bg-green-500', var: 'vs prev' },
        { label: 'RHR (Whoop)', val: player.integratedMetrics.rhr + ' BPM', ideal: '38-58', semaphor: 'bg-green-500', var: 'Estable' },
        { label: 'HRV (Whoop)', val: player.integratedMetrics.hrv + ' ms', ideal: '50-80', semaphor: 'bg-green-500', var: '+2 ms' },
        { label: 'Minutos Juego', val: player.integratedMetrics.minutes + ' min', ideal: 'Std', semaphor: 'bg-green-500', var: 'Media: 34' },
    ];

    return (
        <div className="bg-[#f8fafc] min-h-screen font-sans text-slate-900 pb-20 print:pb-0 print:bg-white">
            <style>
                {`
                @media print {
                    @page {
                        size: A4;
                        margin: 8mm;
                    }
                    body {
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                        background: white !important;
                    }
                    .print-compact {
                        transform: scale(0.94);
                        transform-origin: top center;
                        width: 100% !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        border: none !important;
                        box-shadow: none !important;
                    }
                    .no-print {
                        display: none !important;
                    }
                }
                `}
            </style>

            {/* Functional UI Header (Not part of the report) */}
            <div className="bg-white border-b border-slate-200 p-4 mb-4 flex justify-between items-center sticky top-0 z-50 print:hidden shadow-md">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-slate-700 hover:bg-slate-100 px-4 py-2 rounded-xl font-bold transition-all"
                >
                    <span className="material-symbols-outlined">arrow_back</span> Volver
                </button>
                <div className="flex items-center gap-4">
                    <div className="hidden md:flex flex-col items-end">
                        <span className="text-[10px] text-slate-400 font-mono uppercase tracking-tighter">Sugerencia de descarga</span>
                        <span className="text-xs text-indigo-600 font-bold">{filename}</span>
                    </div>
                    <button
                        onClick={handleDownload}
                        className="bg-[#1e3a8a] text-white px-8 py-2.5 rounded-full font-bold shadow-lg hover:bg-indigo-700 hover:scale-105 transition-all flex items-center gap-3"
                    >
                        <span className="material-symbols-outlined uppercase text-sm">download</span> Descargar PDF
                    </button>
                </div>
            </div>

            {/* The Report Document */}
            <div ref={reportRef} className="max-w-[850px] mx-auto bg-white shadow-2xl border border-slate-100 p-10 print:p-0 print:m-0 print:max-w-none print-compact">

                {/* Header Section with Branding */}
                <div className="bg-[#1e3a8a] text-white p-4 mb-6 flex justify-between items-center rounded-sm">
                    <h1 className="text-xl font-bold tracking-tight uppercase">INFORME MÉDICO DEPORTIVO - CB CANARIAS</h1>
                    <div className="flex items-center gap-4 bg-white/10 p-1.5 rounded-md">
                        <img src="/logo.png" alt="App Logo" className="h-7 brightness-200" />
                        <div className="w-px h-6 bg-white/20"></div>
                        <img src="/assets/photos/escudo-cbc.png" alt="Club Crest" className="h-7 object-contain" />
                    </div>
                </div>

                {/* Player Metadata Restructured Grid */}
                <div className="flex items-start gap-10 mb-8 border-b border-slate-100 pb-8">
                    {/* Portrait */}
                    <div className="size-24 rounded-full border-4 border-indigo-50 p-1 shadow-sm shrink-0">
                        <img src={player.image} alt="" className="w-full h-full object-cover rounded-full bg-slate-50" />
                    </div>

                    {/* Info Grid */}
                    <div className="grid grid-cols-3 gap-x-12 gap-y-6 flex-1 pt-1">
                        {/* Paciente */}
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Paciente</span>
                            <span className="text-lg font-black text-slate-800 uppercase leading-none">{player.name}</span>
                        </div>

                        {/* Posición */}
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Posición</span>
                            <span className="text-base font-bold text-slate-700 uppercase leading-none">{player.position}</span>
                        </div>

                        {/* Fecha */}
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Fecha</span>
                            <span className="text-base font-bold text-slate-700 leading-none">{formattedDate}</span>
                        </div>

                        {/* Edad */}
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Edad</span>
                            <span className="text-base font-bold text-slate-700 leading-none">{player.age} años</span>
                        </div>

                        {/* Período */}
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Período</span>
                            <span className="text-base font-bold text-indigo-600 uppercase leading-none italic">Hoy</span>
                        </div>
                    </div>
                </div>

                {/* Part 1: Availability */}
                <div className="mb-8">
                    <div className="flex items-center gap-2 text-[#1e3a8a] font-black uppercase text-[11px] mb-3">
                        <div className="size-3 bg-green-600 rounded-full shadow-sm"></div>
                        PARTE 1: DISPONIBILIDAD PARA JUGAR
                    </div>

                    <div className="bg-green-50 border border-green-100 rounded-xl p-3 mb-6 flex items-center justify-between px-6 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="size-4 bg-green-500 rounded-full shadow-inner"></div>
                            <span className="font-black text-green-900 text-[12px] uppercase tracking-wide">ESTADO: {player.riskStatus === 'Optimal' ? 'APTO ÓPTIMO' : player.riskStatus === 'Caution' ? 'APTO CON PRECAUCIÓN' : 'RIESGO CRÍTICO'}</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-px h-6 bg-green-200"></div>
                            <span className="font-black text-green-900 text-[12px] uppercase tracking-wider">RIESGO: {player.riskScore}%</span>
                        </div>
                    </div>

                    <table className="w-full border-collapse text-[11px] shadow-sm overflow-hidden rounded-lg">
                        <thead>
                            <tr className="bg-[#1e3a8a] text-white">
                                <th className="p-2 text-left border-b border-indigo-900 font-bold uppercase tracking-tight">Métrica / Herramienta</th>
                                <th className="p-2 text-left border-b border-indigo-900 font-bold uppercase tracking-tight">Valor actual</th>
                                <th className="p-2 text-left border-b border-indigo-900 font-bold uppercase tracking-tight">Rango Referencia</th>
                                <th className="p-2 text-left border-b border-indigo-900 font-bold uppercase tracking-tight text-center">Estado</th>
                                <th className="p-2 text-left border-b border-indigo-900 font-bold uppercase tracking-tight">Variación</th>
                            </tr>
                        </thead>
                        <tbody>
                            {metrics.map((m, idx) => (
                                <tr key={idx} className="border-b border-slate-50 hover:bg-slate-50/80 transition-colors">
                                    <td className="p-2 font-bold text-slate-600">{m.label}</td>
                                    <td className="p-2 font-black text-slate-900">{m.val}</td>
                                    <td className="p-2 font-mono text-[10px] text-slate-400">{m.ideal}</td>
                                    <td className="p-2">
                                        <div className="flex items-center justify-center gap-1.5 bg-slate-50 py-0.5 px-2 rounded-full border border-slate-100 mx-auto w-fit">
                                            <div className={`size-2.5 rounded-full ${m.semaphor} shadow-sm`}></div>
                                            <span className="font-bold italic uppercase opacity-60 text-[8px]">{m.semaphor === 'bg-green-500' ? 'Normal' : 'Atención'}</span>
                                        </div>
                                    </td>
                                    <td className="p-2 font-bold text-indigo-600/80">{m.var}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Part 2: Role Specific Info */}
                <div className="mb-8">
                    <div className="flex items-center gap-2 text-[#1e3a8a] font-black uppercase text-[11px] mb-4">
                        <span className="material-symbols-outlined text-[16px]">groups</span>
                        PARTE 2: INFORMACIÓN ESPECÍFICA POR ROL
                    </div>

                    <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                        <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100 hover:border-indigo-100 transition-colors">
                            <div className="flex items-center gap-2 font-bold text-[10px] text-slate-800 border-b border-slate-200 pb-2 mb-2">
                                <span className="material-symbols-outlined text-[14px] text-indigo-600">medical_services</span> MÉDICO
                            </div>
                            <div className="text-[10px] leading-relaxed text-slate-600 space-y-1.5">
                                <div><span className="font-bold text-slate-800">Hallazgos:</span> Adaptación fisiológica normal.</div>
                                <div className="font-black text-indigo-700 uppercase mt-2 bg-indigo-50 w-fit px-2 py-0.5 rounded text-[9px]">Autorización: APTO ÓPTIMO</div>
                            </div>
                        </div>

                        <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100 hover:border-indigo-100 transition-colors">
                            <div className="flex items-center gap-2 font-bold text-[10px] text-slate-800 border-b border-slate-200 pb-2 mb-2">
                                <span className="material-symbols-outlined text-[14px] text-indigo-600">physical_therapy</span> FISIO
                            </div>
                            <div className="text-[10px] leading-relaxed text-slate-600 space-y-1.5">
                                <div><span className="font-bold text-slate-800">Protocolo:</span> Mantenimiento funcional.</div>
                                <div><span className="font-bold text-slate-800">Acción:</span> Protocolo recuperación post-entreno.</div>
                            </div>
                        </div>

                        <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100 hover:border-indigo-100 transition-colors">
                            <div className="flex items-center gap-2 font-bold text-[10px] text-slate-800 border-b border-slate-200 pb-2 mb-2">
                                <span className="material-symbols-outlined text-[14px] text-indigo-600">fitness_center</span> PREPA
                            </div>
                            <div className="text-[10px] leading-relaxed text-slate-600 space-y-1.5">
                                <div><span className="font-bold text-slate-800">Plan:</span> Carga competitiva completa.</div>
                                <div><span className="font-bold text-slate-800">Restricción:</span> Ninguna. Enfoque en volumen.</div>
                            </div>
                        </div>

                        <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100 hover:border-indigo-100 transition-colors">
                            <div className="flex items-center gap-2 font-bold text-[10px] text-slate-800 border-b border-slate-200 pb-2 mb-2">
                                <span className="material-symbols-outlined text-[14px] text-indigo-600">sports</span> ENTRENADOR
                            </div>
                            <div className="text-[10px] leading-relaxed text-slate-600 space-y-1.5">
                                <div><span className="font-bold text-slate-800">Estado:</span> <span className="text-green-700 font-black uppercase">DISPONIBLE 100%</span></div>
                                <div><span className="font-bold text-slate-800">Sugerencia:</span> Sin limitaciones tácticas.</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Context & Comments */}
                <div className="grid grid-cols-2 gap-8 mb-8">
                    <div className="bg-amber-50/40 border border-amber-100 p-4 rounded-2xl">
                        <div className="flex items-center gap-2 text-amber-800 font-black uppercase text-[10px] mb-3">
                            <span className="material-symbols-outlined text-[16px]">chat_bubble</span> COMENTARIO CONTEXTUAL
                        </div>
                        <div className="text-[10px] italic leading-snug text-slate-700">
                            {player.alertMessage || "Excelente predisposición al trabajo. El jugador reporta sensaciones de frescura a pesar del volumen acumulado en la última semana."}
                        </div>
                    </div>

                    <div className="bg-indigo-50/40 border border-indigo-100 rounded-2xl p-4">
                        <div className="flex items-center gap-2 text-indigo-900 font-black uppercase text-[10px] mb-3">
                            <span className="material-symbols-outlined text-[16px]">verified</span> VERIFICACIÓN CLÍNICA
                        </div>
                        <div className="text-[10px] space-y-1 text-indigo-900/80 font-medium">
                            <div className="flex justify-between"><span>Sinergia 360:</span> <span className="font-bold">Coherente</span></div>
                            <div className="flex justify-between"><span>Carga Crónica:</span> <span className="font-bold">Normalizada</span></div>
                            <div className="flex justify-between"><span>Recuperación:</span> <span className="font-bold">Óptima</span></div>
                        </div>
                    </div>
                </div>

                {/* Conclusion */}
                <div className="mb-6 pt-2 border-t border-slate-50">
                    <div className="flex items-center gap-2 text-slate-500 font-black uppercase text-[10px] mb-2 tracking-tighter">
                        <span className="material-symbols-outlined text-[16px]">description</span> SÍNTESIS FINAL
                    </div>
                    <div className="text-[10px] text-slate-600 leading-relaxed font-medium">
                        El sistema valida la continuidad del plan de trabajo actual. Disponibilidad total para el microciclo competitivo.
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-[#1e3a8a] text-[8px] text-white p-3 rounded-lg flex justify-between items-center font-bold tracking-tight shadow-sm">
                    <div className="flex items-center gap-2">
                        <span className="opacity-50 uppercase">Generado por:</span>
                        <span>Elite Performance System - CB Canarias</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="opacity-50 uppercase">Firmado:</span>
                        <span className="italic">Dr. Sergio Mora (Servicios Médicos)</span>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DailyMedicalReport;
