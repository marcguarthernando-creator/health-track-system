import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import { useLanguage } from '@/contexts/LanguageContext';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const { login } = useUser();
    const { t, language, setLanguage } = useLanguage();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            login(email);
            setIsLoading(false);
            const lowEmail = email.toLowerCase();
            if (lowEmail.includes('staff')) {
                navigate('/staff');
            } else {
                navigate('/player');
            }
        }, 800);
    };

    return (
        <div className="flex h-screen items-center justify-center bg-background-dark text-white p-6 relative overflow-hidden font-display">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>
            <div className="max-w-md w-full bg-surface-dark border border-[#334155] rounded-3xl p-8 shadow-2xl relative z-10">
                <div className="text-center mb-10">
                    <div className="size-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6 border border-white/10 shadow-2xl backdrop-blur-sm">
                        <img
                            src="/logo.png"
                            alt="Logo"
                            className="h-14 w-auto drop-shadow-glow"
                        />
                    </div>
                    <div className="space-y-1">
                        <p className="text-secondary text-xs font-bold tracking-widest uppercase opacity-80">{t('login.welcome')}</p>
                        <h1 className="text-3xl font-black italic tracking-tighter uppercase text-white">
                            {t('login.brand').split(' ')[0]} <span className="text-primary italic">{t('login.brand').split(' ')[1]}</span>
                        </h1>
                    </div>
                </div>

                <div className="flex justify-center gap-4 mb-8">
                    <button
                        onClick={() => setLanguage('es')}
                        className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${language === 'es' ? 'bg-primary text-[#0b1120] border-primary shadow-glow' : 'text-secondary border-[#334155] hover:border-secondary/50'}`}
                    >
                        ESPAÑOL
                    </button>
                    <button
                        onClick={() => setLanguage('en')}
                        className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${language === 'en' ? 'bg-primary text-[#0b1120] border-primary shadow-glow' : 'text-secondary border-[#334155] hover:border-secondary/50'}`}
                    >
                        ENGLISH
                    </button>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-1.5">
                        <label className="block text-[10px] font-black uppercase text-secondary tracking-widest ml-1 opacity-70">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-[#0b1120] border border-[#334155] rounded-xl p-3 text-white text-sm focus:border-primary transition-colors outline-none"
                            placeholder={t('login.email_placeholder')}
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="block text-[10px] font-black uppercase text-secondary tracking-widest ml-1 opacity-70">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-[#0b1120] border border-[#334155] rounded-xl p-3 text-white text-sm focus:border-primary transition-colors outline-none"
                            placeholder="••••••••"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-primary text-[#0b1120] font-black py-3.5 rounded-xl uppercase tracking-widest text-xs hover:brightness-110 shadow-glow transition-all mt-4 disabled:opacity-50"
                    >
                        {isLoading ? '...' : t('login.button')}
                    </button>
                </form>

                <p className="mt-8 text-center text-[10px] font-bold text-secondary uppercase tracking-widest opacity-40">
                    {t('login.subtitle')}
                </p>
            </div>
        </div>
    );
};

export default Login;
