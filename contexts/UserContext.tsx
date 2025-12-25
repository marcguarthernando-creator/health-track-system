import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'player' | 'staff-medico' | 'staff-fisio' | 'staff-prepa' | null;

export interface FlowState {
    formsCompleted: boolean; // Forms 1 & 2
    workoutAssigned: boolean;
    workoutCompleted: boolean;
    postWorkoutFormCompleted: boolean; // Form 4
    showPeriodicForm: boolean; // Form 3
    lastCompletedDate: string | null; // Track date of completion
    isRestDay: boolean; // Staff controlled toggle
    restDayDate: string | null; // Scheduled rest day
    dailyExercises: any[]; // Current day's workout
}

interface UserContextType {
    role: UserRole;
    userEmail: string | null;
    flowState: FlowState;
    login: (email: string) => void;
    logout: () => void;
    updateFlowState: (updates: Partial<FlowState>) => void;
    resetDailyFlow: () => void;
    checkDailyReset: () => void;
    toggleRestDay: () => void;
}

const defaultFlowState: FlowState = {
    formsCompleted: false,
    workoutAssigned: true, // Mock: workout is always assigned for now
    workoutCompleted: false,
    postWorkoutFormCompleted: false,
    showPeriodicForm: false, // Default to false
    lastCompletedDate: null,
    isRestDay: false,
    restDayDate: null,
    dailyExercises: [
        { name: 'Press Banca', sets: '4', reps: '8-10', notes: 'Controlar bajada' },
        { name: 'Sentadilla', sets: '3', reps: '12', notes: 'Profundidad máxima' },
        { name: 'Dominadas', sets: '3', reps: 'Al fallo', notes: 'Pecho a la barra' }
    ],
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [role, setRole] = useState<UserRole>(null);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [flowState, setFlowState] = useState<FlowState>(defaultFlowState);

    const login = (email: string) => {
        let newRole: UserRole = 'player';
        const lowEmail = email.toLowerCase();

        if (lowEmail === 'medico@staff.com') newRole = 'staff-medico';
        else if (lowEmail === 'fisio@staff.com') newRole = 'staff-fisio';
        else if (lowEmail === 'prepa@staff.com') newRole = 'staff-prepa';
        else if (lowEmail === 'jugador@player.com') newRole = 'player';
        else if (lowEmail.includes('staff')) newRole = 'staff-medico'; // Default

        setRole(newRole);
        setUserEmail(email);
        checkDailyReset();
    };

    const logout = () => {
        setRole(null);
        setUserEmail(null);
        // setFlowState(defaultFlowState); // Removed as checkDailyReset handles daily resets
    };

    const updateFlowState = (updates: Partial<FlowState>) => {
        setFlowState(prev => {
            const newState = { ...prev, ...updates };
            // If finishing final step (Form 4 OR Form 1 on Rest Day), mark current date
            if (updates.postWorkoutFormCompleted || (newState.isRestDay && updates.formsCompleted)) {
                newState.lastCompletedDate = new Date().toDateString();
            }
            return newState;
        });
    };

    const resetDailyFlow = () => {
        setFlowState(prev => ({
            ...defaultFlowState,
            isRestDay: prev.isRestDay // Preserve rest day setting until manually changed
        }));
    };

    const checkDailyReset = () => {
        const today = new Date().toDateString();
        setFlowState(prev => {
            if (prev.lastCompletedDate !== today && prev.lastCompletedDate !== null) {
                console.log("New day detected, resetting flow.");
                return {
                    ...defaultFlowState,
                    isRestDay: prev.isRestDay,
                    // Keep periodic form setting or recalculate it here
                };
            }
            return prev;
        });
    };

    const toggleRestDay = () => {
        setFlowState(prev => ({ ...prev, isRestDay: !prev.isRestDay }));
    };

    return (
        <UserContext.Provider value={{ role, userEmail, flowState, login, logout, updateFlowState, resetDailyFlow, checkDailyReset, toggleRestDay }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
