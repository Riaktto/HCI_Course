import React, { useMemo, useRef, useState } from 'react';
import {
  Activity, Boxes, Cpu, Download, GitBranch, Layers, MoreVertical, Package, RotateCw, Settings, WrapText, Copy, Search, Bell,
} from 'lucide-react';

type St = 'ok' | 'fail' | 'run' | 'skip' | 'warn';

interface Run {
  id: number;
  branch: string;
  msg: string;
  author: string;
  st: St;
  dur: string;
  when: string;
  trg: string;
  sha: string;
}

interface Job {
  name: string;
  stage: string;
  st: St;
  dur: string;
}

const COLORS: Record<St, string> = {
  ok: '#2da44e',
  fail: '#d1242f',
  run: '#3b82f6',
  skip: '#9aa0a6',
  warn: '#d9a400',
};

const hex = (n: number) => (n * 2654435761 >>> 0).toString(16).slice(0, 7).padStart(7, '0');

const RAW: [string, string, string, St, string, string, string][] = [
  ['main', 'Bump axios to 1.7.9', 'n.idrissi', 'ok', '6m 12s', '4m', 'PUSH'],
  ['feat/cart-promo', 'Add promo code field to cart', 's.elamrani', 'ok', '7m 40s', '9m', 'MR'],
  ['main', 'Fix typo in invoice footer', 'o.benkirane', 'ok', '6m 02s', '21m', 'PUSH'],
  ['fix/tz-offset', 'Handle DST offset in scheduler', 'h.tazi', 'fail', '3m 55s', '33m', 'MR'],
  ['main', 'Update CODEOWNERS', 'm.chraibi', 'ok', '5m 48s', '41m', 'PUSH'],
  ['nightly', 'Scheduled nightly build', 'bot', 'ok', '24m 10s', '1h', 'SCHD'],
  ['feat/search-v2', 'Index product tags', 'a.fassi', 'ok', '8m 31s', '1h', 'MR'],
  ['main', 'Merge pull request #1187', 'k.alaoui', 'ok', '6m 20s', '2h', 'PUSH'],
  ['release/2.14', 'Release 2.14.0-rc3', 'o.benkirane', 'fail', '27m 44s', '2h', 'MAN'],
  ['feat/export-csv', 'CSV export for orders', 'y.zniber', 'ok', '7m 05s', '2h', 'MR'],
  ['main', 'Refactor OrderService', 'n.idrissi', 'ok', '6m 33s', '3h', 'PUSH'],
  ['fix/login-redirect', 'Preserve next param on login', 'l.bennani', 'ok', '5m 59s', '3h', 'MR'],
  ['feat/ui-tokens', 'Introduce design tokens', 's.elamrani', 'fail', '4m 12s', '4h', 'MR'],
  ['main', 'Pin node to 20.11', 'm.chraibi', 'ok', '6m 01s', '4h', 'PUSH'],
  ['release/2.14', 'Release 2.14.0-rc2', 'o.benkirane', 'ok', '26m 02s', '5h', 'MAN'],
  ['hotfix/pdf-fonts', 'Embed fonts in PDF receipts', 'k.alaoui', 'ok', '9m 18s', '6h', 'MR'],
  ['main', 'Add health endpoint', 'h.tazi', 'ok', '6m 15s', '6h', 'PUSH'],
  ['nightly', 'Scheduled nightly build', 'bot', 'fail', '23m 51s', '1d', 'SCHD'],
  ['feat/notifications', 'Web push opt-in', 'a.fassi', 'ok', '8m 02s', '1d', 'MR'],
  ['main', 'Drop legacy /v1/ping', 'y.zniber', 'ok', '6m 29s', '1d', 'PUSH'],
  ['fix/rounding', 'Round totals to 2 decimals', 'l.bennani', 'ok', '5m 44s', '1d', 'MR'],
  ['release/2.14', 'Release 2.14.0-rc1', 'o.benkirane', 'fail', '25m 33s', '1d', 'MAN'],
  ['main', 'Upgrade postgres driver', 'n.idrissi', 'ok', '6m 47s', '1d', 'PUSH'],
  ['feat/admin-roles', 'Role matrix in admin', 's.elamrani', 'ok', '8m 20s', '2d', 'MR'],
  ['main', 'Fix flaky cart test', 'm.chraibi', 'ok', '6m 10s', '2d', 'PUSH'],
  ['feat/i18n-ar', 'Arabic strings batch 1', 'k.alaoui', 'ok', '7m 58s', '2d', 'MR'],
  ['nightly', 'Scheduled nightly build', 'bot', 'ok', '24m 40s', '2d', 'SCHD'],
  ['main', 'Merge pull request #1179', 'h.tazi', 'ok', '6m 24s', '2d', 'PUSH'],
  ['fix/null-address', 'Guard null shipping address', 'a.fassi', 'fail', '3m 31s', '3d', 'MR'],
  ['main', 'Remove unused feature flags', 'y.zniber', 'ok', '6m 05s', '3d', 'PUSH'],
  ['release/2.13', 'Release 2.13.2', 'o.benkirane', 'ok', '25m 11s', '3d', 'MAN'],
  ['feat/dark-mode', 'Dark theme for dashboard', 'l.bennani', 'ok', '7m 36s', '3d', 'MR'],
  ['main', 'Bump vite to 5.4', 'n.idrissi', 'ok', '6m 18s', '4d', 'PUSH'],
  ['nightly', 'Scheduled nightly build', 'bot', 'ok', '24m 02s', '4d', 'SCHD'],
  ['release/2.13', 'Release 2.13.1', 'o.benkirane', 'fail', '26m 20s', '4d', 'MAN'],
  ['main', 'Add retry to webhook sender', 's.elamrani', 'ok', '6m 39s', '5d', 'PUSH'],
  ['feat/coupons', 'Coupon domain model', 'm.chraibi', 'ok', '8m 11s', '5d', 'MR'],
  ['main', 'Docs: update README', 'k.alaoui', 'ok', '4m 50s', '5d', 'PUSH'],
  ['nightly', 'Scheduled nightly build', 'bot', 'ok', '23m 58s', '6d', 'SCHD'],
  ['main', 'Merge pull request #1168', 'h.tazi', 'ok', '6m 27s', '6d', 'PUSH'],
];

