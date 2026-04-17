import { AppraisalConfig } from './types';

export const APPRAISAL_CONFIGS: Record<string, AppraisalConfig> = {
  team: {
    kpis: [
      { id: 'task-execution', name: 'Core Task Execution', description: 'Speed, accuracy, and deadline management', weight: 0.4 },
      { id: 'tech-comp', name: 'Technical Competence', description: 'Proficiency in departmental tools and logic', weight: 0.3 },
      { id: 'synergy', name: 'Interpersonal Synergy', description: 'Contribution to team morale and helpfulness', weight: 0.15 },
      { id: 'reliability', name: 'Operational Reliability', description: 'Attendance and policy adherence', weight: 0.15 },
    ],
    competencies: [
      { id: 'collab', name: 'Collaboration', description: 'Supporting team goals and communication', weight: 0.5 },
      { id: 'innov', name: 'Innovation', description: 'Suggesting process improvements in Q2', weight: 0.5 },
    ],
  },
  hod: {
    kpis: [
      { id: 'dept-perf', name: 'Departmental Performance', description: 'Achieving core department KPIs', weight: 0.4 },
      { id: 'personnel-dev', name: 'Personnel Development', description: 'Coaching, mentoring, and staff retention', weight: 0.3 },
      { id: 'resource-opt', name: 'Resource Optimization', description: 'Budgeting and waste reduction', weight: 0.2 },
      { id: 'cross-sync', name: 'Cross-Functional Synergy', description: 'Liaising with other departments', weight: 0.1 },
    ],
    competencies: [
      { id: 'leadership', name: 'Leadership', description: 'Inspiring and guiding team members', weight: 0.5 },
      { id: 'strategic-thinking', name: 'Strategic Thinking', description: 'Long-term planning and problem solving', weight: 0.5 },
    ],
  },
  md: {
    kpis: [
      { id: 'corp-health', name: 'Corporate Financial Health', description: 'Revenue growth and EBITDA targets', weight: 0.4 },
      { id: 'market-pos', name: 'Strategic Market Position', description: 'Vision and long-term brand equity', weight: 0.2 },
      { id: 'gov-risk', name: 'Governance & Risk', description: 'Compliance and shareholder relations', weight: 0.2 },
      { id: 'culture-lead', name: 'Culture Leadership', description: 'Internal organizational health and brand', weight: 0.2 },
    ],
    competencies: [
      { id: 'visionary', name: 'Visionary Leadership', description: 'Setting corporate direction', weight: 0.5 },
      { id: 'stakeholder', name: 'Stakeholder Management', description: 'Relations with board and investors', weight: 0.5 },
    ],
  },
};
