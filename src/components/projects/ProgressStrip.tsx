import React, { useEffect, useState } from 'react';
import { COURSE_SESSIONS } from '../../data/sessions';
import {
  STATUS_LABEL,
  bestStatus,
  fetchPublicOverview,
  type ProgressStatus,
  type PublicOverview,
} from '../../lib/backend';

/** Status colours shared by the student view and the teacher panel. */
export const STATUS_STYLE: Record<ProgressStatus, { dot: string; chip: string }> = {
  pending: { dot: 'bg-stone-300', chip: 'bg-stone-100 text-stone-500 border-stone-200' },
  working: { dot: 'bg-amber-500', chip: 'bg-amber-50 text-amber-800 border-amber-200' },
  sent: { dot: 'bg-emerald-600', chip: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
  reviewed: { dot: 'bg-blue-600', chip: 'bg-blue-50 text-blue-800 border-blue-200' },
};

/** Sessions the project runs through (it starts in Session 2). */
export const PROJECT_SESSIONS = COURSE_SESSIONS.filter((s) => s.id >= 2);

/** Loads the public, read-only overview once; null when the backend is not set up or unreachable. */
export const useOverview = (): PublicOverview | null => {
  const [overview, setOverview] = useState<PublicOverview | null>(null);
  useEffect(() => {
    let alive = true;
    fetchPublicOverview().then((o) => alive && setOverview(o));
    return () => {
      alive = false;
    };
  }, []);
  return overview;
};

export const membersOf = (o: PublicOverview | null, projectId: number): string[] =>
  o ? o.members.filter((m) => m.project_id === projectId).map((m) => m.last_name) : [];

const statusOf = (o: PublicOverview | null, projectId: number, session: number): ProgressStatus | null =>
  o ? bestStatus(o.progress.filter((p) => p.project_id === projectId && p.session === session)) : null;

/** One small square per session: grey = not started, amber = working, green = report sent, blue = feedback given. */
export const ProgressStrip: React.FC<{ overview: PublicOverview | null; projectId: number }> = ({ overview, projectId }) => (
  <div className="flex items-center gap-1" aria-label="Progress per session">
    {PROJECT_SESSIONS.map((s) => {
      const st = statusOf(overview, projectId, s.id) ?? 'pending';
      return (
        <span
          key={s.id}
          title={`Session ${s.id}: ${STATUS_LABEL[st]}`}
          className={`w-3.5 h-3.5 rounded-[4px] ${STATUS_STYLE[st].dot}`}
        />
      );
    })}
  </div>
);

/** The full list for the project page. */
export const ProgressTimeline: React.FC<{ overview: PublicOverview | null; projectId: number }> = ({ overview, projectId }) => (
  <ul className="space-y-1.5">
    {PROJECT_SESSIONS.map((s) => {
      const rows = overview ? overview.progress.filter((p) => p.project_id === projectId && p.session === s.id) : [];
      const st = bestStatus(rows) ?? 'pending';
      const note = rows.find((r) => r.status === st)?.note;
      return (
        <li key={s.id} className="flex items-start gap-2.5 text-sm">
          <span className={`w-3 h-3 rounded-full mt-1 shrink-0 ${STATUS_STYLE[st].dot}`} />
          <div className="min-w-0">
            <div className={st === 'pending' ? 'text-[#9A968F]' : 'text-[#222222] font-semibold'}>
              Session {s.id}: {STATUS_LABEL[st]}
            </div>
            {note && <div className="text-xs text-[#6E6D70] leading-snug">{note}</div>}
          </div>
        </li>
      );
    })}
  </ul>
);
