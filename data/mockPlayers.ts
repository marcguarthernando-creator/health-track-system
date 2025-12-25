
export interface PlayerData {
    id: string;
    name: string;
    position: string;
    age: number;
    height: number;
    weight: number;
    image: string;
    riskStatus: 'Optimal' | 'Caution' | 'Critical';
    riskScore: number;
    load: number;
    sleep: number;
    alertMessage?: string;
    integratedMetrics?: {
        hrv: number;
        rhr: number;
        aal: number;
        minutes: number;
        wbq: number;
        fatigue: number;
        soreness: number;
    };
}

export const mockPlayers: PlayerData[] = [
    {
        id: '1',
        name: 'BABEL LIPASI',
        position: 'ALERO',
        age: 21,
        height: 198,
        weight: 92,
        image: '/assets/photos/BABEL_LIPASI.PNG',
        riskStatus: 'Optimal',
        riskScore: 12,
        load: 450,
        sleep: 88,
        integratedMetrics: { hrv: 65, rhr: 48, aal: 1200, minutes: 28, wbq: 4, fatigue: 2, soreness: 1 }
    },
    {
        id: '2',
        name: 'DANIEL RODRIGUEZ',
        position: 'BASE',
        age: 24,
        height: 185,
        weight: 80,
        image: '/assets/photos/DANIEL_RODRIGUEZ.PNG',
        riskStatus: 'Caution',
        riskScore: 45,
        load: 620,
        sleep: 72,
        integratedMetrics: { hrv: 58, rhr: 52, aal: 1450, minutes: 32, wbq: 3, fatigue: 4, soreness: 3 }
    },
    {
        id: '3',
        name: 'MARC GUART',
        position: 'ESCOLTA',
        age: 27,
        height: 192,
        weight: 88,
        image: 'https://picsum.photos/seed/marc/200/200',
        riskStatus: 'Critical',
        riskScore: 78,
        load: 850,
        sleep: 65,
        integratedMetrics: { hrv: 45, rhr: 58, aal: 1800, minutes: 35, wbq: 2, fatigue: 5, soreness: 5 }
    }
];
