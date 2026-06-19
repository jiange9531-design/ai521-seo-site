import CTAButtons from "@/components/CTAButtons";
import { getGlobalCTA } from "@/lib/assessment";

type CTAWeChatProps = {
  source?: string;
  conversionScore?: 1 | 0.5;
  compact?: boolean;
};

export default function CTAWeChat({ source = "体态评估入口", conversionScore = 0.5, compact = false }: CTAWeChatProps) {
  const cta = getGlobalCTA();

  return (
    <section className="rounded-2xl border border-line bg-white p-5 shadow-sm">
      <div className="rounded-xl bg-panel p-5">
        <p className="text-sm font-black text-jade">统一付费入口</p>
        <h2 className="mt-2 text-2xl font-black leading-tight text-ink">{cta.ctaTitle}</h2>
        <p className="mt-3 text-sm leading-6 text-body">{cta.ctaDesc}</p>
      </div>

      {!compact && (
        <ul className="mt-4 grid gap-2 text-sm text-body sm:grid-cols-2">
          {["体态自测表", "7天训练表", "基础动作清单", "常见错误提醒"].map((item) => (
            <li key={item} className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-accent" />
              {item}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-line bg-white px-4 py-3">
          <span className="block text-xs text-body">下一步</span>
          <strong className="mt-1 block text-lg text-jade">先查看9.9元计划</strong>
        </div>
        <CTAButtons source={source} conversionScore={conversionScore} buttonText={cta.buttonText} />
      </div>
    </section>
  );
}
