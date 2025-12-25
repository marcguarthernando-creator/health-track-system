
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Workload from './pages/Workload';
import Recovery from './pages/Recovery';
import DailyLog from './pages/DailyLog';
import AICoach from './pages/AICoach';

import { UserProvider } from './contexts/UserContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Login from './pages/Login';
import PlayerDashboard from './pages/PlayerDashboard';
import StaffDashboard from './pages/StaffDashboard';
import PlayerProfile from './pages/staff/PlayerProfile';
import StaffStats from './pages/staff/StaffStats';
import ActiveInjuries from './pages/staff/ActiveInjuries';
import Questionnaires from './pages/staff/Questionnaires';
import WorkoutManager from './pages/staff/WorkoutManager';
import DailyMedicalReport from './pages/staff/DailyMedicalReport';
import MedicalInjuryForm from './pages/staff/MedicalInjuryForm';

const App: React.FC = () => {
  return (
    <UserProvider>
      <LanguageProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/player" element={<PlayerDashboard />} />

            {/* Staff Routes */}
            <Route path="/staff" element={<StaffDashboard />} />
            <Route path="/staff/player/:id" element={<PlayerProfile />} />
            <Route path="/staff/stats" element={<StaffStats />} />
            <Route path="/staff/active-injuries" element={<ActiveInjuries />} />
            <Route path="/staff/questionnaires" element={<Questionnaires />} />
            <Route path="/staff/workouts" element={<WorkoutManager />} />
            <Route path="/staff/report/:id" element={<DailyMedicalReport />} />
            <Route path="/staff/medical-form" element={<MedicalInjuryForm />} />
            <Route path="/staff/dashboard" element={<Dashboard />} /> {/* Old Dashboard renamed */}
            <Route path="/staff/workload" element={<Workload />} />
            <Route path="/staff/recovery" element={<Recovery />} />
            <Route path="/staff/log" element={<DailyLog />} />
            <Route path="/staff/chat" element={<AICoach />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </HashRouter>
      </LanguageProvider>
    </UserProvider>
  );
};

export default App;