const RUNS: Run[] = RAW.map((r, i) => ({
  id: 4830 - i,
  branch: r[0],
  msg: r[1],
  author: r[2],
  st: r[3],
  dur: r[4],
  when: r[5],
  trg: r[6],
  sha: hex(4830 - i),
}));

const makeJobs = (r: Run): Job[] => {
  const fail = r.st === 'fail';
  const rel = r.branch.startsWith('release');
  const base: Job[] = [
    { name: 'checkout', stage: 'PREP', st: 'ok', dur: '0:12' },
    { name: 'deps-install', stage: 'PREP', st: 'ok', dur: '1:48' },
    { name: 'lint', stage: 'CHK', st: r.msg.includes('rc3') ? 'warn' : 'ok', dur: '0:51' },
    { name: 'typecheck', stage: 'CHK', st: 'ok', dur: '1:05' },
    { name: 'ut-shard-1', stage: 'TEST', st: 'ok', dur: '3:22' },
    { name: 'ut-shard-2', stage: 'TEST', st: 'ok', dur: '3:09' },
    { name: 'ut-shard-3', stage: 'TEST', st: 'ok', dur: '3:31' },
    { name: 'it-db', stage: 'TEST', st: fail ? 'fail' : 'ok', dur: fail ? '9:47' : '6:02' },
    { name: 'e2e-smoke', stage: 'TEST', st: 'ok', dur: '5:40' },
    { name: 'pkg-img', stage: 'PKG', st: fail ? 'skip' : 'ok', dur: fail ? '-' : '2:15' },
    { name: 'sbom', stage: 'PKG', st: fail ? 'skip' : 'ok', dur: fail ? '-' : '0:33' },
  ];
  if (rel) {
    base.push({ name: 'dpl-stg', stage: 'DPL', st: fail ? 'skip' : 'ok', dur: fail ? '-' : '1:50' });
    base.push({ name: 'dpl-prd', stage: 'DPL', st: 'skip', dur: '-' });
  }
  return base;
};

const STAGES = ['PREP', 'CHK', 'TEST', 'PKG', 'DPL'];

