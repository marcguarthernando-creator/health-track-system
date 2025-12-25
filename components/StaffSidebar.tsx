
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import { useLanguage } from '@/contexts/LanguageContext';

const StaffSidebar: React.FC = () => {
    const { logout, role } = useUser();
    const { t } = useLanguage();
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { label: t('menu.dashboard'), icon: 'grid_view', path: '/staff' },
        { label: t('menu.questionnaires'), icon: 'description', path: '/staff/questionnaires' },
        { label: t('menu.gym'), icon: 'fitness_center', path: '/staff/workouts', roles: ['staff-prepa'] },
        { label: t('menu.active_injuries'), icon: 'medical_services', path: '/staff/active-injuries' },
        { label: t('menu.stats'), icon: 'monitoring', path: '/staff/stats' },
        { label: t('menu.medical_report'), icon: 'assignment_add', path: '/staff/medical-form', roles: ['staff-medico'] },
    ];

    const filteredItems = menuItems.filter(item => !item.roles || item.roles.includes(role as string));

    return (
        <aside className="w-64 bg-[#0b1120] border-r border-[#334155] h-screen flex flex-col p-6 sticky top-0">
            <div className="flex items-center gap-3 mb-12">
                <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
                <span className="font-black italic tracking-tighter text-xl">HEALTH <span className="text-primary italic">TRACK</span></span>
            </div>

            <nav className="flex-1 space-y-2">
                {filteredItems.map((item) => (
                    <button
                        key={item.path}
                        onClick={() => navigate(item.path)}
                        className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${location.pathname === item.path
                                ? 'bg-primary/10 text-primary border border-primary/20 shadow-glow'
                                : 'text-secondary hover:bg-white/5 hover:text-white border border-transparent'
                            }`}
                    >
                        <span className="material-symbols-outlined">{item.icon}</span>
                        <span className="font-bold text-sm tracking-tight">{item.label}</span>
                    </button>
                ))}
            </nav>

            <button
                onClick={() => {
                    logout();
                    navigate('/');
                }}
                className="mt-auto flex items-center gap-4 px-4 py-3 rounded-xl text-secondary hover:bg-danger/10 hover:text-danger transition-all group"
            >
                <span className="material-symbols-outlined">logout</span>
                <span className="font-bold text-sm">{t('menu.logout')}</span>
            </button>
        </aside>
    );
};

export default StaffSidebar;
