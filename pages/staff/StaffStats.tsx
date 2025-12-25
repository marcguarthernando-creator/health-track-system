
import React from 'react';
import StaffSidebar from '../../components/StaffSidebar';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';

const StaffStats: React.FC = () => {
    const bodyPartData = [
        { name: 'Rodilla', value: 45 },
        { name: 'Tobillo', value: 25 },
        { name: 'Isquios', value: 20 },
        { name: 'Hombro', value: 10 },
    ];

    const timelineData = [
        { month: 'Sep', injuries: 2 },
        { month: 'Oct', injuries: 4 },
        { month: 'Nov', injuries: 3 },
        { month: 'Dic', injuries: 6 },
    ];

    const COLORS = ['#00d4ff', '#334155', '#1e293b', '#64748b'];

    return (
        <div className="flex bg-background-dark min-h-screen text-white font-display">
            <StaffSidebar />
            <main className="flex-1 p-8 overflow-y-auto">
                <header className="mb-12">
                    <h1 className="text-4xl font-black tracking-tight">Estadísticas del Equipo</h1>
                    <p className="text-secondary text-lg">Análisis de lesiones y disponibilidad.</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <section className="bg-surface-dark p-8 rounded-3xl border border-[#334155]">
                        <h3 className="text-xl font-bold mb-6">Mapa de Calor (Parte del cuerpo)</h3>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={bodyPartData} layout="vertical">
                                    <XAxis type="number" hide />
                                    <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={12} />
                                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }} />
                                    <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                                        {bodyPartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={index === 0 ? '#00d4ff' : '#334155'} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </section>

                    <section className="bg-surface-dark p-8 rounded-3xl border border-[#334155]">
                        <h3 className="text-xl font-bold mb-6">Evolución de Lesiones (Temporada)</h3>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={timelineData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                    <XAxis dataKey="month" stroke="#94a3b8" />
                                    <YAxis stroke="#94a3b8" />
                                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }} />
                                    <Bar dataKey="injuries" fill="#00d4ff" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </section>

                    <section className="bg-surface-dark p-8 rounded-3xl border border-[#334155] md:col-span-2">
                        <h3 className="text-xl font-bold mb-4">Conclusiones IA</h3>
                        <p className="text-secondary leading-relaxed">
                            Se observa un repunte de lesiones traumáticas en el último mes coincidiendo con el aumento de minutos jugados.
                            El 60% de las lesiones actuales son de carácter muscular en el tren inferior.
                        </p>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default StaffStats;
