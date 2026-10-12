import React, { useMemo, useState } from 'react';
import { Bell, ChevronDown, ChevronRight, MoreHorizontal, Search, X } from 'lucide-react';

interface Alert {
  id: number;
  sev: 1 | 2 | 3 | 4;
  title: string;
  source: string;
  count: number;
  minsAgo: number;
  acked: boolean;
  owner: string;
  detail: string;
}

// [sev, title, source, count, minutes ago, detail]
const RAW: [1 | 2 | 3 | 4, string, string, number, number, string][] = [
  [3, 'Disk usage above 85% on /var/log', 'web-12', 4, 190, 'Volume /var/log is at 87% (threshold 85%). Log rotation last ran 3 days ago.'],
  [2, 'Elevated 5xx rate on checkout-api', 'checkout-api', 112, 14, '5xx ratio at 4.2% over the last 5 minutes (threshold 2%).'],
  [4, 'Certificate expires in 29 days', 'cdn-edge', 1, 5200, 'TLS certificate for static.shopline.example expires on 2026-11-10.'],
  [2, 'Queue depth growing: order-events', 'rabbit-02', 58, 33, 'order-events has 18,400 pending messages; consumers lagging.'],
  [3, 'High memory on worker-07', 'worker-07', 9, 74, 'Resident memory at 91% of limit for 20 minutes.'],
  [1, 'Primary database unreachable: pg-prod-01', 'pg-prod-01', 214, 8, 'Health checks to pg-prod-01:5432 failing from 6 of 6 probes. Writes are being rejected; replicas serving stale reads. Customer-facing impact: checkout, login.'],
  [2, 'Replication lag > 60s on pg-prod-02', 'pg-prod-02', 41, 11, 'Replica lag at 94 seconds (threshold 60). Likely related to the primary.'],
  [3, 'Slow queries detected (p95 > 800ms)', 'pg-prod-02', 17, 120, 'Top offender: SELECT ... FROM orders WHERE customer_id = ?'],
  [2, 'Pod restart loop: search-indexer', 'k8s-prod', 63, 21, 'search-indexer restarted 12 times in 30 minutes (OOMKilled).'],
  [4, 'NTP drift 140ms on app-03', 'app-03', 2, 880, 'Clock offset slightly above warning threshold.'],
  [3, 'Failed login spike', 'auth-svc', 36, 47, '312 failed logins in 10 minutes from 41 IPs.'],
  [2, 'Latency p99 > 2s on catalog-api', 'catalog-api', 27, 29, 'p99 latency is 2.4s (threshold 2s).'],
  [4, 'Backup job took longer than usual', 'backup-01', 1, 1440, 'Nightly backup finished in 2h 41m (usual 1h 50m).'],
  [3, 'CPU steal time high on vm-eu-14', 'vm-eu-14', 15, 95, 'Steal time at 18% for 15 minutes.'],
  [2, 'Payment webhook delivery failing', 'payments', 88, 17, '38% of webhook deliveries to the acquirer return HTTP 503.'],
  [4, 'Deprecated API version still in use', 'gateway', 6, 2900, 'Clients still calling /v1/ endpoints scheduled for removal.'],
  [3, 'Redis evictions increasing', 'redis-cache-1', 22, 66, 'evicted_keys rate 140/s.'],
  [3, 'Inode usage above 80% on /data', 'storage-04', 3, 410, 'Inode usage at 82%.'],
  [2, 'Error budget burn rate high: login', 'auth-svc', 19, 52, '2h burn rate is 6.1x.'],
  [4, 'Unused load balancer detected', 'lb-legacy', 1, 7200, 'No traffic for 14 days.'],
  [3, 'Cron job missed: invoice-export', 'batch-02', 5, 260, 'Job did not start at 01:00.'],
  [2, 'DNS resolution timeouts', 'dns-int', 47, 38, '3.1% of internal lookups time out.'],
  [3, 'Swap usage above 50%', 'app-09', 8, 140, 'Swap in use: 3.1 GB.'],
  [4, 'SSL cipher warning on mail-gw', 'mail-gw', 1, 3100, 'Weak cipher still enabled.'],
  [2, 'Kafka consumer lag: billing', 'kafka-01', 72, 26, 'Consumer group billing is 220k messages behind.'],
  [3, 'Packet loss 1.2% to eu-west link', 'net-core', 11, 83, 'Packet loss on uplink 2.'],
  [3, 'Container image vulnerability: CVE-2026-1182', 'registry', 4, 600, 'High severity CVE in base image node:20.'],
  [2, 'Object storage 5xx errors', 'obj-store', 34, 44, '1.9% error rate on PUT requests.'],
  [4, 'Log forwarder buffer 60% full', 'logship-02', 2, 330, 'Buffer utilisation rising slowly.'],
  [3, 'Thread pool saturation on cart-svc', 'cart-svc', 13, 58, 'Active threads at 96% of pool size.'],
  [2, 'Autoscaler cannot add nodes', 'k8s-prod', 29, 36, 'Quota exceeded in zone eu-west-1b.'],
  [4, 'Prometheus scrape slow', 'mon-01', 3, 980, 'Scrape duration 9.2s.'],
  [3, 'GC pauses > 500ms', 'search-api', 10, 112, 'Frequent long GC pauses.'],
  [2, 'Email delivery bounce rate high', 'mail-gw', 25, 41, 'Bounce rate 7.8% over 30 minutes.'],
  [3, 'Config drift detected', 'cfg-mgmt', 7, 520, '3 hosts diverge from desired state.'],
  [4, 'Dashboard datasource slow', 'grafana', 2, 1800, 'Query timeout warnings.'],
  [3, 'Stale cache entries on cdn-edge', 'cdn-edge', 12, 205, 'Purge backlog of 340 objects.'],
  [2, 'Session store latency high', 'redis-sess-1', 31, 23, 'Median latency 38ms (threshold 10ms).'],
  [4, 'Low disk on build agent', 'ci-agent-3', 2, 4100, 'Free space 14%.'],
  [3, 'Health check flapping: media-svc', 'media-svc', 21, 69, 'Probe failing intermittently.'],
];

