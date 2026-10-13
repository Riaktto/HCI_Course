/**
 * Backend settings (Supabase).
 *
 * The project URL and the "anon" key are PUBLIC by design: they only identify the project. All protection
 * is enforced by the database itself (row-level security, see supabase/schema.sql): anyone can read the
 * public overview, only the teacher's verified e-mail can read or change the roster and the progress.
 *
 * Until the two values below are filled in, the app runs normally but teacher mode stays locked and the
 * project pages show no team or progress information.
 */

/** The only e-mail address allowed to sign in (also enforced server side by the database policies). */
export const TEACHER_EMAIL = 'yassine.benaboud@gmail.com';

const PLACEHOLDER_URL = 'https://YOUR-PROJECT-REF.supabase.co';
const PLACEHOLDER_KEY = 'YOUR-ANON-KEY';

/** The course's Supabase project. The publishable key is meant to be public (it is not the secret key). */
const PROJECT_URL = 'https://kkxntyuihkpiswyuonam.supabase.co';
const PUBLISHABLE_KEY = 'sb_publishable_ccmi4x9glRN99JLKooSVTQ_B--f37nq';

/** Defaults to the course project; the VITE_ variables only exist for local testing. */
export const BACKEND_URL: string = (import.meta.env.VITE_BACKEND_URL as string | undefined) || PROJECT_URL;
export const BACKEND_ANON_KEY: string = (import.meta.env.VITE_BACKEND_ANON_KEY as string | undefined) || PUBLISHABLE_KEY;

export const isBackendConfigured = (): boolean =>
  BACKEND_URL !== PLACEHOLDER_URL && BACKEND_ANON_KEY !== PLACEHOLDER_KEY && /^https?:\/\//.test(BACKEND_URL);
