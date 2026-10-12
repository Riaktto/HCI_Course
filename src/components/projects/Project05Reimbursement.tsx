import React, { useEffect, useRef, useState } from 'react';
import { Bell, ChevronDown, ChevronRight, HelpCircle, Paperclip } from 'lucide-react';

type PageId =
  | 'accueil' | 'espace' | 'adhesion' | 'ayants' | 'declarations' | 'prestations' | 'dossiers'
  | 'historique' | 'decomptes' | 'cotisations' | 'documents' | 'messagerie' | 'referentiel' | 'assistance';

interface MenuItem { id: PageId; label: string; badge?: number }

const MENU: MenuItem[] = [
  { id: 'accueil', label: 'Accueil' },
  { id: 'espace', label: 'Mon espace' },
  { id: 'adhesion', label: 'Adhésion' },
  { id: 'ayants', label: 'Ayants droit' },
  { id: 'declarations', label: 'Déclarations' },
  { id: 'prestations', label: 'Prestations' },
  { id: 'dossiers', label: 'Dossiers' },
  { id: 'historique', label: 'Historique' },
  { id: 'decomptes', label: 'Décomptes', badge: 7 },
  { id: 'cotisations', label: 'Cotisations' },
  { id: 'documents', label: 'Documents', badge: 2 },
  { id: 'messagerie', label: 'Messagerie', badge: 4 },
  { id: 'referentiel', label: 'Référentiel' },
  { id: 'assistance', label: 'Assistance' },
];

interface Dossier {
  num: string;
  depot: string;
  prest: string;
  demande: string;
  remb: string;
  code: string;
  detail: string;
}

const STATUS_DETAIL: Record<string, string> = {
  'REC. 01': 'Dossier reçu et enregistré. En attente d\'affectation à un gestionnaire (étape 1/7).',
  'EN INST. 03': 'Dossier en cours d\'instruction par un gestionnaire (étape 3/7).',
  'PJ MANQ. 12': 'Pièce justificative manquante ou illisible. Déposer un complément (étape 4/7).',
  'VAL. 07': 'Dossier validé, en attente de mise en paiement (étape 5/7).',
  'PAI. 09': 'Remboursement payé par virement (étape 6/7).',
  'REJ. 14': 'Dossier rejeté : prestation non couverte (étape 7/7).',
  'CLO 99': 'Dossier clôturé (étape 7/7).',
};

const CODES = Object.keys(STATUS_DETAIL);
const PRESTS = ['PH-02', 'CS-01', 'OP-14', 'DE-03', 'PH-07', 'LA-05', 'RA-02', 'HO-11'];
const DATES = ['08/10/26', '2026-10-03', '29/09/26', '3 oct.', '21/09/26', '2026-09-17', '12/09/26', '05/09/26', '30 août', '24/08/26'];

const BASE_DOSSIERS: Dossier[] = Array.from({ length: 26 }, (_, i) => {
  const code = CODES[(i * 3 + 1) % CODES.length];
  const amount = 80 + ((i * 137) % 900);
  const paid = code === 'PAI. 09' || code === 'CLO 99' ? Math.round(amount * 0.7) : 0;
  return {
    num: `DT-26/${String(10 - Math.floor(i / 4)).padStart(2, '0')}-00${40100 + i * 37}`,
    depot: DATES[i % DATES.length],
    prest: PRESTS[(i * 5) % PRESTS.length],
    demande: `${amount},00`,
    remb: paid ? `${paid},00` : '-',
    code,
    detail: STATUS_DETAIL[code],
  };
});

const PRESTATIONS = [
  'CS-01 Consultation généraliste', 'PH-02 Pharmacie (vignette)', 'OP-14 Optique verres', 'DE-03 Soins dentaires',
  'HO-11 Hospitalisation', 'LA-05 Analyses biologiques', 'RA-02 Radiologie', 'PH-07 Pharmacie ALD',
  'CS-09 Consultation spécialiste', 'KI-04 Kinésithérapie', 'OP-02 Monture', 'DE-12 Prothèse dentaire',
  'MA-01 Maternité', 'PH-03 Parapharmacie', 'AM-06 Ambulance', 'CS-04 Pédiatrie', 'LA-11 Anatomopathologie',
  'RA-07 IRM', 'HO-02 Séjour clinique', 'DE-01 Détartrage', 'AU-03 Appareillage auditif', 'PH-11 Matériel médical',
  'CS-12 Psychologie', 'OP-09 Lentilles', 'KI-10 Rééducation', 'RA-09 Scanner', 'HO-14 Chirurgie ambulatoire',
  'DE-07 Orthodontie', 'AU-01 Audiométrie', 'LA-02 Bilan sanguin', 'CS-15 Dermatologie', 'PH-05 Vaccins',
  'MA-03 Suivi grossesse', 'AM-01 Transport sanitaire', 'CT-00 Autre',
];