const TEAMS: [string, string, string][] = [
  ['TEAM-PLT-01', 'Platform Core', 'platform@opsw.example'],
  ['TEAM-PLT-03', 'Platform Infra', 'infra@opsw.example'],
  ['TEAM-NET-01', 'Network', 'net@opsw.example'],
  ['TEAM-DB-01', 'Database (analytics)', 'db-analytics@opsw.example'],
  ['TEAM-DB-02', 'Database (production)', 'db-prod@opsw.example'],
  ['TEAM-SEC-02', 'Security', 'sec@opsw.example'],
  ['TEAM-APP-05', 'Storefront', 'storefront@opsw.example'],
  ['TEAM-APP-07', 'Payments', 'payments@opsw.example'],
  ['TEAM-SRE-01', 'Site Reliability', 'sre@opsw.example'],
];

const pad = (n: number) => String(n).padStart(2, '0');
const NOW = new Date(2026, 9, 12, 3, 4, 0);

const fmtTime = (mins: number, i: number): string => {
  const d = new Date(NOW.getTime() - mins * 60000);
  const mon = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][d.getMonth()];
  switch (i % 5) {
    case 0: return mins < 60 ? `${mins}m ago` : `${Math.floor(mins / 60)}h ago`;
    case 1: return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad((i * 7) % 60)}`;
    case 2: return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())} UTC`;
    case 3: return `${mon} ${d.getDate()}, ${d.getHours() % 12 || 12}:${pad(d.getMinutes())} ${d.getHours() < 12 ? 'AM' : 'PM'}`;
    default: return `${pad(d.getDate())}/${pad(d.getMonth() + 1)} ${pad(d.getHours())}h${pad(d.getMinutes())}`;
  }
};

const INITIAL: Alert[] = RAW.map((r, i) => ({
  id: 9100 + i * 7,
  sev: r[0],
  title: r[1],
  source: r[2],
  count: r[3],
  minsAgo: r[4],
  acked: i === 1 || i === 8 || i === 15,
  owner: '',
  detail: r[5],
}));

type Dialog =
  | { kind: 'ack'; id: number }
  | { kind: 'assign'; id: number }
  | { kind: 'delete'; id: number }
  | { kind: 'bulk' }
  | null;

const Badge: React.FC<{ n: number | string }> = ({ n }) => (
  <span className="ml-auto min-w-[18px] h-[16px] px-1 rounded-full bg-[#e5484d] text-white text-[10px] font-bold inline-flex items-center justify-center">{n}</span>
);

