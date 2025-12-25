
import React, { useState } from 'react';
import StaffSidebar from '../../components/StaffSidebar';
import { useUser } from '../../contexts/UserContext';

const WorkoutManager: React.FC = () => {
    const { flowState, updateFlowState } = useUser();
    const [newExercise, setNewExercise] = useState({ name: '', sets: '', reps: '', notes: '' });
    const [scheduledDate, setScheduledDate] = useState(new Date().toISOString().split('T')[0]);

    const addExercise = () => {
        if (!newExercise.name) return;
        updateFlowState({
            dailyExercises: [...flowState.dailyExercises, newExercise]
        });
        setNewExercise({ name: '', sets: '', reps: '', notes: '' });
    };

    const removeExercise = (index: number) => {
        const updated = flowState.dailyExercises.filter((_, i) => i !== index);
        updateFlowState({ dailyExercises: updated });
    };

    return (
        <div className="flex bg-background-dark min-h-screen text-white font-display">
            <StaffSidebar />
            <main className="flex-1 p-8 overflow-y-auto">
                <header className="mb-12 flex justify-between items-end">
                    <div>
                        <h1 className="text-4xl font-black tracking-tight">Gestión de Entrenamientos</h1>
                        <p className="text-secondary text-lg">Configura el trabajo de gimnasio y días de descanso.</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                        <span className="text-[10px] text-secondary uppercase font-bold tracking-widest">Estado para: {scheduledDate}</span>
                        <button
                            onClick={() => updateFlowState({ isRestDay: !flowState.isRestDay })}
                            className={`px-6 py-3 rounded-2xl font-black text-sm uppercase transition-all flex items-center gap-3 ${flowState.isRestDay
                                    ? 'bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.4)]'
                                    : 'bg-surface-dark border border-[#334155] text-secondary hover:text-white'
                                }`}
                        >
                            <span className="material-symbols-outlined">{flowState.isRestDay ? 'event_busy' : 'event_available'}</span>
                            {flowState.isRestDay ? 'Día de Descanso ACTIVO' : 'Programar Descanso'}
                        </button>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Exercise Editor */}
                    <div className="lg:col-span-2 space-y-6">
                        <section className="bg-surface-dark p-8 rounded-[2.5rem] border border-[#334155]">
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary">fitness_center</span>
                                Rutina de Gimnasio del Día
                            </h3>

                            <div className="space-y-4 mb-8">
                                {flowState.dailyExercises.map((ex, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-4 bg-[#0b1120] rounded-2xl border border-[#334155] group">
                                        <div className="flex-1">
                                            <div className="font-bold text-white uppercase text-sm tracking-tight">{ex.name}</div>
                                            <div className="text-xs text-secondary">{ex.sets} series x {ex.reps} reps — {ex.notes}</div>
                                        </div>
                                        <button onClick={() => removeExercise(idx)} className="opacity-0 group-hover:opacity-100 p-2 text-red-400 hover:bg-red-500/10 rounded-full transition-all">
                                            <span className="material-symbols-outlined text-sm">delete</span>
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-[#0b1120]/50 p-6 rounded-3xl border border-dashed border-[#334155]">
                                <input
                                    placeholder="Ejercicio"
                                    className="bg-background-dark border border-[#334155] rounded-xl p-3 text-sm"
                                    value={newExercise.name}
                                    onChange={e => setNewExercise({ ...newExercise, name: e.target.value })}
                                />
                                <input
                                    placeholder="Series"
                                    className="bg-background-dark border border-[#334155] rounded-xl p-3 text-sm"
                                    value={newExercise.sets}
                                    onChange={e => setNewExercise({ ...newExercise, sets: e.target.value })}
                                />
                                <input
                                    placeholder="Reps"
                                    className="bg-background-dark border border-[#334155] rounded-xl p-3 text-sm"
                                    value={newExercise.reps}
                                    onChange={e => setNewExercise({ ...newExercise, reps: e.target.value })}
                                />
                                <button
                                    onClick={addExercise}
                                    className="bg-primary text-[#0b1120] font-bold rounded-xl hover:shadow-glow transition-all px-4"
                                >
                                    Añadir
                                </button>
                            </div>
                        </section>
                    </div>

                    {/* Scheduling & Info */}
                    <div className="space-y-6">
                        <section className="bg-surface-dark p-8 rounded-[2.5rem] border border-[#334155]">
                            <h3 className="text-xl font-bold mb-6">Programar Fecha</h3>
                            <input
                                type="date"
                                className="w-full bg-[#0b1120] border border-[#334155] rounded-xl p-4 text-white mb-4 focus:border-primary outline-none"
                                value={scheduledDate}
                                onChange={e => setScheduledDate(e.target.value)}
                            />
                            <p className="text-xs text-secondary leading-relaxed">
                                Selecciona una fecha para aplicar los cambios. Por defecto, los cambios afectan al flujo del día de entrenamiento actual.
                            </p>
                        </section>

                        <div className="p-6 rounded-3xl bg-primary/5 border border-primary/10">
                            <div className="flex items-center gap-3 text-primary mb-3">
                                <span className="material-symbols-outlined">info</span>
                                <span className="font-bold text-xs uppercase">Recordatorio</span>
                            </div>
                            <p className="text-xs text-secondary leading-relaxed">
                                Marcar como **Rest Day** desactivará automáticamente el Formulario de Readiness y el Formulario de RPE para los jugadores, enfocando su flujo solo en salud y sueño.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default WorkoutManager;