const makeLog = (job: Job, run: Run): string[] => {
  const out: string[] = [];
  const t = (n: number) => `02:${String(14 + Math.floor(n / 60)).padStart(2, '0')}:${String(n % 60).padStart(2, '0')}`;
  out.push(`[${t(0)}] runner bb-agent-eu-07 picked up job ${job.name} (pipeline ${run.id})`);
  out.push(`[${t(1)}] Pulling image registry.internal/ci/node:20.11-bullseye`);
  const pkgs = ['@nestjs/core', 'typeorm', 'pg', 'rxjs', 'class-validator', 'reflect-metadata', 'uuid', 'zod', 'dayjs', 'lodash', 'ioredis', 'bullmq', 'pino', 'helmet', 'passport'];
  for (let i = 0; i < 150; i++) {
    const p = pkgs[i % pkgs.length];
    out.push(`[${t(2 + i)}] INFO  restore cache layer ${p}@${1 + (i % 7)}.${i % 11}.${i % 5} ... ok (${10 + ((i * 37) % 90)}ms)`);
  }
  const failing = job.st === 'fail';
  const suite = ['CartServiceSpec', 'InvoiceSpec', 'OrderRepositoryIT', 'PaymentGatewayIT', 'StockReservationIT', 'CouponIT', 'UserRepositoryIT'];
  for (let i = 0; i < 80; i++) {
    const s = suite[i % suite.length];
    const base = 160 + i;
    if (failing && i === 34) {
      out.push(`[${t(base)}] ERROR connect ECONNREFUSED 10.20.4.17:5432 (db-test-02)`);
      out.push(`[${t(base)}]       at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1555:16)`);
      out.push(`[${t(base)}]       at Pool._pulseQueue (node_modules/pg-pool/index.js:148:28)`);
      out.push(`[${t(base)}]       at OrderRepository.findByCustomer (src/orders/order.repository.ts:62:11)`);
      continue;
    }
    if (failing && i > 34 && i < 50) {
      out.push(`[${t(base)}] WARN  ${s} retry ${1 + (i % 3)}/3 waiting for connection`);
      continue;
    }
    out.push(`[${t(base)}] INFO  ${s} › case ${i + 1} ${failing && i > 49 ? 'skipped (setup failed)' : 'passed'} (${5 + ((i * 13) % 120)}ms)`);
  }
  if (failing) {
    out.push(`[${t(250)}] INFO  Test Suites: 3 failed, 11 passed, 14 total`);
    out.push(`[${t(251)}] INFO  Tests:       41 failed, 212 passed, 253 total`);
    out.push(`[${t(252)}] INFO  Time:        587.31 s`);
    out.push(`[${t(253)}] INFO  Ran all test suites matching /it-db/i.`);
    out.push(`[${t(254)}] ERROR Process exited with code 1`);
  } else {
    out.push(`[${t(250)}] INFO  Test Suites: 14 passed, 14 total`);
    out.push(`[${t(251)}] INFO  Tests:       253 passed, 253 total`);
    out.push(`[${t(252)}] INFO  Job succeeded`);
  }
  return out;
};

const Dot: React.FC<{ st: St; size?: number }> = ({ st, size = 8 }) => (
  <span className="inline-block rounded-full shrink-0" style={{ width: size, height: size, background: COLORS[st] }} />
);

const NAV: [string, React.ReactNode][] = [
  ['Runs', <Activity size={15} key="a" />],
  ['Flows', <GitBranch size={15} key="b" />],
  ['Agents', <Cpu size={15} key="c" />],
  ['Artifacts', <Package size={15} key="d" />],
  ['Envs', <Layers size={15} key="e" />],
  ['Registry', <Boxes size={15} key="f" />],
  ['Org', <Settings size={15} key="g" />],
];

const matchesQuery = (r: Run, q: string): boolean => {
  const toks = q.trim().split(/\s+/).filter(Boolean);
  return toks.every((t) => {
    const [k, v] = t.split(':');
    if (!v) return false;
    if (k === 'br') return r.branch.startsWith(v);
    if (k === 'st') return r.st === (v as St);
    if (k === 'au') return r.author === v;
    if (k === 'tr') return r.trg === v;
    return false;
  });
};

