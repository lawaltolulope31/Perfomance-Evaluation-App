import { useState, useMemo } from 'react';
import { 
  ShieldCheck, 
  DownloadCloud, 
  User, 
  Target, 
  Users, 
  FileText, 
  Award, 
  MessageSquare, 
  Printer, 
  TrendingUp,
  Target as TargetIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Role, AppraisalState } from './types';
import { APPRAISAL_CONFIGS } from './constants';

export default function App() {
  const [state, setState] = useState<AppraisalState>({
    employeeName: '',
    designation: '',
    department: '',
    role: 'team',
    kpiRatings: {},
    compRatings: {},
    hrComments: '',
    mdComments: '',
    employeeResponse: '',
    acknowledged: false,
  });

  const config = useMemo(() => APPRAISAL_CONFIGS[state.role], [state.role]);

  const scores = useMemo(() => {
    let kpiTotal = 0;
    let kpiWeightApplied = 0;
    config.kpis.forEach(k => {
      const rating = state.kpiRatings[k.id] || 0;
      kpiTotal += rating * k.weight;
      if (rating > 0) kpiWeightApplied += k.weight;
    });
    const normalizedKPI = kpiWeightApplied > 0 ? (kpiTotal / kpiWeightApplied) : 0;

    let compTotal = 0;
    let compWeightApplied = 0;
    config.competencies.forEach(c => {
      const rating = state.compRatings[c.id] || 0;
      compTotal += rating * c.weight;
      if (rating > 0) compWeightApplied += c.weight;
    });
    const normalizedComp = compWeightApplied > 0 ? (compTotal / compWeightApplied) : 0;

    const finalScore = (normalizedKPI * 0.6) + (normalizedComp * 0.4);

    let grade = '--';
    let color = 'text-dark-text-primary';
    let desc = 'Evaluation incomplete.';
    let circleColor = 'text-dark-surface-light';
    let glowColor = '';

    if (finalScore >= 4.5) {
      grade = 'A+'; color = 'text-purple-400'; desc = 'Visionary performance. Significant impact on company success.'; circleColor = 'text-purple-500'; glowColor = 'shadow-[0_0_20px_rgba(168,85,247,0.4)]';
    } else if (finalScore >= 4.0) {
      grade = 'A'; color = 'text-dark-success'; desc = 'Consistently exceeds targets. High potential for promotion.'; circleColor = 'text-dark-success'; glowColor = 'shadow-[0_0_20px_rgba(34,197,94,0.3)]';
    } else if (finalScore >= 3.0) {
      grade = 'B'; color = 'text-dark-accent'; desc = 'Competent and reliable. Meets all requirements of the role.'; circleColor = 'text-dark-accent'; glowColor = 'shadow-[0_0_20px_rgba(56,189,248,0.3)]';
    } else if (finalScore >= 2.0) {
      grade = 'C'; color = 'text-dark-warning'; desc = 'Improvement required in core areas. Needs mentorship.'; circleColor = 'text-dark-warning'; glowColor = 'shadow-[0_0_20px_rgba(245,158,11,0.3)]';
    } else if (finalScore > 0) {
      grade = 'F'; color = 'text-dark-danger'; desc = 'Urgent performance correction required. Re-assessment needed.'; circleColor = 'text-dark-danger'; glowColor = 'shadow-[0_0_20px_rgba(239,68,68,0.3)]';
    }

    return { normalizedKPI, normalizedComp, finalScore, grade, color, desc, circleColor, glowColor };
  }, [state.kpiRatings, state.compRatings, config]);

  const handleRatingChange = (type: 'kpi' | 'comp', id: string, value: number) => {
    setState(prev => ({
      ...prev,
      [`${type}Ratings`]: { ...prev[`${type}Ratings` as keyof typeof prev] as any, [id]: value }
    }));
  };

  return (
    <div className="min-h-screen bg-dark-bg p-4 md:p-8 text-dark-text-primary font-sans antialiased">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-dark-surface rounded-2xl p-8 mb-8 text-dark-text-primary flex flex-col md:flex-row justify-between items-end border border-dark-surface-light shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <TrendingUp size={160} />
          </div>
          <div className="relative z-10 w-full">
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-dark-surface-light text-dark-accent text-[10px] font-bold px-2 py-1 rounded badge uppercase tracking-widest">Confidential</span>
              <span className="text-dark-text-secondary text-xs font-medium uppercase tracking-widest">2024 Strategic Cycle</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-3 text-dark-accent uppercase">
              Q2 Performance Appraisal
            </h1>
            <p className="text-dark-text-secondary font-semibold uppercase text-xs mt-1 tracking-widest">Master Evaluation Sheet</p>
          </div>
          <div className="relative z-10 mt-6 md:mt-0 flex gap-6 items-center shrink-0">
            <div className="text-right">
              <div className="text-[10px] font-bold text-dark-text-secondary uppercase tracking-widest mb-1">Weighted Score</div>
              <div className="text-2xl font-black text-dark-text-primary">
                {((scores.finalScore / 5) * 100).toFixed(1)}%
              </div>
            </div>
            <div className={`text-6xl font-black transition-all duration-500 ${scores.color} leading-none ml-2`} style={{ textShadow: scores.grade !== '--' ? `0 0 20px currentColor` : 'none' }}>
              {scores.grade}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Identity Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-dark-surface rounded-xl p-6 shadow-sm border border-dark-surface-light"
            >
              <h3 className="text-[10px] font-bold text-dark-text-secondary uppercase mb-4 tracking-widest">Employee Profile</h3>
              <div className="space-y-4">
                <div className="info-row">
                  <label className="text-[10px] font-bold text-dark-text-secondary uppercase tracking-wider mb-1 block">Employee Name</label>
                  <input 
                    type="text" 
                    value={state.employeeName}
                    onChange={e => setState(s => ({ ...s, employeeName: e.target.value }))}
                    className="w-full font-bold text-dark-text-primary bg-transparent border-b border-dark-surface-light py-1 outline-none focus:border-dark-accent transition-colors text-sm" 
                    placeholder="Enter Name..." 
                  />
                </div>
                <div className="info-row">
                  <label className="text-[10px] font-bold text-dark-text-secondary uppercase tracking-wider mb-1 block">Department</label>
                  <input 
                    type="text" 
                    value={state.department}
                    onChange={e => setState(s => ({ ...s, department: e.target.value }))}
                    className="w-full font-semibold text-dark-text-primary bg-transparent border-b border-dark-surface-light py-1 outline-none focus:border-dark-accent text-sm" 
                    placeholder="Enter Department..." 
                  />
                </div>
                <div className="info-row">
                  <label className="text-[10px] font-bold text-dark-text-secondary uppercase tracking-wider mb-1 block">Role Tier</label>
                  <select 
                    value={state.role}
                    onChange={e => setState(s => ({ ...s, role: e.target.value as Role }))}
                    className="w-full mt-1 bg-dark-bg border border-dark-surface-light rounded-lg p-2 font-bold text-dark-accent outline-none focus:ring-1 focus:ring-dark-accent text-sm"
                  >
                    <option value="team">Team Member</option>
                    <option value="hod">Head of Dept. (HOD)</option>
                    <option value="md">Managing Director (MD)</option>
                  </select>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-dark-surface-light flex flex-col items-center">
                <div className="relative flex items-center justify-center mb-4 score-ring border-8 border-dark-surface-light w-32 h-32 rounded-full">
                  <svg className="w-32 h-32 absolute -rotate-90">
                    <motion.circle 
                      cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="transparent" 
                      strokeDasharray="351.8" 
                      animate={{ strokeDashoffset: 351.8 - (351.8 * (scores.finalScore / 5)) }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={`transition-colors duration-500 ${scores.circleColor}`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-black text-dark-text-primary tracking-tighter">{scores.finalScore.toFixed(1)}</span>
                    <span className="text-[8px] font-bold text-dark-text-secondary uppercase">Score</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-[10px] font-bold text-dark-text-secondary uppercase tracking-widest mb-1">Performance Summary</div>
                  <p className="text-[11px] text-dark-text-secondary leading-relaxed italic">{scores.desc}</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Main Content Areas */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Section A: KPIs */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-dark-surface rounded-xl shadow-sm border border-dark-surface-light overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-dark-surface-light bg-dark-surface/50">
                <h2 className="text-[11px] font-bold text-dark-text-secondary uppercase tracking-[0.1em]">
                  Performance Metrics Matrix
                </h2>
              </div>
              <div className="overflow-x-auto table-container">
                <table className="w-full text-left font-sans">
                  <thead className="border-bottom-2 border-dark-surface-light text-[11px] uppercase font-bold text-dark-text-secondary">
                    <tr>
                      <th className="px-6 py-3">Metric Category</th>
                      <th className="px-6 py-3 text-center">Weight</th>
                      <th className="px-6 py-3 text-right">Rating (1-5)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-dark-surface-light text-[13px]">
                    <AnimatePresence mode="wait">
                      {config.kpis.map((k, i) => (
                        <motion.tr 
                          key={k.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="hover:bg-dark-surface-light/30 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div className="font-bold text-dark-text-primary">{k.name}</div>
                            <div className="text-[11px] text-dark-text-secondary uppercase tracking-tighter">{k.description}</div>
                          </td>
                          <td className="text-center font-bold text-dark-accent weight">{k.weight * 100}%</td>
                          <td className="px-6 py-4 text-right">
                            <select 
                              value={state.kpiRatings[k.id] || 0}
                              onChange={e => handleRatingChange('kpi', k.id, parseInt(e.target.value))}
                              className="bg-dark-bg border border-dark-surface-light rounded px-2 py-1 font-bold text-dark-success outline-none transition-all rating"
                            >
                              <option value="0">-</option>
                              <option value="5">5</option>
                              <option value="4">4</option>
                              <option value="3">3</option>
                              <option value="2">2</option>
                              <option value="1">1</option>
                            </select>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Section B: Competencies & Response */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-dark-surface rounded-xl p-6 border border-dark-surface-light">
                    <h2 className="text-[11px] font-bold text-dark-text-secondary uppercase tracking-widest mb-4">Behavioral Competencies</h2>
                    <div className="space-y-5">
                        {config.competencies.map((c, i) => (
                        <div key={c.id} className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label className="text-[11px] font-bold text-dark-text-primary uppercase tracking-wider">{c.name}</label>
                                <span className="text-sm font-black text-dark-accent">{state.compRatings[c.id] || 3}</span>
                            </div>
                            <input 
                                type="range" 
                                min="1" 
                                max="5" 
                                step="1" 
                                value={state.compRatings[c.id] || 3}
                                onChange={e => handleRatingChange('comp', c.id, parseInt(e.target.value))}
                                className="w-full accent-dark-accent h-1 rounded-lg appearance-none cursor-pointer bg-dark-surface-light" 
                            />
                        </div>
                        ))}
                    </div>
                </div>

                <div className="bg-dark-bg p-6 rounded-xl border border-dark-surface-light border-l-4 border-dark-accent flex flex-col">
                    <label className="text-[10px] font-bold text-dark-text-secondary uppercase tracking-widest mb-2">Employee Response Statement</label>
                    <textarea 
                        value={state.employeeResponse}
                        onChange={e => setState(s => ({ ...s, employeeResponse: e.target.value }))}
                        className="w-full grow bg-transparent border-none text-[12px] text-dark-text-primary focus:ring-0 placeholder:text-dark-text-secondary/30 resize-none font-medium italic leading-relaxed" 
                        placeholder="&quot;Enter your response statement here...&quot;" 
                    />
                    <div className="signature border-t border-dashed border-dark-surface-light mt-4 pt-2 text-right">
                        <span className="text-[11px] italic text-dark-text-secondary">E-Signed: {state.employeeName || 'Attendee'} • {new Date().toLocaleDateString('en-GB')}</span>
                    </div>
                </div>
            </div>

            {/* Assessment Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-dark-surface rounded-xl p-6 shadow-sm border border-dark-surface-light flex flex-col comment-box">
                    <h3 className="text-[10px] font-bold text-dark-text-secondary uppercase tracking-widest mb-3 flex items-center gap-2">
                         HR Department Assessment
                    </h3>
                    <textarea 
                        value={state.hrComments}
                        onChange={e => setState(s => ({ ...s, hrComments: e.target.value }))}
                        className="w-full grow bg-dark-bg border border-dark-surface-light rounded-md p-3 text-[12px] text-dark-text-primary focus:ring-1 focus:ring-dark-accent outline-none placeholder:text-dark-text-secondary/20" 
                        placeholder="HR assessment on compliance, training eligibility, and standard increments..." 
                    />
                    <div className="signature border-t border-dashed border-dark-surface-light mt-4 pt-2 text-right">
                        <span className="text-[11px] italic text-dark-text-secondary font-sans uppercase tracking-[0.05em] font-bold">HR Director Signature</span>
                    </div>
                </div>

                <div className="bg-dark-surface rounded-xl p-6 shadow-sm border border-dark-surface-light flex flex-col comment-box">
                    <h3 className="text-[10px] font-bold text-dark-text-secondary uppercase tracking-widest mb-3 flex items-center gap-2">
                        Managing Director Feedback
                    </h3>
                    <textarea 
                        value={state.mdComments}
                        onChange={e => setState(s => ({ ...s, mdComments: e.target.value }))}
                        className="w-full grow bg-dark-bg border border-dark-surface-light rounded-md p-3 text-[12px] text-dark-text-primary focus:ring-1 focus:ring-dark-accent outline-none placeholder:text-dark-text-secondary/20" 
                        placeholder="Executive feedback on strategic impact and leadership vision..." 
                    />
                    <div className="signature border-t border-dashed border-dark-surface-light mt-4 pt-2 text-right">
                        <span className="text-[11px] italic text-dark-text-secondary font-sans uppercase tracking-[0.05em] font-bold">MD Final Selection</span>
                    </div>
                </div>
            </div>

            {/* Action Buttons & Footer Tag */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="info-row bg-dark-surface-light/50 px-4 py-3 rounded-lg border border-dark-surface-light w-full md:w-auto flex items-center gap-4">
                    <span className="text-[10px] font-bold text-dark-text-secondary uppercase tracking-widest">Final Status</span>
                    <span className={`text-sm font-black uppercase tracking-widest ${scores.grade !== '--' && scores.finalScore >= 4.0 ? 'text-dark-success' : 'text-dark-text-primary'}`}>
                        {scores.grade !== '--' && scores.finalScore >= 4.0 ? 'Promotion Eligible' : 'Standard Development'}
                    </span>
                </div>
                <button 
                  onClick={() => window.print()}
                  className="no-print flex items-center gap-2 bg-dark-accent text-dark-bg px-6 py-3 rounded-lg font-black uppercase text-xs tracking-[0.1em] hover:opacity-90 transition-all shadow-lg"
                >
                  <Printer size={16} /> Export Report PDF
                </button>
            </div>
            
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-dark-surface-light flex flex-col md:flex-row justify-between gap-6 text-[10px] text-dark-text-secondary font-bold uppercase tracking-[0.05em]">
            <div className="flex items-center gap-2">
                ORGANIZATION GOVERNANCE ID: <span className="bg-dark-surface-light px-2 py-0.5 rounded text-dark-accent">PA-2024-{Math.floor(1000 + Math.random() * 9000)}</span>
            </div>
            <div>RESTRICTED DISTRIBUTION • CORPORATE CONFIDENTIALITY TIER 1</div>
            <div>GENERATED: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
        </div>

      </div>

      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; color: black !important; padding: 0 !important; }
          .max-w-6xl { max-width: 100% !important; margin: 0 !important; padding: 20px !important; }
          .bg-dark-bg, .bg-dark-surface, .bg-dark-surface-light, .bg-dark-bg, .bg-dark-surface\\/50, .bg-dark-surface-light\\/50 { 
            background-color: white !important;
            -webkit-print-color-adjust: exact; 
            print-color-adjust: exact; 
          }
          .text-dark-text-primary, .text-dark-text-secondary, .text-dark-accent, .text-dark-success, .text-dark-warning, .text-dark-danger { 
            color: black !important; 
          }
          .border-dark-surface-light { border-color: #e5e7eb !important; }
          .shadow-2xl, .shadow-sm, .shadow-lg { box-shadow: none !important; }
          .rounded-2xl, .rounded-xl, .rounded-lg, .rounded-md { border-radius: 4px !important; }
          textarea { border: 1px solid #e5e7eb !important; min-height: 80px !important; }
          .score-ring { border: 4px solid #e5e7eb !important; }
          .lg\\:col-span-4 { display: flex !important; flex-wrap: wrap !important; }
        }
      `}</style>
    </div>
  );
}
