import React, { useEffect, useRef, useState } from 'react';
import { X, ArrowLeft, ArrowRight, Link2, Check, Target, User, Info, Lightbulb } from 'lucide-react';
import { UM6PLogo } from '../brand/UM6PLogo';
import { Icon } from '../session2/primitives';
import { PROJECTS } from '../../data/projects';
import { PROJECT_COMPONENTS } from './registry';
import { ProgressStrip, ProgressTimeline, membersOf, useOverview } from './ProgressStrip';
import type { PublicOverview } from '../../lib/backend';

/** Native design size of every project interface. */
const DESIGN_W = 1280;
const DESIGN_H = 800;

interface ProjectsHubProps {
  /** null = gallery of all projects */
  projectId: number | null;
  onSelect: (id: number | null) => void;
  onClose: () => void;
}

/** Full-screen gallery of the ten course projects, and a viewer that shows one interface at a time. */
const ProjectsHub: React.FC<ProjectsHubProps> = ({ projectId, onSelect, onClose }) => {
  const project = PROJECTS.find((p) => p.id === projectId) ?? null;
  const overview = useOverview();

  // Esc: viewer -> gallery -> close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (project) onSelect(null);
      else onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [project, onSelect, onClose]);

  return (
    <div className="fixed inset-0 z-[60] bg-[#FAF9F6] text-[#222222] flex flex-col select-text">
      <header className="flex items-center justify-between gap-4 px-5 sm:px-8 h-16 border-b border-[#E8E2D9] bg-white flex-shrink-0">
        <div className="flex items-center gap-4 min-w-0">
          <UM6PLogo variant="compact" theme="color" className="h-8 w-auto hidden sm:inline-flex" />
          <div className="h-6 w-px bg-[#E8E2D9] hidden sm:block" />
          <span className="text-sm font-mono uppercase tracking-wider text-[#E5391C] font-bold truncate">
            Course Projects · Fix a Broken Interface
          </span>
        </div>
        <button
          onClick={onClose}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#E8E2D9] bg-[#FAF9F6] hover:bg-[#F5F2ED] text-sm font-semibold cursor-pointer"
          title="Close (Esc)"
        >
          <X className="w-4 h-4" />
          <span>Close</span>
        </button>
      </header>

      {project ? (
        <Viewer projectId={project.id} overview={overview} onBack={() => onSelect(null)} onSelect={onSelect} />
      ) : (
        <Gallery overview={overview} onSelect={onSelect} />
      )}
    </div>
  );
};

const Gallery: React.FC<{ onSelect: (id: number) => void; overview: PublicOverview | null }> = ({ onSelect, overview }) => (
  <div className="flex-1 overflow-y-auto px-5 sm:px-8 py-6">
    <div className="max-w-[1400px] mx-auto">
      <h1 className="text-3xl sm:text-4xl font-serif-display font-medium text-[#2D2D2E]">The 10 projects</h1>
      <p className="text-base sm:text-lg text-[#525254] pt-2 max-w-3xl">
        Each project is a real-looking interface with real design problems. Choose one, open it, and try the task like a
        real user. You will improve it a little more after every session.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5 pt-6">
        {PROJECTS.filter((p) => p.listed !== false).map((p) => (
          <button
            key={p.id}
            onClick={() => onSelect(p.id)}
            className="group text-left bg-white border border-[#E8E2D9] rounded-2xl p-5 shadow-xs hover:border-[#E5391C] hover:shadow-md transition-all cursor-pointer flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">
              <span className="w-10 h-10 rounded-xl bg-[#222222] text-white flex items-center justify-center font-mono font-bold text-lg">
                {p.id}
              </span>
              <span className="w-10 h-10 rounded-xl bg-[#FDF5F3] border border-[#FAD6CF] flex items-center justify-center text-[#E5391C]">
                <Icon name={p.icon} className="w-6 h-6" />
              </span>
            </div>
            <div className="text-lg font-bold leading-snug text-[#222222]">{p.title}</div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#E5391C] font-bold">{p.domain}</div>
            <div className="text-sm text-[#525254] leading-snug flex-1">{p.cardLine}</div>
            {overview && (
              <div className="space-y-2 pt-2 border-t border-[#F0EBE3]">
                <div className="text-xs text-[#525254] leading-snug">
                  <span className="font-mono uppercase tracking-wider text-[#6E6D70] font-bold">Team </span>
                  {membersOf(overview, p.id).join(', ') || <span className="italic text-[#9A968F]">not assigned yet</span>}
                </div>
                <ProgressStrip overview={overview} projectId={p.id} />
              </div>
            )}
            <div className="text-sm font-semibold text-[#E5391C] flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
              Open the interface <ArrowRight className="w-4 h-4" />
            </div>
          </button>
        ))}
      </div>
    </div>
  </div>
);

