import { createClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client for trusted writes (e.g. saving registrations
 * after a verified payment).
 *
 * Prefers a service-role / secret key so inserts bypass Row Level Security and
 * never get silently rejected. Falls back to the public anon key if no secret
 * key is configured, so the flow keeps working until the secret key is added.
 *
 * NEVER import this from a client component — it is meant for route handlers
 * only.
 */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

const serviceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_SECRET_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const usingServiceRole = Boolean(
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY,
);

export const supabaseAdmin =
  supabaseUrl && serviceKey
    ? createClient(supabaseUrl, serviceKey, {
        auth: { persistSession: false, autoRefreshToken: false },
      })
    : null;
