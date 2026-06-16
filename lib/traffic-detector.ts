import { isBot } from "@/lib/analytics/bot-filter";

export function detectTrafficSource({
  referrer,
  userAgent
}: {
  referrer?: string;
  userAgent?: string;
}) {
  const value = referrer ?? "";
  const lowerReferrer = value.toLowerCase();

  return {
    google: lowerReferrer.includes("google."),
    direct: !value,
    bot: isBot(userAgent ?? ""),
    referral: value || "direct"
  };
}

export function classifyUserAgent(userAgent?: string) {
  if (!userAgent) return "unknown";
  if (isBot(userAgent)) return "bot";
  if (/mobile|android|iphone/i.test(userAgent)) return "mobile";
  return "desktop";
}
