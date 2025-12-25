
export interface Metric {
  label: string;
  value: string | number;
  unit?: string;
  trend?: number;
  trendLabel?: string;
  color: 'primary' | 'warning' | 'danger' | 'info';
  icon: string;
  history: number[];
}

export interface Insight {
  title: string;
  description: string;
  type: 'AI' | 'Coaching' | 'System';
  timestamp: string;
}

export interface WellnessResponse {
  step: number;
  question: string;
  options: {
    id: number;
    label: string;
    description?: string;
  }[];
}