export const Project08Alerts: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>(INITIAL);
  const [page, setPage] = useState<'alerts' | 'directory'>('alerts');
  const [openId, setOpenId] = useState<number | null>(null);
  const [tab, setTab] = useState('Overview');
  const [menu, setMenu] = useState(false);
  const [sub, setSub] = useState(false);
  const [dialog, setDialog] = useState<Dialog>(null);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [checked, setChecked] = useState<number[]>([]);
  const [sortSev, setSortSev] = useState(false);
  const [search, setSearch] = useState('');

  const open = alerts.find((a) => a.id === openId) ?? null;
  const rows = useMemo(() => {
    let r = alerts.filter((a) => (a.title + a.source).toLowerCase().includes(search.toLowerCase()));
    if (sortSev) r = [...r].sort((a, b) => a.sev - b.sev);
    return r;
  }, [alerts, sortSev, search]);

  const closeAll = () => { setMenu(false); setSub(false); };
  const ack = (ids: number[]) => setAlerts((l) => l.map((a) => (ids.includes(a.id) ? { ...a, acked: true } : a)));

  const confirmDialog = () => {
    if (!dialog) return;
    if (dialog.kind === 'ack') ack([dialog.id]);
    if (dialog.kind === 'bulk') { ack(checked); setChecked([]); }
    if (dialog.kind === 'delete') { setAlerts((l) => l.filter((a) => a.id !== dialog.id)); setOpenId(null); }
    if (dialog.kind === 'assign') {
      if (!TEAMS.some((t) => t[0] === code.trim())) { setError('Invalid input'); return; }
      setAlerts((l) => l.map((a) => (a.id === dialog.id ? { ...a, owner: code.trim() } : a)));
    }
    setDialog(null); setCode(''); setError('');
  };

  const cancelDialog = () => { setDialog(null); setCode(''); setError(''); };

  const idx = (id: number) => alerts.findIndex((a) => a.id === id);

  return (
    <div className="w-[1280px] h-[800px] relative overflow-hidden bg-[#f6f7f9] text-[#1f2933]" style={{ fontFamily: 'Segoe UI, system-ui, Roboto, Arial, sans-serif' }} onClick={closeAll}>
      {/* top bar */}
      <div className="absolute left-0 top-0 right-0 h-[48px] bg-[#1b1f3b] flex items-center px-4 gap-4">
        <div className="text-white text-[16px] font-semibold tracking-tight">OpsWatch</div>
        <div className="relative">
          <Search size={13} className="absolute left-2 top-[8px] text-[#8e94b8]" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search" className="h-[28px] w-[260px] pl-7 pr-2 rounded bg-[#2b3057] text-white text-[12px] outline-none placeholder:text-[#8e94b8]" />
        </div>
        <div className="flex-1" />
        <div className="relative text-[#c7cbe6]">
          <Bell size={16} />
          <span className="absolute -top-2 -right-3 min-w-[18px] h-[16px] px-1 rounded-full bg-[#e5484d] text-white text-[10px] font-bold flex items-center justify-center">99+</span>
        </div>
        <div className="text-[#c7cbe6] text-[12px] ml-3">Lina K. · on-call</div>
      </div>

      {/* nav */}
      <div className="absolute left-0 top-[48px] bottom-0 w-[176px] bg-white border-r border-[#e3e6ea] pt-3 text-[13px]">
        {([
          ['Alerts', 41, 'alerts'], ['Incidents', 12, ''], ['Services', 38, ''], ['Rotations', 5, ''], ['Integrations', 9, ''], ['Admin', 3, 'directory'],
        ] as [string, number, string][]).map(([label, n, target]) => (
          <div
            key={label}
            onClick={() => { if (target) { setPage(target as 'alerts' | 'directory'); setOpenId(null); } }}
            className={`flex items-center gap-2 px-4 h-[34px] cursor-pointer ${(label === 'Alerts' && page === 'alerts') || (label === 'Admin' && page === 'directory') ? 'bg-[#eef0ff] text-[#2f3a8f]' : 'text-[#3e4c59]'}`}
          >
            {label}
            <Badge n={n} />
          </div>
        ))}
      </div>

      {/* main */}
      <div className="absolute left-[176px] top-[48px] right-0 bottom-0 px-5 pt-4 flex flex-col">
        {page === 'alerts' ? (
          <>
            <div className="flex items-center gap-3 mb-3">
              <div className="text-[20px] font-semibold">Alerts</div>
              <div className="flex gap-2 ml-3 text-[12px]">
                {[['All', 41], ['Open', 38], ['Unacked', 35], ['Critical', 39], ['Mine', 7]].map(([l, n]) => (
                  <span key={l} className="inline-flex items-center gap-1 h-[24px] px-2 rounded bg-white border border-[#d9dde3]">
                    {l}
                    <span className="min-w-[18px] h-[16px] px-1 rounded-full bg-[#e5484d] text-white text-[10px] font-bold inline-flex items-center justify-center">{n}</span>
                  </span>
                ))}
              </div>
              <div className="flex-1" />
              <button
                disabled={!checked.length}
                onClick={(e) => { e.stopPropagation(); setDialog({ kind: 'bulk' }); }}
                className="h-[26px] px-3 rounded border border-[#d9dde3] bg-white text-[12px] disabled:text-[#b0b7bf] outline-none"
              >
                Bulk
              </button>
            </div>
            <div className="bg-white border border-[#e0e3e8] rounded flex-1 min-h-0 mb-4 flex flex-col">
              <div className="grid grid-cols-[26px_58px_1fr_120px_52px_150px_110px_28px] gap-2 items-center px-3 h-[30px] border-b border-[#e0e3e8] text-[11px] text-[#7b8794]">
                <span />
                <span onClick={() => setSortSev((s) => !s)} className="cursor-pointer">SEV</span>
                <span>ALERT</span><span>SOURCE</span><span>CNT</span><span>FIRED</span><span>OWNER</span><span />
              </div>
              <div className="overflow-y-auto flex-1">
                {rows.map((a) => {
                  const i = idx(a.id);
                  return (
                    <div
                      key={a.id}
                      className="grid grid-cols-[26px_58px_1fr_120px_52px_150px_110px_28px] gap-2 items-center px-3 h-[32px] border-b border-[#f0f1f3] text-[12px] border-l-[3px] border-l-[#e5484d] bg-[#fff5f5]"
                      style={{ opacity: a.acked ? 0.82 : 1 }}
                    >
                      <input
                        type="checkbox"
                        checked={checked.includes(a.id)}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => setChecked((c) => (e.target.checked ? [...c, a.id] : c.filter((x) => x !== a.id)))}
                      />
                      <span className="inline-flex items-center justify-center h-[18px] rounded bg-[#fde2e2] text-[#b42318] text-[10px] font-bold w-[46px]">SEV-{a.sev}</span>
                      <span onClick={(e) => { e.stopPropagation(); setOpenId(a.id); setTab('Overview'); closeAll(); }} className="truncate cursor-pointer text-[#b42318]">{a.title}</span>
                      <span className="truncate text-[#b42318]">{a.source}</span>
                      <span className="inline-flex items-center justify-center min-w-[24px] h-[16px] px-1 rounded-full bg-[#e5484d] text-white text-[10px] font-bold">{a.count}</span>
                      <span className="text-[#b42318] text-[11px] whitespace-nowrap">{fmtTime(a.minsAgo, i)}</span>
                      <span className="text-[#8b929a] text-[10px]">{a.owner}</span>
                      <MoreHorizontal size={14} className="text-[#8b929a]" />
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="text-[20px] font-semibold mb-3">Directory</div>
            <div className="bg-white border border-[#e0e3e8] rounded w-[640px]">
              <div className="grid grid-cols-[130px_1fr_220px] px-3 h-[30px] items-center border-b border-[#e0e3e8] text-[11px] text-[#7b8794]">
                <span>ID</span><span>NAME</span><span>CONTACT</span>
              </div>
              {TEAMS.map((t) => (
                <div key={t[0]} className="grid grid-cols-[130px_1fr_220px] px-3 h-[32px] items-center border-b border-[#f0f1f3] text-[12px]">
                  <span className="font-mono">{t[0]}</span><span>{t[1]}</span><span className="text-[#7b8794]">{t[2]}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* detail drawer */}
      {open && (
        <div className="absolute right-0 top-[48px] bottom-0 w-[500px] bg-white border-l border-[#d9dde3] shadow-xl z-10 flex flex-col" onClick={(e) => e.stopPropagation()}>
          <div className="px-5 pt-4 pb-3 border-b border-[#e0e3e8] relative">
            <button onClick={() => setOpenId(null)} className="absolute right-3 top-3 text-[#7b8794] bg-transparent outline-none"><X size={15} /></button>
            <div className="text-[11px] text-[#7b8794]">ALERT {open.id} · SEV-{open.sev}</div>
            <div className="text-[16px] font-semibold pr-8 mt-1">{open.title}</div>
            <div className="flex items-center gap-2 mt-3 relative">
              <button
                onClick={() => { setMenu((m) => !m); setSub(false); }}
                className="h-[28px] px-3 rounded border border-[#cfd4da] bg-white text-[12px] inline-flex items-center gap-1 outline-none"
              >
                Actions <ChevronDown size={12} />
              </button>
              {menu && (
                <div className="absolute left-0 top-[30px] w-[170px] bg-white border border-[#cfd4da] rounded shadow-md z-20 py-1 text-[12px]">
                  <div className="px-3 h-[26px] flex items-center hover:bg-[#f3f4f6] cursor-pointer">View raw</div>
                  <div onClick={() => setSub(true)} className="px-3 h-[26px] flex items-center justify-between hover:bg-[#f3f4f6] cursor-pointer">Respond <ChevronRight size={12} /></div>
                  <div className="px-3 h-[26px] flex items-center hover:bg-[#f3f4f6] cursor-pointer">Silence 24h</div>
                  <div onClick={() => { setDialog({ kind: 'delete', id: open.id }); closeAll(); }} className="px-3 h-[26px] flex items-center hover:bg-[#f3f4f6] cursor-pointer">Delete</div>
                  {sub && (
                    <div className="absolute left-[168px] top-[30px] w-[150px] bg-white border border-[#cfd4da] rounded shadow-md py-1">
                      <div onClick={() => { setDialog({ kind: 'ack', id: open.id }); closeAll(); }} className="px-3 h-[26px] flex items-center hover:bg-[#f3f4f6] cursor-pointer">Acknowledge…</div>
                      <div onClick={() => { setDialog({ kind: 'assign', id: open.id }); closeAll(); }} className="px-3 h-[26px] flex items-center hover:bg-[#f3f4f6] cursor-pointer">Assign…</div>
                      <div className="px-3 h-[26px] flex items-center hover:bg-[#f3f4f6] cursor-pointer">Escalate</div>
                      <div className="px-3 h-[26px] flex items-center hover:bg-[#f3f4f6] cursor-pointer">Snooze</div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-5 px-5 h-[34px] items-end border-b border-[#e0e3e8] text-[12px] text-[#7b8794]">
            {['Overview', 'Timeline', 'Runbook', 'Related'].map((t) => (
              <span key={t} onClick={() => setTab(t)} className={`pb-2 cursor-pointer ${tab === t ? 'text-[#1f2933] border-b-2 border-[#2f3a8f]' : ''}`}>{t}</span>
            ))}
          </div>
          <div className="p-5 text-[12px] leading-[18px] overflow-auto">
            {tab === 'Overview' && (
              <>
                <p className="mb-4">{open.detail}</p>
                <div className="grid grid-cols-[90px_1fr] gap-y-2 text-[#52606d]">
                  <span>Source</span><span className="text-[#1f2933]">{open.source}</span>
                  <span>Occurrences</span><span className="text-[#1f2933]">{open.count}</span>
                  <span>First seen</span><span className="text-[#1f2933]">{fmtTime(open.minsAgo, 2)}</span>
                  <span>Environment</span><span className="text-[#1f2933]">production</span>
                </div>
              </>
            )}
            {tab === 'Timeline' && <div className="text-[#52606d]">{fmtTime(open.minsAgo, 1)} alert fired<br />{fmtTime(open.minsAgo - 1 < 0 ? 0 : open.minsAgo - 1, 3)} notification sent to rotation</div>}
            {tab === 'Runbook' && <div className="text-[#52606d]">1. Check service dashboards.<br />2. Verify recent deployments.<br />3. Page the owning team if impact persists.</div>}
            {tab === 'Related' && <div className="text-[#52606d]">No related alerts linked.</div>}
          </div>
        </div>
      )}

      {/* dialogs */}
      {dialog && (
        <div className="absolute inset-0 bg-black/40 z-30 flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
          <div className="w-[400px] bg-white rounded shadow-xl p-5">
            {dialog.kind === 'assign' ? (
              <>
                <div className="text-[15px] font-semibold mb-3">Assign</div>
                <label className="text-[12px] text-[#52606d]">Team code</label>
                <input
                  autoFocus
                  value={code}
                  onChange={(e) => { setCode(e.target.value); setError(''); }}
                  placeholder="TEAM-XX-00"
                  className="w-full h-[30px] mt-1 px-2 border border-[#cfd4da] rounded text-[13px] outline-none"
                />
                {error && <div className="text-[12px] text-[#b42318] mt-2">{error}</div>}
              </>
            ) : (
              <>
                <div className="text-[15px] font-semibold mb-2">Are you sure?</div>
                <div className="text-[12px] text-[#52606d]">
                  {dialog.kind === 'bulk' ? `This will apply to ${checked.length} items.` : 'This action will be applied to the selected alert.'}
                </div>
              </>
            )}
            <div className="flex justify-end gap-2 mt-5">
              <button onClick={cancelDialog} className="h-[30px] px-4 rounded border border-[#cfd4da] bg-white text-[12px] outline-none">Cancel</button>
              <button onClick={confirmDialog} className="h-[30px] px-5 rounded bg-[#2f3a8f] text-white text-[12px] font-semibold outline-none">OK</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
