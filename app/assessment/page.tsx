import type { Metadata } from "next";
import CTAWeChat from "@/components/CTAWeChat";
import { getAllAssessments } from "@/lib/assessment";

export const metadata: Metadata = {
  title: "体态评估项目大全：头前伸、圆肩、骨盆前倾、膝内扣",
  description: "在线查看常见体态问题表现、原因与改善动作，包含头前伸、圆肩、骨盆前倾、翼状肩胛、膝内扣等评估页面。"
};

export default function AssessmentIndexPage() {
  const assessments = getAllAssessments();

  return (
    <main className="mx-auto max-w-6xl px-5 py-12">
      <h1 className="text-4xl font-bold text-ink">体态评估项目大全</h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-ink/70">
        选择你最接近的问题，查看表现、原因、改善动作，并通过微信领取免费体态评估和资料包。
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {assessments.map((item) => (
          <a key={item.slug} href={`/assessment/${item.slug}/`} className="rounded-lg border border-line bg-white p-6 shadow-sm transition hover:border-jade">
            <h2 className="text-xl font-bold text-ink">{item.title}</h2>
            <p className="mt-3 text-sm leading-6 text-ink/70">{item.description}</p>
          </a>
        ))}
      </div>

      <div className="mt-10">
        <CTAWeChat source="体态评估列表" />
      </div>
    </main>
  );
}