export const Project07Pipeline: React.FC = () => {
  const [view, setView] = useState<'list' | 'run' | 'job'>('list');
  const [query, setQuery] = useState('');
  const [runId, setRunId] = useState<number>(4830);
  const [jobName, setJobName] = useState('');
  const [jobsByRun, setJobsByRun] = useState<Record<number, Job[]>>({});
  const [attempt, setAttempt] = useState<Record<number, number>>({});
  const [menu, setMenu] = useState(false);
  const timers = useRef<number[]>([]);

  const run = RUNS.find((r) => r.id === runId) ?? RUNS[0];
  const jobs = jobsByRun[run.id] ?? makeJobs(run);
  const runStatus: St = jobs.some((j) => j.st === 'run') ? 'run' : jobs.some((j) => j.st === 'fail') ? 'fail' : 'ok';
  const shown = useMemo(() => (query.trim() ? RUNS.filter((r) => matchesQuery(r, query)) : RUNS), [query]);

  const rerun = (only: boolean) => {
    const id = run.id;
    const cur = jobsByRun[id] ?? makeJobs(run);
    const next = cur.map((j) => (!only || j.st === 'fail' || j.st === 'skip' ? { ...j, st: 'run' as St } : j));
    setJobsByRun((m) => ({ ...m, [id]: next }));
    setAttempt((a) => ({ ...a, [id]: (a[id] ?? 1) + 1 }));
    setMenu(false);
    const handle = window.setTimeout(() => {
      setJobsByRun((m) => ({ ...m, [id]: (m[id] ?? next).map((j) => (j.st === 'run' ? { ...j, st: 'ok' as St, dur: '4:10' } : j)) }));
    }, only ? 7000 : 12000);
    timers.current.push(handle);
  };

  const openRun = (id: number) => {
    setRunId(id);
    setView('run');
    setMenu(false);
  };

  const job = jobs.find((j) => j.name === jobName);
  const log = useMemo(() => (job ? makeLog(job, run) : []), [job?.name, job?.st, run.id]);

  return (
    <div className="w-[1280px] h-[800px] relative overflow-hidden bg-[#f4f5f7] text-[#24292f]" style={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif' }}>
      {/* top bar */}
      <div className="absolute left-0 top-0 right-0 h-[44px] bg-[#161b22] flex items-center px-4 gap-3">
        <div className="w-[22px] h-[22px] rounded bg-[#3b82f6] flex items-center justify-center text-white text-[12px] font-bold">B</div>
        <div className="text-white text-[15px] font-semibold">BuildBoard</div>
        <div className="text-[#8b949e] text-[11px] ml-1">shopline / storefront-api</div>
        <div className="flex-1" />
        <Search size={14} color="#8b949e" />
        <Bell size={14} color="#8b949e" />
        <div className="w-[24px] h-[24px] rounded-full bg-[#6e7681] text-white text-[10px] flex items-center justify-center">OB</div>
      </div>

      {/* sidebar */}
      <div className="absolute left-0 top-[44px] bottom-0 w-[148px] bg-[#1c2330] pt-3">
        {NAV.map(([label, icon]) => (
          <div
            key={label}
            onClick={() => label === 'Runs' && setView('list')}
            className={`flex items-center gap-2 px-4 h-[32px] text-[12px] cursor-pointer outline-none ${label === 'Runs' ? 'bg-[#2a3445] text-white' : 'text-[#9aa7b8]'}`}
          >
            {icon}
            {label}
          </div>
        ))}
      </div>

      <div className="absolute left-[148px] top-[44px] right-0 bottom-0">
        {view === 'list' && (
          <div className="absolute inset-0 flex flex-col px-5 pt-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="text-[18px] font-semibold">Runs</div>
              <div className="text-[11px] text-[#8c959f]">{shown.length} of 40</div>
              <div className="flex-1" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="filter"
                className="w-[260px] h-[28px] px-2 text-[12px] border border-[#d0d7de] rounded bg-white outline-none"
              />
            </div>
            <div className="bg-white border border-[#d8dee4] rounded flex-1 min-h-0 flex flex-col mb-4">
              <div className="grid grid-cols-[24px_52px_150px_1fr_80px_70px_50px_54px_44px] gap-2 items-center px-3 h-[28px] border-b border-[#d8dee4] text-[10px] text-[#8c959f] uppercase">
                <span>ST</span><span>PL#</span><span>BR</span><span>CMT</span><span>AUTH</span><span>DUR</span><span>TRG</span><span>SHA</span><span>AGO</span>
              </div>
              <div className="overflow-y-auto flex-1">
                {shown.length === 0 && <div className="p-4 text-[12px] text-[#8c959f]">No results</div>}
                {shown.map((r) => (
                  <div key={r.id} className="grid grid-cols-[24px_52px_150px_1fr_80px_70px_50px_54px_44px] gap-2 items-center px-3 h-[30px] border-b border-[#eaeef2] text-[12px]">
                    <Dot st={r.st} />
                    <span onClick={() => openRun(r.id)} className="text-[#0969da] cursor-pointer text-[11px]">#{r.id}</span>
                    <span className="truncate text-[#57606a]">{r.branch}</span>
                    <span className="truncate text-[#57606a]">{r.msg}</span>
                    <span className="truncate text-[#8c959f] text-[11px]">{r.author}</span>
                    <span className="text-[#8c959f] text-[11px]">{r.dur}</span>
                    <span className="text-[#8c959f] text-[10px]">{r.trg}</span>
                    <span className="text-[#8c959f] text-[10px] font-mono">{r.sha}</span>
                    <span className="text-[#8c959f] text-[11px]">{r.when}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {view !== 'list' && (
          <div className="absolute inset-0 px-5 pt-4 flex flex-col">
            <div className="flex items-center gap-3">
              <Dot st={runStatus} size={10} />
              <div className="text-[18px] font-semibold">PL #{run.id}</div>
              <div className="text-[12px] text-[#8c959f]">{run.branch} · {run.sha}</div>
              <div className="flex-1" />
              <button onClick={() => rerun(false)} className="h-[34px] px-5 rounded bg-[#1f6feb] text-white text-[14px] font-bold outline-none">
                Rerun all
              </button>
              <div className="relative">
                <button onClick={() => setMenu((m) => !m)} className="w-[22px] h-[30px] flex items-center justify-center text-[#8c959f] outline-none bg-transparent">
                  <MoreVertical size={14} />
                </button>
                {menu && (
                  <div className="absolute right-0 top-[32px] w-[170px] bg-white border border-[#d0d7de] rounded shadow-md z-20 py-1 text-[12px]">
                    {['Copy link', 'Rerun failed jobs', 'Purge cache', 'Cancel pipeline', 'Delete run'].map((m) => (
                      <div
                        key={m}
                        onClick={() => (m === 'Rerun failed jobs' ? rerun(true) : setMenu(false))}
                        className="px-3 h-[26px] flex items-center cursor-pointer hover:bg-[#f3f4f6]"
                      >
                        {m}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="text-[11px] text-[#8c959f] mt-1">
              {run.msg} · {run.author} · TRG {run.trg} · ATT {attempt[run.id] ?? 1}
            </div>

            {view === 'run' && (
              <div className="mt-4 bg-white border border-[#d8dee4] rounded p-4 flex-1 mb-4 overflow-auto">
                <div className="flex gap-4">
                  {STAGES.filter((s) => jobs.some((j) => j.stage === s)).map((s) => (
                    <div key={s} className="w-[170px]">
                      <div className="text-[10px] text-[#8c959f] uppercase mb-2">{s}</div>
                      <div className="flex flex-col gap-2">
                        {jobs.filter((j) => j.stage === s).map((j) => (
                          <div
                            key={j.name}
                            onClick={() => { setJobName(j.name); setView('job'); }}
                            className="border border-[#d8dee4] rounded px-2 h-[34px] flex items-center gap-2 text-[11px] cursor-pointer bg-[#fafbfc]"
                          >
                            <Dot st={j.st} />
                            <span className="truncate flex-1">{j.name}</span>
                            <span className="text-[#a0a7b0] text-[10px]">{j.dur}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 grid grid-cols-4 gap-4 text-[11px] text-[#6e7781]">
                  <div>RUNNER<div className="text-[#24292f] text-[12px]">bb-agent-eu-07</div></div>
                  <div>ART<div className="text-[#24292f] text-[12px]">3 (212 MB)</div></div>
                  <div>QT<div className="text-[#24292f] text-[12px]">0:48</div></div>
                  <div>DUR<div className="text-[#24292f] text-[12px]">{run.dur}</div></div>
                </div>
              </div>
            )}

            {view === 'job' && job && (
              <div className="mt-3 flex-1 mb-4 flex flex-col min-h-0">
                <div className="flex items-center gap-3 mb-2">
                  <Dot st={job.st} />
                  <div className="text-[13px] font-semibold">{job.name}</div>
                  <div className="flex-1" />
                  <button onClick={() => rerun(true)} className="bg-transparent text-[#8c959f] outline-none"><RotateCw size={13} /></button>
                  <button className="bg-transparent text-[#8c959f] outline-none"><Download size={13} /></button>
                  <button className="bg-transparent text-[#8c959f] outline-none"><WrapText size={13} /></button>
                  <button className="bg-transparent text-[#8c959f] outline-none"><Copy size={13} /></button>
                </div>
                <div className="flex-1 min-h-0 bg-[#0c0c0c] rounded overflow-auto py-2 font-mono text-[11px] leading-[15px] text-[#7d8590]">
                  {log.map((l, i) => (
                    <div key={i} className="flex whitespace-pre px-2">
                      <span className="w-[34px] shrink-0 text-[#4a4f57] select-none">{i + 1}</span>
                      <span>{l}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
