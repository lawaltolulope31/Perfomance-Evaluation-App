export type Role = 'team' | 'hod' | 'md';

export interface Criterion {
  id: string;
  name: string;
  description: string;
  weight: number;
}

export interface AppraisalConfig {
  kpis: Criterion[];
  competencies: Criterion[];
}

export interface AppraisalState {
  employeeName: string;
  designation: string;
  department: string;
  role: Role;
  kpiRatings: Record<string, number>;
  compRatings: Record<string, number>;
  hrComments: string;
  mdComments: string;
  employeeResponse: string;
  acknowledged: boolean;
}