const BANKS = ['Attijariwafa', 'BMCE', 'Banque Populaire', 'CIH', 'Crédit Agricole', 'Société Générale', 'BMCI', 'Al Barid Bank', 'CFG'];
const FILES = ['IMG_20261011_184532.jpg', 'scan_0042.pdf', 'facture_pharmacie_oct.pdf', 'ordonnance_dr_tazi.jpg', 'Document1.pdf', 'releve_cih_sept.pdf', 'scan_0043.pdf'];

// ---------- small building blocks ----------

const Field: React.FC<{ label: string; span?: number; children: React.ReactNode }> = ({ label, span = 1, children }) => (
  <label className="block" style={{ gridColumn: `span ${span}` }}>
    <span className="block text-[11px] text-[#6b7280] mb-[2px]">{label}</span>
    {children}
  </label>
);

const inputCls = 'w-full h-[24px] px-[5px] text-[12px] border border-[#c9ced6] bg-white text-[#374151]';

// ---------- header and menu ----------

const Header: React.FC = () => (
  <div className="h-[54px] bg-[#1f4e79] flex items-center px-[16px] text-white shrink-0">
    <div className="flex items-center gap-[8px]">
      <svg width="28" height="28" viewBox="0 0 28 28"><circle cx="14" cy="14" r="13" fill="#2f80c4" /><path d="M7 15l5 5 9-11" stroke="#fff" strokeWidth="3" fill="none" /></svg>
      <div className="leading-tight">
        <div className="text-[17px] font-semibold">MutuelleNet</div>
        <div className="text-[10px] text-[#b7cfe6]">Espace adhérent</div>
      </div>
    </div>
    <div className="ml-[40px] text-[11px] text-[#b7cfe6]">Mutuelle Nationale des Salariés du Secteur Privé</div>
    <div className="ml-auto flex items-center gap-[16px] text-[11px]">
      <span className="relative">
        <Bell size={15} />
        <span className="absolute -top-[6px] -right-[8px] bg-[#e03131] text-white text-[9px] rounded-full px-[4px]">3</span>
      </span>
      <span>FR</span>
      <span>Y. EL IDRISSI</span>
      <span className="text-[#b7cfe6]">Déconnexion</span>
    </div>
  </div>
);

const SideMenu: React.FC<{ page: PageId; onGo: (p: PageId) => void }> = ({ page, onGo }) => (
  <div className="w-[190px] bg-[#eef1f5] border-r border-[#d5dae1] shrink-0 pt-[6px] overflow-hidden">
    {MENU.map((m) => (
      <button
        key={m.id}
        onClick={() => onGo(m.id)}
        className={`w-full flex items-center justify-between text-left px-[14px] h-[30px] text-[12px] outline-none ${
          page === m.id ? 'bg-[#dbe5f1] text-[#1f4e79] font-semibold' : 'text-[#374151] hover:bg-[#e3e8ef]'
        }`}
      >
        <span>{m.label}</span>
        {m.badge && <span className="bg-[#e03131] text-white text-[10px] rounded-full min-w-[16px] h-[16px] px-[4px] flex items-center justify-center">{m.badge}</span>}
      </button>
    ))}
  </div>
);

// ---------- pages ----------