const Viewer: React.FC<{ projectId: number; overview: PublicOverview | null; onBack: () => void; onSelect: (id: number | null) => void }> = ({
  projectId,
  overview,
  onBack,
  onSelect,
}) => {
  const project = PROJECTS.find((p) => p.id === projectId)!;
  const Interface = PROJECT_COMPONENTS[projectId];
  const stageRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.7);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const measure = () => {
      const r = el.getBoundingClientRect();
      setScale(Math.max(0.2, Math.min((r.width - 8) / DESIGN_W, (r.height - 8) / DESIGN_H)));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [projectId]);

  const copyLink = async () => {
    const url = `${window.location.origin}${window.location.pathname}#/projects/${projectId}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.prompt('Copy this link:', url);
    }
  };

  const listed = PROJECTS.filter((p) => p.listed !== false);
  const showNav = project.listed !== false;
  const prev = projectId > 1 ? projectId - 1 : listed.length;
  const next = projectId < listed.length ? projectId + 1 : 1;

  return (
    <div className="flex-1 min-h-0 flex flex-col lg:flex-row">
      <aside className="lg:w-[380px] xl:w-[420px] flex-shrink-0 overflow-y-auto border-b lg:border-b-0 lg:border-r border-[#E8E2D9] bg-white p-5 sm:p-6 space-y-5">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-semibold text-[#525254] hover:text-[#E5391C] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> All projects
        </button>

        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-[#E5391C] font-bold">
            Project {project.id} · {project.domain}
          </div>
          <h2 className="text-2xl font-serif-display font-medium text-[#2D2D2E] pt-1 leading-tight">{project.title}</h2>
        </div>

        <div className="space-y-4 text-sm leading-relaxed text-[#525254]">
          <div className="flex gap-3">
            <User className="w-5 h-5 text-[#E5391C] shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-[#222222]">The user</div>
              {project.user}. {project.situation}
            </div>
          </div>
          <div className="flex gap-3 bg-[#FDF5F3] border border-[#FAD6CF] rounded-xl p-3.5">
            <Target className="w-5 h-5 text-[#E5391C] shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-[#222222]">Your task</div>
              <span className="text-[#2D2D2E]">{project.task}</span>
            </div>
          </div>
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-[#E5391C] shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-[#222222]">Why it matters</div>
              {project.stake}
            </div>
          </div>
          <div className="flex gap-3">
            <Lightbulb className="w-5 h-5 text-[#E5391C] shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-[#222222]">How to look at it</div>
              Do the task like a real user. Every time you hesitate, make a mistake, or are not sure what happened, write
              it down: each one is a clue to a design problem.
            </div>
          </div>
        </div>

        {overview && project.listed !== false && (
          <div className="space-y-3 pt-1 border-t border-[#F0EBE3]">
            <div className="text-sm">
              <div className="font-bold text-[#222222]">Team</div>
              <span className="text-[#525254]">{membersOf(overview, project.id).join(', ') || 'Not assigned yet'}</span>
            </div>
            <div className="text-sm space-y-2">
              <div className="font-bold text-[#222222]">Progress through the course</div>
              <ProgressTimeline overview={overview} projectId={project.id} />
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-2 pt-1">
          <button
            onClick={copyLink}
            className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#E8E2D9] bg-[#FAF9F6] hover:bg-[#F5F2ED] text-sm font-semibold cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Link2 className="w-4 h-4 text-[#E5391C]" />}
            {copied ? 'Link copied' : 'Copy link to this project'}
          </button>
        </div>

        {showNav && (
        <div className="flex items-center justify-between pt-2 border-t border-[#F0EBE3]">
          <button
            onClick={() => onSelect(prev)}
            className="flex items-center gap-1.5 text-sm font-semibold text-[#525254] hover:text-[#E5391C] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Project {prev}
          </button>
          <button
            onClick={() => onSelect(next)}
            className="flex items-center gap-1.5 text-sm font-semibold text-[#525254] hover:text-[#E5391C] cursor-pointer"
          >
            Project {next} <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        )}
      </aside>

      <div ref={stageRef} className="flex-1 min-w-0 min-h-[320px] flex items-center justify-center p-3 bg-[#F1EEE8]">
        <div
          style={{ width: DESIGN_W * scale, height: DESIGN_H * scale }}
          className="relative flex-shrink-0 shadow-xl border border-[#D5CFC7] bg-white overflow-hidden"
        >
          <div
            key={projectId}
            style={{ width: DESIGN_W, height: DESIGN_H, transform: `scale(${scale})`, transformOrigin: 'top left' }}
            className="absolute top-0 left-0"
          >
            <Interface />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsHub;
