import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, userEmail } = useUser();

  const navItems = [
    { label: 'Dashboard', icon: 'dashboard', path: '/' },
    { label: 'Training', icon: 'fitness_center', path: '/workload' },
    { label: 'Recovery', icon: 'hotel', path: '/recovery' },
    { label: 'AI Coach', icon: 'psychology', path: '/chat' },
    { label: 'Nutrition', icon: 'restaurant', path: '/nutrition' },
    { label: 'Analytics', icon: 'analytics', path: '/analytics' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="hidden lg:flex flex-col w-72 h-full border-r border-[#1e293b] bg-[#0b1120] p-6 justify-between flex-shrink-0 z-20">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col items-center gap-4 px-2 mb-2">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Health Track Logo" className="h-10 w-auto" />
            <img src="/assets/photos/escudo-cbc.png" alt="Club Logo" className="h-12 w-auto" />
          </div>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#1e293b] to-transparent"></div>
        </div>
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-4 px-4 py-3 rounded-full transition-all ${isActive(item.path)
                ? 'bg-primary text-[#0b1120] font-semibold shadow-glow'
                : 'text-secondary hover:bg-[#1e293b] hover:text-white'
                }`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#1e293b] border border-[#334155]">
          <div className="size-10 bg-center bg-cover rounded-full border border-primary/30 ring-2 ring-primary/10" style={{ backgroundImage: 'url("https://picsum.photos/seed/player/100/100")' }}></div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-bold text-white truncate">{userEmail?.split('@')[0] || 'Atleta'}</span>
            <span className="text-[10px] text-primary font-bold uppercase tracking-widest">Atleta Élite</span>
          </div>
        </div>

        <button
          onClick={() => {
            logout();
            navigate('/');
          }}
          className="flex items-center gap-4 px-6 py-4 text-secondary hover:text-red-400 font-bold uppercase text-xs tracking-widest transition-all w-full group"
        >
          <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform">logout</span>
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
