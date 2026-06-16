export function isBot(userAgent: string) {
  const bots = [
    "bot",
    "crawler",
    "spider",
    "headless"
  ];

  return bots.some((bot) => userAgent?.toLowerCase().includes(bot));
}
