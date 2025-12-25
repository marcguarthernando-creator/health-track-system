
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Login from './pages/Login';
import PlayerDashboard from './pages/PlayerDashboard';
import StaffDashboard from './pages/StaffDashboard';
import MedicalInjuryForm from './pages/staff/MedicalInjuryForm';

const App: React.FC = () => {
    return (
        <UserProvider>
            <LanguageProvider>
                <HashRouter>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/player" element={<PlayerDashboard />} />
                        <Route path="/staff" element={<StaffDashboard />} />
                        <Route path="/staff/medical-form" element={<MedicalInjuryForm />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </HashRouter>
            </LanguageProvider>
        </UserProvider>
    );
};

export default App;
