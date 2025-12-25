
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'es' | 'en';

interface Translations {
    [key: string]: {
        es: string;
        en: string;
    };
}

export const translations: Translations = {
    'login.welcome': { es: 'BIENVENIDO A', en: 'WELCOME TO' },
    'login.brand': { es: 'HEALTH TRACK', en: 'HEALTH TRACK' },
    'login.email_placeholder': { es: 'tu@email.com', en: 'your@email.com' },
    'login.button': { es: 'ENTRAR AL SISTEMA', en: 'ENTER SYSTEM' },
    'login.subtitle': { es: 'CB CANARIAS PERFORMANCE SYSTEM', en: 'CB CANARIAS PERFORMANCE SYSTEM' },
    'login.language': { es: 'Idioma', en: 'Language' },
    'menu.dashboard': { es: 'Estado Equipo', en: 'Team Status' },
    'menu.questionnaires': { es: 'Cuestionarios', en: 'Questionnaires' },
    'menu.gym': { es: 'Gestión Gym', en: 'Gym Management' },
    'menu.active_injuries': { es: 'Lesiones Activas', en: 'Active Injuries' },
    'menu.stats': { es: 'Estadísticas', en: 'Statistics' },
    'menu.medical_report': { es: 'Parte Médico', en: 'Medical Report' },
    'menu.logout': { es: 'Cerrar Sesión', en: 'Logout' },
    'staff.title': { es: 'PANEL DE CONTROL STAFF', en: 'STAFF DASHBOARD' },
    'staff.risk': { es: 'RIESGO', en: 'RISK' },
    'staff.load': { es: 'CARGA', en: 'LOAD' },
    'staff.sleep': { es: 'SUEÑO', en: 'SLEEP' },
    'staff.actions': { es: 'ACCIONES', en: 'ACTIONS' },
    'player.welcome': { es: 'HOLA,', en: 'HELLO,' },
    'player.done_title': { es: '¡Todo listo por hoy!', en: 'All Done For Today!' },
    'player.done_rest': { es: 'Disfruta tu día de descanso. ¡La recuperación es clave!', en: 'Enjoy your rest day. Recovery is key!' },
    'player.done_train': { es: 'Buen trabajo. Tus datos se han sincronizado con el staff.', en: 'Great job. Your data has been synced with the staff.' },
    'player.back_home': { es: 'Volver al Inicio', en: 'Back to Home' },
    'gym.title': { es: 'TRABAJO DE GIMNASIO', en: 'DAILY GYM WORK' },
    'gym.finish': { es: 'FINALIZAR SESIÓN', en: 'FINISH WORKOUT' },
    'gym.target': { es: 'Objetivo', en: 'Target' },
};

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>('es');

    const t = (key: string) => {
        return translations[key] ? translations[key][language] : key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
