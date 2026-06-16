import { aggregateStats, appendEvent, readEvents, type AnalyticsEvent } from "@/lib/analytics/store";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

function hasSupabaseConfig() {
  return Boolean(supabaseUrl && supabaseServiceRoleKey);
}

function toSupabaseRow(event: AnalyticsEvent) {
  return {
    session_id: event.sessionId,
    type: event.type,
    page: event.page,
    tier: event.tier,
    viral_score: event.viralScore,
    referrer: event.referrer ?? null,
    user_agent: event.userAgent ?? null,
    timestamp: event.timestamp
  };
}

function fromSupabaseRow(row: Record<string, unknown>): AnalyticsEvent {
  return {
    type: row.type as AnalyticsEvent["type"],
    page: String(row.page ?? "/unknown"),
    sessionId: String(row.session_id ?? "anonymous"),
    tier: Number(row.tier ?? 0),
    viralScore: Number(row.viral_score ?? 0),
    timestamp: Number(row.timestamp ?? Date.now()),
    referrer: typeof row.referrer === "string" ? row.referrer : undefined,
    userAgent: typeof row.user_agent === "string" ? row.user_agent : undefined
  };
}

async function fetchSupabase(path: string, init?: RequestInit) {
  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error("Missing Supabase environment variables");
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: supabaseServiceRoleKey,
      Authorization: `Bearer ${supabaseServiceRoleKey}`,
      "Content-Type": "application/json",
      ...(init?.headers ?? {})
    },
    cache: "no-store"
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Supabase request failed: ${response.status} ${error}`);
  }

  return response;
}

export async function readStoredEvents() {
  if (!hasSupabaseConfig()) {
    return readEvents();
  }

  const response = await fetchSupabase("analytics_events?select=*&order=created_at.desc&limit=5000");
  const rows = (await response.json()) as Record<string, unknown>[];

  return rows.map(fromSupabaseRow);
}

export async function aggregateStoredStats() {
  return aggregateStats(await readStoredEvents());
}

export async function hasDuplicateEvent(event: AnalyticsEvent) {
  if (!hasSupabaseConfig()) {
    const key = `${event.sessionId}-${event.type}-${event.page}`;
    return readEvents().some((item) => `${item.sessionId}-${item.type}-${item.page}` === key);
  }

  const params = new URLSearchParams({
    select: "id",
    session_id: `eq.${event.sessionId}`,
    type: `eq.${event.type}`,
    page: `eq.${event.page}`,
    limit: "1"
  });
  const response = await fetchSupabase(`analytics_events?${params.toString()}`);
  const rows = (await response.json()) as unknown[];

  return rows.length > 0;
}

export async function storeEvent(event: AnalyticsEvent) {
  if (!hasSupabaseConfig()) {
    return appendEvent(event);
  }

  await fetchSupabase("analytics_events", {
    method: "POST",
    headers: {
      Prefer: "return=minimal"
    },
    body: JSON.stringify(toSupabaseRow(event))
  });

  return aggregateStoredStats();
}
