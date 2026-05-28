// Best-effort, dependency-free in-memory rate limiter.
// NOTE: state lives in a per-instance Map, so on serverless platforms each
// instance/region/cold-start has its own counters. This is NOT a globally
// accurate limiter — it only mitigates abuse from a single warm instance.
// For strict cross-instance limits, back this with a shared store (e.g. Redis).

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

/**
 * Extracts the client IP from a request using the first hop of the
 * x-forwarded-for header. Falls back to "unknown" when unavailable.
 */
export function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const first = forwardedFor.split(",")[0]?.trim();
    if (first) {
      return first;
    }
  }
  return "unknown";
}

/**
 * Fixed-window rate limiter. Returns whether the request is allowed and, when
 * blocked, how many seconds until the window resets (retryAfter).
 */
export function rateLimit(
  key: string,
  opts: { limit: number; windowMs: number }
): { ok: boolean; retryAfter: number } {
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || now >= existing.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + opts.windowMs });
    return { ok: true, retryAfter: 0 };
  }

  if (existing.count < opts.limit) {
    existing.count += 1;
    return { ok: true, retryAfter: 0 };
  }

  const retryAfter = Math.max(1, Math.ceil((existing.resetAt - now) / 1000));
  return { ok: false, retryAfter };
}
