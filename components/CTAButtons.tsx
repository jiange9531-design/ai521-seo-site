type CTAButtonsProps = {
  source: string;
  conversionScore: 1 | 0.5;
  buttonText: string;
};

export default function CTAButtons(_: CTAButtonsProps) {
  return (
    <a
      href="/assessment/"
      className="inline-flex min-h-12 items-center justify-center rounded-xl bg-jade px-5 py-3 text-center text-sm font-black text-white shadow-sm transition hover:bg-moss"
    >
      领取专属修复方案（9.9）
    </a>
  );
}