const Accueil: React.FC<{ notice: string; onGo: (p: PageId) => void }> = ({ notice, onGo }) => (
  <div className="p-[20px]">
    {notice && <div className="text-[11px] text-[#6b7280] mb-[8px]">{notice}</div>}
    <div className="bg-[#fff3bf] border border-[#f0d96a] text-[#7a5b00] text-[12px] px-[10px] py-[6px] mb-[14px]">
      Campagne de mise à jour des RIB : merci de vérifier vos coordonnées bancaires avant le 31/12/2026.
    </div>
    <div className="text-[18px] font-semibold text-[#374151] mb-[12px]">Bienvenue Youssef</div>
    <div className="grid grid-cols-3 gap-[10px]">
      {[
        ['Mes prestations', 'Consulter le détail de vos soins couverts', 'prestations'],
        ['Mes dossiers', '26 dossiers enregistrés depuis 2024', 'dossiers'],
        ['Mes décomptes', '7 nouveaux décomptes disponibles', 'decomptes'],
        ['Mes cotisations', 'Situation à jour au 30/09/2026', 'cotisations'],
        ['Mes documents', '2 documents à signer', 'documents'],
        ['Ma messagerie', '4 messages non lus', 'messagerie'],
      ].map(([t, d, p]) => (
        <button key={t} onClick={() => onGo(p as PageId)} className="text-left border border-[#d5dae1] bg-[#f8f9fb] p-[12px] hover:bg-[#eef1f5]">
          <div className="text-[13px] font-semibold text-[#374151]">{t}</div>
          <div className="text-[11px] text-[#6b7280] mt-[3px]">{d}</div>
        </button>
      ))}
    </div>
    <div className="mt-[14px] text-[11px] text-[#6b7280]">
      Rappel : les demandes de prestation sont traitées sous 15 jours ouvrés à compter de la réception d'un dossier complet. Les pièces
      justificatives doivent être lisibles et conformes aux exigences de la circulaire DG-2024/07.
    </div>
  </div>
);

const Espace: React.FC = () => (
  <div className="p-[20px] text-[12px] text-[#374151]">
    <div className="text-[16px] font-semibold mb-[10px]">Mon espace</div>
    <table className="text-[12px]">
      <tbody>
        {[
          ['Nom', 'EL IDRISSI Youssef'],
          ['N° adhérent', 'MN-0048-2291-7'],
          ['Régime', 'AMO + complémentaire (formule 2)'],
          ['Email', 'y.elidrissi@exemple.ma'],
          ['Téléphone', '06 61 23 45 78'],
          ['RIB', '230 780 0012345678901234 56'],
          ['Titulaire', 'Youssef EL IDRISSI'],
          ['Banque', 'CIH'],
          ['Employeur', 'Société Atlas Textile SARL'],
        ].map(([k, v]) => (
          <tr key={k}><td className="pr-[24px] py-[3px] text-[#6b7280]">{k}</td><td>{v}</td></tr>
        ))}
      </tbody>
    </table>
  </div>
);

const GenericPage: React.FC<{ title: string; text: string }> = ({ title, text }) => (
  <div className="p-[20px] text-[12px] text-[#374151]">
    <div className="text-[16px] font-semibold mb-[10px]">{title}</div>
    <div className="max-w-[560px] text-[#6b7280]">{text}</div>
  </div>
);

