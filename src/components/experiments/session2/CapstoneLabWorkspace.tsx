import React, { useState, useEffect } from 'react';
import { Clock, Play, Pause, RotateCcw, Target, Layers, Brain, CheckCircle2, Award, FileText, Users, ArrowRight } from 'lucide-react';
import { UM6PLogo } from '../../brand/UM6PLogo';

export const CapstoneLabWorkspace: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tracks' | 'audit' | 'lockin' | 'rubric'>('tracks');
  const [selectedTrack, setSelectedTrack] = useState<'A' | 'B' | 'C' | 'D'>('A');

  // 15-min phase timer
  const [timerSec, setTimerSec] = useState<number>(900); // 15 mins = 900s
  const [timerRunning, setTimerRunning] = useState<boolean>(false);

  // Audit state
  const [fittsD, setFittsD] = useState<number>(450);
  const [fittsW, setFittsW] = useState<number>(24);
  const [gestaltLaw, setGestaltLaw] = useState<string>('Proximity failure: Submit button is closer to cancel button than form inputs');
  const [cognitiveLoadIssue, setCognitiveLoadIssue] = useState<string>('Forced recall: User must memorize sensor hex ID from tab 1 to input into tab 2');

  // Lock-in Form
  const [teamName, setTeamName] = useState<string>('');
  const [teamMembers, setTeamMembers] = useState<string>('');
  const [userProfile, setUserProfile] = useState<string>('');
  const [criticalTask, setCriticalTask] = useState<string>('');
  const [baselineTool, setBaselineTool] = useState<string>('');
  const [isLockedIn, setIsLockedIn] = useState<boolean>(false);

  useEffect(() => {
    let interval: any = null;
    if (timerRunning && timerSec > 0) {
      interval = setInterval(() => {
        setTimerSec(prev => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerSec]);

  const minutes = Math.floor(timerSec / 60);
  const seconds = timerSec % 60;
  const computedID = Number(Math.log2((2 * fittsD) / fittsW).toFixed(2));

  return (
    <div className="h-full flex flex-col p-6 sm:p-8 bg-[#FAF9F6] text-[#2D2D2E] overflow-y-auto">
      {/* Header with Lab Timer */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#E8E2D9]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold text-[#059669] bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 uppercase tracking-wider">
              45-Minute In-Class Practical Lab
            </span>
            <span className="text-xs font-mono text-stone-500 font-semibold">
              Capstone Project Launch & Milestone 1 Brief
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-serif-display text-[#2D2D2E]">
            Capstone Studio & Cognitive Forensic Workspace
          </h2>
        </div>

        {/* Lab Timer Widget */}
        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-stone-200 shadow-xs">
          <Clock className="w-5 h-5 text-[#E5391C]" />
          <div className="font-mono text-sm font-bold text-stone-800">
            Phase Timer: <span className="text-[#E5391C] text-base">{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</span>
          </div>
          <button
            onClick={() => setTimerRunning(!timerRunning)}
            className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 cursor-pointer transition-colors"
          >
            {timerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <button
            onClick={() => { setTimerRunning(false); setTimerSec(900); }}
            className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 cursor-pointer transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Lab Navigation Tabs */}
      <div className="flex items-center gap-2 mt-4 border-b border-stone-200 pb-2">
        <button
          onClick={() => setActiveTab('tracks')}
          className={`px-3.5 py-1.5 text-xs font-mono font-bold rounded-lg transition-all cursor-pointer ${
            activeTab === 'tracks' ? 'bg-[#E5391C] text-white shadow-xs' : 'bg-white text-stone-600 hover:bg-stone-100'
          }`}
        >
          1. Capstone Tracks Menu
        </button>
        <button
          onClick={() => setActiveTab('audit')}
          className={`px-3.5 py-1.5 text-xs font-mono font-bold rounded-lg transition-all cursor-pointer ${
            activeTab === 'audit' ? 'bg-[#E5391C] text-white shadow-xs' : 'bg-white text-stone-600 hover:bg-stone-100'
          }`}
        >
          2. 3-Point Forensic Audit Tool
        </button>
        <button
          onClick={() => setActiveTab('lockin')}
          className={`px-3.5 py-1.5 text-xs font-mono font-bold rounded-lg transition-all cursor-pointer ${
            activeTab === 'lockin' ? 'bg-[#E5391C] text-white shadow-xs' : 'bg-white text-stone-600 hover:bg-stone-100'
          }`}
        >
          3. Team Project Lock-In
        </button>
        <button
          onClick={() => setActiveTab('rubric')}
          className={`px-3.5 py-1.5 text-xs font-mono font-bold rounded-lg transition-all cursor-pointer ${
            activeTab === 'rubric' ? 'bg-[#E5391C] text-white shadow-xs' : 'bg-white text-stone-600 hover:bg-stone-100'
          }`}
        >
          4. Homework Rubric (20 Pts)
        </button>
      </div>

      {/* Main Tab Panels */}
      <div className="mt-4 flex-1">
        {/* TAB 1: TRACKS MENU */}
        {activeTab === 'tracks' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Track A */}
            <div
              onClick={() => setSelectedTrack('A')}
              className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                selectedTrack === 'A'
                  ? 'bg-white border-2 border-emerald-600 shadow-md ring-2 ring-emerald-500/20'
                  : 'bg-white border-stone-200 hover:border-stone-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  TRACK A · AGRI-TECH & SENSORS
                </span>
                <span className="text-xs font-mono text-stone-500">UM6P Regional Context</span>
              </div>
              <h3 className="text-base font-bold text-stone-900 font-serif-display">
                Precision Irrigation & Soil Telemetry Dashboard
              </h3>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                Design a high-contrast field tool for farm operators in Rehamna. The user operates under direct Moroccan sunlight with dirty hands or gloves, monitoring soil matric potential, bore wells, and pump relays.
              </p>
              <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] font-mono text-stone-500">
                <span>Core Challenge: Fitts’s Law & Glare</span>
                <span className="text-emerald-700 font-bold">Select Track →</span>
              </div>
            </div>

            {/* Track B */}
            <div
              onClick={() => setSelectedTrack('B')}
              className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                selectedTrack === 'B'
                  ? 'bg-white border-2 border-rose-600 shadow-md ring-2 ring-rose-500/20'
                  : 'bg-white border-stone-200 hover:border-stone-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-rose-800 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                  TRACK B · CRITICAL HEALTH
                </span>
                <span className="text-xs font-mono text-stone-500">Life-Critical Systems</span>
              </div>
              <h3 className="text-base font-bold text-stone-900 font-serif-display">
                Intensive Care Multi-Infusion & Telemetry Console
              </h3>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                Nurses and clinicians under extreme stress administering 4 simultaneous intravenous medications. Eliminates decimal suppression errors, mode confusions, and auditory alarm fatigue.
              </p>
              <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] font-mono text-stone-500">
                <span>Core Challenge: Zero Error Tolerance</span>
                <span className="text-rose-700 font-bold">Select Track →</span>
              </div>
            </div>

            {/* Track C */}
            <div
              onClick={() => setSelectedTrack('C')}
              className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                selectedTrack === 'C'
                  ? 'bg-white border-2 border-blue-600 shadow-md ring-2 ring-blue-500/20'
                  : 'bg-white border-stone-200 hover:border-stone-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  TRACK C · CIVIC TECH & PUBLIC SERVICES
                </span>
                <span className="text-xs font-mono text-stone-500">National Impact</span>
              </div>
              <h3 className="text-base font-bold text-stone-900 font-serif-display">
                Universal Health Insurance Reimbursement Portal (CNSS / AMO)
              </h3>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                Filing medical reimbursement claims for diverse citizens across varying literacy levels, multi-language needs (Arabic/French), and low-bandwidth rural mobile devices.
              </p>
              <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] font-mono text-stone-500">
                <span>Core Challenge: Cognitive Accessibility</span>
                <span className="text-blue-700 font-bold">Select Track →</span>
              </div>
            </div>

            {/* Track D */}
            <div
              onClick={() => setSelectedTrack('D')}
              className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                selectedTrack === 'D'
                  ? 'bg-white border-2 border-amber-600 shadow-md ring-2 ring-amber-500/20'
                  : 'bg-white border-stone-200 hover:border-stone-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  TRACK D · DEVELOPER INFRASTRUCTURE
                </span>
                <span className="text-xs font-mono text-stone-500">Observability & Cloud</span>
              </div>
              <h3 className="text-base font-bold text-stone-900 font-serif-display">
                Distributed Microservices Topology & Incident War-Room
              </h3>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                DevOps engineers diagnosing cascading database failures in real time across 120 Kubernetes pods. Replaces 40 raw Grafana charts with an intuitive mental model topology.
              </p>
              <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] font-mono text-stone-500">
                <span>Core Challenge: Dense Information Architecture</span>
                <span className="text-amber-700 font-bold">Select Track →</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: AUDIT TOOL */}
        {activeTab === 'audit' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Point 1: Fitts's Law */}
            <div className="p-5 bg-white rounded-2xl border border-stone-200 space-y-3 shadow-xs">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-[#E5391C]" />
                <h3 className="text-sm font-bold text-stone-900 font-serif-display">1. Fitts’s Law Bottleneck</h3>
              </div>
              <p className="text-xs text-stone-500">Measure distance D and width W of primary critical action in existing tool:</p>

              <div className="space-y-2 font-mono text-xs">
                <div>
                  <label className="text-stone-600 block">Distance D: <strong>{fittsD} px</strong></label>
                  <input
                    type="range"
                    min="100"
                    max="800"
                    value={fittsD}
                    onChange={e => setFittsD(Number(e.target.value))}
                    className="w-full accent-[#E5391C]"
                  />
                </div>
                <div>
                  <label className="text-stone-600 block">Target Width W: <strong>{fittsW} px</strong></label>
                  <input
                    type="range"
                    min="12"
                    max="80"
                    value={fittsW}
                    onChange={e => setFittsW(Number(e.target.value))}
                    className="w-full accent-[#E5391C]"
                  />
                </div>
              </div>

              <div className="p-3 bg-[#FDF5F2] rounded-xl border border-[#FAD6CF] font-mono text-xs">
                <span className="text-stone-500 block">Computed Index of Difficulty:</span>
                <span className="text-base font-bold text-[#E5391C]">{computedID} bits</span>
                <p className="text-[11px] text-stone-600 mt-1">
                  {computedID > 5.5 ? '⚠️ Severe motor penalty (>5.5 bits). Target is too small or far away.' : '✓ Acceptable motor difficulty (<5.5 bits).'}
                </p>
              </div>
            </div>

            {/* Point 2: Gestalt Failure */}
            <div className="p-5 bg-white rounded-2xl border border-stone-200 space-y-3 shadow-xs">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-blue-600" />
                <h3 className="text-sm font-bold text-stone-900 font-serif-display">2. Gestalt Grouping Flaw</h3>
              </div>
              <p className="text-xs text-stone-500">Document where Proximity, Similarity, or Common Region is violated:</p>

              <textarea
                value={gestaltLaw}
                onChange={e => setGestaltLaw(e.target.value)}
                rows={4}
                className="w-full p-2.5 bg-stone-50 rounded-xl border border-stone-200 text-xs font-mono text-stone-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />

              <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-200 text-xs font-mono text-blue-900">
                <strong>Forensic Question:</strong> Does the eye group unrelated buttons together because of uniform spacing or matching colors?
              </div>
            </div>

            {/* Point 3: Extraneous Load */}
            <div className="p-5 bg-white rounded-2xl border border-stone-200 space-y-3 shadow-xs">
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-600" />
                <h3 className="text-sm font-bold text-stone-900 font-serif-display">3. Extraneous Memory Load</h3>
              </div>
              <p className="text-xs text-stone-500">Identify where user is forced into recall over recognition or unchunked data:</p>

              <textarea
                value={cognitiveLoadIssue}
                onChange={e => setCognitiveLoadIssue(e.target.value)}
                rows={4}
                className="w-full p-2.5 bg-stone-50 rounded-xl border border-stone-200 text-xs font-mono text-stone-800 focus:outline-none focus:ring-1 focus:ring-purple-500"
              />

              <div className="p-3 bg-purple-50/70 rounded-xl border border-purple-200 text-xs font-mono text-purple-900">
                <strong>Forensic Question:</strong> Must the user remember a code, status, or date across separate screens?
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: TEAM LOCK-IN */}
        {activeTab === 'lockin' && (
          <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div>
                <h3 className="text-base font-bold text-stone-900 font-serif-display">Capstone Commitment Canvas</h3>
                <p className="text-xs text-stone-500">Lock in your semester team and project scope before end of class.</p>
              </div>
              {isLockedIn && (
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Locked In!
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono uppercase font-bold text-stone-600 block mb-1">Team Name:</label>
                <input
                  type="text"
                  placeholder="e.g. Agronomics HCI Lab"
                  value={teamName}
                  onChange={e => setTeamName(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs font-mono"
                />
              </div>
              <div>
                <label className="text-xs font-mono uppercase font-bold text-stone-600 block mb-1">Team Members (2–3):</label>
                <input
                  type="text"
                  placeholder="e.g. Yassine, Amina, Omar"
                  value={teamMembers}
                  onChange={e => setTeamMembers(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs font-mono"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-mono uppercase font-bold text-stone-600 block mb-1">Specific User Persona & Sensory Context:</label>
              <input
                type="text"
                placeholder="e.g. Rehamna olive farm technician with gloves under 40°C sunlight"
                value={userProfile}
                onChange={e => setUserProfile(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs font-mono"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono uppercase font-bold text-stone-600 block mb-1">Single Primary Critical Task:</label>
                <input
                  type="text"
                  placeholder="e.g. Shut down failing pump in <5 seconds"
                  value={criticalTask}
                  onChange={e => setCriticalTask(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs font-mono"
                />
              </div>
              <div>
                <label className="text-xs font-mono uppercase font-bold text-stone-600 block mb-1">Baseline Tool to Audit & Redesign:</label>
                <input
                  type="text"
                  placeholder="e.g. Legacy SCADA Modbus Terminal v2"
                  value={baselineTool}
                  onChange={e => setBaselineTool(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs font-mono"
                />
              </div>
            </div>

            <button
              onClick={() => setIsLockedIn(true)}
              className="w-full py-2.5 bg-[#E5391C] hover:bg-[#C92F15] text-white font-mono font-bold text-xs rounded-xl shadow-sm transition-all cursor-pointer"
            >
              Commit Capstone Project Selection
            </button>
          </div>
        )}

        {/* TAB 4: RUBRIC */}
        {activeTab === 'rubric' && (
          <div className="p-6 bg-white rounded-2xl border border-stone-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div>
                <h3 className="text-base font-bold text-stone-900 font-serif-display">
                  Homework Milestone 1: Objective Grading Rubric (20 Points)
                </h3>
                <p className="text-xs text-stone-500">Deliverable: 4-Page PDF or Figma Report due in 1 week (before Session 3).</p>
              </div>
              <span className="text-xs font-mono font-bold bg-amber-50 text-amber-800 px-3 py-1 rounded-lg border border-amber-200">
                100% Objective Engineering Criteria
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-1.5">
                <div className="flex justify-between items-center text-stone-800 font-bold">
                  <span>1. Three-Part Model Architecture</span>
                  <span className="text-[#E5391C]">5.0 Points</span>
                </div>
                <p className="text-stone-500 font-sans text-xs">
                  Clearly diagrams User’s Mental Model vs Designer’s System Model vs Broken System Image. Cites specific misleading metaphors.
                </p>
              </div>

              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-1.5">
                <div className="flex justify-between items-center text-stone-800 font-bold">
                  <span>2. Fitts’s & Hick’s Law Formulation</span>
                  <span className="text-[#E5391C]">5.0 Points</span>
                </div>
                <p className="text-stone-500 font-sans text-xs">
                  Calculates exact ID bits for primary action; applies Hick’s law progressive disclosure to cut choice branching.
                </p>
              </div>

              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-1.5">
                <div className="flex justify-between items-center text-stone-800 font-bold">
                  <span>3. Gestalt Deconstruction & Wireframe</span>
                  <span className="text-[#E5391C]">5.0 Points</span>
                </div>
                <p className="text-stone-500 font-sans text-xs">
                  Annotates at least 2 Gestalt violations on existing baseline; provides an annotated wireframe fix resolving proximity & similarity.
                </p>
              </div>

              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-1.5">
                <div className="flex justify-between items-center text-stone-800 font-bold">
                  <span>4. Working Memory & Cognitive Load</span>
                  <span className="text-[#E5391C]">5.0 Points</span>
                </div>
                <p className="text-stone-500 font-sans text-xs">
                  Identifies instances of forced recall; provides chunking masks (Cowan’s 3–4 items) and recognition cues for complex data.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