const Referentiel: React.FC = () => (
  <div className="p-[20px] text-[12px] text-[#374151]">
    <div className="text-[16px] font-semibold mb-[10px]">Référentiel</div>
    <div className="text-[#6b7280] mb-[10px]">Nomenclature des statuts de dossier</div>
    <table className="text-[11px] border-collapse">
      <tbody>
        {CODES.map((c) => (
          <tr key={c} className="border-b border-[#e5e7eb]">
            <td className="pr-[20px] py-[3px] font-semibold">{c}</td>
            <td className="text-[#6b7280]">{STATUS_DETAIL[c]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const pillCls = (code: string) =>
  code.startsWith('PAI') || code.startsWith('VAL')
    ? 'bg-[#e3f1e6] text-[#2f6b3c]'
    : code.startsWith('REJ') || code.startsWith('PJ')
      ? 'bg-[#f8e3e3] text-[#9b2c2c]'
      : 'bg-[#e6ecf4] text-[#34506f]';

const Dossiers: React.FC<{ rows: Dossier[] }> = ({ rows }) => {
  const [open, setOpen] = useState<string | null>(null);
  const [filter, setFilter] = useState('');
  const shown = rows.filter((r) => !filter || r.code === filter);
  return (
    <div className="p-[20px] h-full flex flex-col">
      <div className="text-[16px] font-semibold text-[#374151] mb-[8px]">Dossiers</div>
      <div className="flex items-end gap-[10px] mb-[8px] text-[11px] text-[#6b7280]">
        <label>Période<input className={`${inputCls} w-[120px] block`} placeholder="jj/mm/aa - jj/mm/aa" /></label>
        <label>Statut
          <select className={`${inputCls} w-[120px] block`} value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="">Tous</option>
            {CODES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </label>
        <button className="h-[24px] px-[10px] text-[12px] border border-[#c9ced6] bg-[#f3f4f6] text-[#374151]">Rechercher</button>
      </div>
      <div className="flex-1 overflow-auto border border-[#d5dae1]">
        <table className="w-full text-[11px] text-[#374151]">
          <thead className="bg-[#eef1f5] text-[#6b7280] sticky top-0">
            <tr className="text-left">
              {['N° dossier', 'Dépôt', 'Prest.', 'Mnt dem.', 'Mnt remb.', 'Statut', ''].map((h) => <th key={h} className="px-[8px] py-[4px] font-normal">{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {shown.map((r) => (
              <React.Fragment key={r.num}>
                <tr className="border-t border-[#e5e7eb]">
                  <td className="px-[8px] py-[4px]">{r.num}</td>
                  <td className="px-[8px]">{r.depot}</td>
                  <td className="px-[8px]">{r.prest}</td>
                  <td className="px-[8px]">{r.demande}</td>
                  <td className="px-[8px]">{r.remb}</td>
                  <td className="px-[8px]"><span className={`px-[6px] py-[1px] rounded-sm text-[11px] ${pillCls(r.code)}`}>{r.code}</span></td>
                  <td className="px-[8px]">
                    <button onClick={() => setOpen(open === r.num ? null : r.num)} className="text-[#6b7280]">
                      {open === r.num ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                    </button>
                  </td>
                </tr>
                {open === r.num && (
                  <tr className="bg-[#f8f9fb]"><td colSpan={7} className="px-[8px] py-[4px] text-[#6b7280]">{r.detail}</td></tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ---------- claim form ----------

interface FormValues {
  adherent: string; ayant: string; regime: string; prestation: string; acte: string;
  dSoins: string; dOrdo: string; dFacture: string; facture: string; montant: string; prestataire: string;
  inpe: string; ville: string; prescripteur: string; ordo: string; mode: string; rib: string;
  titulaire: string; banque: string; email: string; tel: string; obs: string; attest: boolean; tp: boolean;
}

const EMPTY: FormValues = {
  adherent: '', ayant: '', regime: '', prestation: '', acte: '', dSoins: '', dOrdo: '', dFacture: '', facture: '',
  montant: '', prestataire: '', inpe: '', ville: '', prescripteur: '', ordo: '', mode: '', rib: '', titulaire: '',
  banque: '', email: '', tel: '', obs: '', attest: false, tp: false,
};

const ClaimForm: React.FC<{ onSubmit: (montant: string) => void }> = ({ onSubmit }) => {
  const [v, setV] = useState<FormValues>(EMPTY);
  const [file, setFile] = useState('');
  const [picker, setPicker] = useState(false);
  const [error, setError] = useState('');
  const set = <K extends keyof FormValues>(k: K, val: FormValues[K]) => setV((p) => ({ ...p, [k]: val }));
  const txt = (k: keyof FormValues, extra = '') => (
    <input className={`${inputCls} ${extra}`} value={v[k] as string} onChange={(e) => set(k, e.target.value as never)} />
  );

  const submit = () => {
    const missing = !v.adherent || !v.ayant || !v.prestation || !v.dSoins || !v.facture || !v.montant || !v.rib || !file || !v.attest;
    const badAmount = v.montant !== '' && isNaN(Number(v.montant.replace(',', '.')));
    if (missing || badAmount) {
      setError('Dossier incomplet ou invalide (ERR-22). Veuillez vérifier votre saisie.');
      return;
    }
    setError('');
    onSubmit(v.montant);
  };

  return (
    <div className="p-[16px] relative">
      <div className="flex items-baseline justify-between mb-[6px]">
        <div className="text-[16px] font-semibold text-[#374151]">Demande de prestation</div>
        <div className="flex items-center gap-[14px] text-[11px]">
          <button className="text-[#9ca3af] underline" onClick={() => setV(EMPTY)}>Annuler la saisie</button>
          <button className="text-[#5b84b1] underline" onClick={submit}>Transmettre</button>
        </div>
      </div>
      {error && <div className="text-[11px] text-[#c0392b] mb-[6px]">{error}</div>}
      <div className="grid grid-cols-4 gap-x-[12px] gap-y-[8px]">
        <Field label="N° Adhérent">{txt('adherent')}</Field>
        <Field label="Bénéficiaire (ayant droit)">
          <select className={inputCls} value={v.ayant} onChange={(e) => set('ayant', e.target.value)}>
            <option value="">--</option>
            <option>EL IDRISSI Youssef (A)</option>
            <option>BENNANI Salma (C)</option>
            <option>EL IDRISSI Adam (E1)</option>
            <option>EL IDRISSI Lina (E2)</option>
          </select>
        </Field>
        <Field label="Régime">
          <select className={inputCls} value={v.regime} onChange={(e) => set('regime', e.target.value)}>
            <option value="">--</option><option>AMO</option><option>AMO-COMP</option><option>CNOPS</option><option>CNSS</option>
          </select>
        </Field>
        <Field label="Tiers payant"><input type="checkbox" checked={v.tp} onChange={(e) => set('tp', e.target.checked)} /></Field>

        <Field label="Prestation" span={2}>
          <select className={inputCls} value={v.prestation} onChange={(e) => set('prestation', e.target.value)}>
            <option value="">--</option>
            {PRESTATIONS.map((p) => <option key={p}>{p}</option>)}
          </select>
        </Field>
        <Field label="Code acte">{txt('acte')}</Field>
        <Field label="Date des soins">
          <input className={inputCls} placeholder="jj/mm/aa" value={v.dSoins} onChange={(e) => set('dSoins', e.target.value)} />
        </Field>

        <Field label="Date ordonnance">{txt('dOrdo')}</Field>
        <Field label="Date facture">{txt('dFacture')}</Field>
        <Field label="Réf. facture">{txt('facture')}</Field>
        <Field label="Mnt facturé">{txt('montant')}</Field>

        <Field label="Prestataire de soins" span={2}>{txt('prestataire')}</Field>
        <Field label="N° INPE / Patente">{txt('inpe')}</Field>
        <Field label="Ville">{txt('ville')}</Field>

        <Field label="Prescripteur" span={2}>{txt('prescripteur')}</Field>
        <Field label="N° ordonnance">{txt('ordo')}</Field>
        <Field label="Mode de règlement">
          <select className={inputCls} value={v.mode} onChange={(e) => set('mode', e.target.value)}>
            <option value="">--</option><option>Virement</option><option>Chèque</option>
          </select>
        </Field>

        <Field label="RIB" span={2}>{txt('rib')}</Field>
        <Field label="Titulaire du compte">{txt('titulaire')}</Field>
        <Field label="Banque">
          <select className={inputCls} value={v.banque} onChange={(e) => set('banque', e.target.value)}>
            <option value="">--</option>{BANKS.map((b) => <option key={b}>{b}</option>)}
          </select>
        </Field>

        <Field label="Email de contact" span={2}>{txt('email')}</Field>
        <Field label="Tél.">{txt('tel')}</Field>
        <Field label="Pièces justificatives">
          <div className="flex items-center gap-[4px]">
            <button className="h-[24px] px-[6px] text-[11px] border border-[#c9ced6] bg-[#f3f4f6] flex items-center gap-[2px]" onClick={() => setPicker(true)}>
              <Paperclip size={10} />Parcourir
            </button>
            <span className="text-[10px] text-[#9ca3af] truncate w-[70px]">{file}</span>
          </div>
        </Field>

        <Field label="Observations" span={4}>
          <textarea className="w-full h-[40px] px-[5px] py-[3px] text-[12px] border border-[#c9ced6] text-[#374151]" value={v.obs} onChange={(e) => set('obs', e.target.value)} />
        </Field>
      </div>

      <label className="flex items-start gap-[6px] mt-[10px] text-[11px] text-[#6b7280]">
        <input type="checkbox" className="mt-[1px]" checked={v.attest} onChange={(e) => set('attest', e.target.checked)} />
        <span>Je certifie sur l'honneur l'exactitude des informations déclarées et reconnais avoir pris connaissance des dispositions de l'article 47 du règlement mutualiste.</span>
      </label>
      <div className="flex gap-[10px] mt-[10px]">
        <button className="h-[34px] px-[22px] text-[13px] font-semibold bg-[#e8590c] text-white" onClick={() => { setV(EMPTY); setFile(''); setError(''); }}>Réinitialiser</button>
        <button className="h-[34px] px-[22px] text-[13px] border border-[#c9ced6] bg-[#f3f4f6] text-[#374151]">Enregistrer le brouillon</button>
      </div>

      {picker && (
        <div className="absolute inset-0 bg-black/30 flex items-start justify-center pt-[80px] z-10">
          <div className="w-[380px] bg-white border border-[#9ca3af] text-[12px] text-[#374151]">
            <div className="bg-[#eef1f5] px-[10px] py-[6px] font-semibold">Ouvrir</div>
            <div className="h-[170px] overflow-auto">
              {FILES.map((f) => (
                <button key={f} className="block w-full text-left px-[10px] py-[3px] hover:bg-[#dbe5f1]" onClick={() => { setFile(f); setPicker(false); }}>{f}</button>
              ))}
            </div>
            <div className="p-[6px] text-right bg-[#eef1f5]">
              <button className="px-[10px] h-[22px] border border-[#c9ced6] bg-white" onClick={() => setPicker(false)}>Annuler</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ---------- root ----------

export const Project05Reimbursement: React.FC = () => {
  const [page, setPage] = useState<PageId>('accueil');
  const [dossiers, setDossiers] = useState<Dossier[]>(BASE_DOSSIERS);
  const [notice, setNotice] = useState('');
  const [expired, setExpired] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const idle = useRef<number | undefined>(undefined);

  const arm = () => {
    window.clearTimeout(idle.current);
    idle.current = window.setTimeout(() => setExpired(true), 6 * 60 * 1000);
  };
  useEffect(() => { arm(); return () => window.clearTimeout(idle.current); }, []);

  const go = (p: PageId) => { setPage(p); if (p === 'prestations') setFormKey((k) => k + 1); };

  const submitClaim = (montant: string) => {
    const n = 49318 + dossiers.length - 26;
    const m = Number(montant.replace(',', '.'));
    setDossiers((d) => [...d, {
      num: `DT-26/10-00${n}`, depot: '12/10/26', prest: 'PH-02', demande: `${m.toFixed(2).replace('.', ',')}`,
      remb: '-', code: 'REC. 01', detail: STATUS_DETAIL['REC. 01'],
    }]);
    setNotice(`Opération effectuée. Réf. 00${n}.`);
    setPage('accueil');
  };

  let body: React.ReactNode;
  switch (page) {
    case 'accueil': body = <Accueil notice={notice} onGo={go} />; break;
    case 'espace': body = <Espace />; break;
    case 'prestations': body = <ClaimForm key={formKey} onSubmit={submitClaim} />; break;
    case 'dossiers': body = <Dossiers rows={dossiers} />; break;
    case 'referentiel': body = <Referentiel />; break;
    case 'historique': body = <GenericPage title="Historique" text="Aucun dossier clôturé avant le 01/01/2024. Les dossiers antérieurs sont consultables auprès de votre agence." />; break;
    case 'decomptes': body = <GenericPage title="Décomptes" text="7 décomptes de remboursement sont disponibles au format PDF. Téléchargement depuis la rubrique Documents." />; break;
    case 'cotisations': body = <GenericPage title="Cotisations" text="Votre cotisation mensuelle est prélevée sur salaire. Situation à jour au 30/09/2026." />; break;
    case 'documents': body = <GenericPage title="Documents" text="2 documents en attente de signature : avenant formule 2, mandat de prélèvement." />; break;
    case 'messagerie': body = <GenericPage title="Messagerie" text="4 messages non lus. Les messages sont conservés 12 mois." />; break;
    case 'adhesion': body = <GenericPage title="Adhésion" text="Contrat n° 77-2041-B, date d'effet 01/01/2024, formule 2." />; break;
    case 'ayants': body = <GenericPage title="Ayants droit" text="Conjoint : BENNANI Salma. Enfants : EL IDRISSI Adam (2016), EL IDRISSI Lina (2019)." />; break;
    case 'declarations': body = <GenericPage title="Déclarations" text="Déclaration de changement de situation familiale ou professionnelle (mariage, naissance, changement d'employeur)." />; break;
    default: body = <GenericPage title="Assistance" text="Centre de relation adhérents : 05 22 00 00 00, du lundi au vendredi de 8h30 à 16h30." />;
  }

  return (
    <div
      className="w-[1280px] h-[800px] relative overflow-hidden bg-white flex flex-col font-sans"
      style={{ fontFamily: 'Tahoma, Verdana, Arial, sans-serif' }}
      onKeyDown={arm}
    >
      <Header />
      <div className="flex flex-1 min-h-0">
        <SideMenu page={page} onGo={go} />
        <div className="flex-1 overflow-auto bg-white">{body}</div>
      </div>
      <div className="absolute bottom-[8px] right-[12px] text-[#9ca3af]"><HelpCircle size={14} /></div>
      {expired && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-20">
          <div className="bg-white p-[20px] w-[340px] text-[13px] text-[#374151]">
            <div className="font-semibold mb-[8px]">Session terminée</div>
            <div className="mb-[14px]">Votre session a expiré. Veuillez vous reconnecter.</div>
            <button
              className="h-[28px] px-[14px] bg-[#1f4e79] text-white text-[12px]"
              onClick={() => { setExpired(false); setPage('accueil'); setFormKey((k) => k + 1); arm(); }}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
