import type { Metadata } from "next";
import SiteImage from "@/components/SiteImage";
import CTAWeChat from "@/components/CTAWeChat";
import { getAllAssessments } from "@/lib/assessment";
import { getAssessmentImageSrc } from "@/lib/site-images";

export const metadata: Metadata = {
  title: "体态自测项目大全：头前伸、圆肩、骨盆前倾、膝内扣",
  description: "在线查看常见体态问题表现、原因与改善动作，包含头前伸、圆肩、骨盆前倾、翼状肩胛、膝内扣等评估页面。"
};

export default function AssessmentIndexPage() {
  const assessments = getAllAssessments();

  return (
    <main className="bg-[linear-gradient(180deg,#eef5ff_0%,#ffffff_280px)]">
      <section className="mx-auto max-w-6xl px-5 py-12">
        <p className="text-sm font-black text-jade">体态自测</p>
        <h1 className="mt-3 text-4xl font-black leading-tight text-ink">体态自测项目大全</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-body">
          选择最接近你的问题，查看表现、常见原因、改善动作和注意事项，再领取对应的7天训练方案。
        </p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {assessments.slice(0, 60).map((item) => {
            const imageSrc = getAssessmentImageSrc(item.slug, item.title);
            return (
              <a
                key={item.slug}
                href={`/assessment/${item.slug}/`}
                className="group overflow-hidden rounded-3xl border border-line bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <SiteImage
                  src={imageSrc}
                  alt={`${item.title}体态评估图片`}
                  width={900}
                  height={620}
                  className="aspect-[16/10] w-full object-cover"
                />
                <div className="p-5">
                  <h2 className="text-xl font-black text-ink group-hover:text-jade">{item.title}</h2>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-body">{item.description}</p>
                  <span className="mt-4 inline-flex rounded-full bg-accent px-4 py-2 text-sm font-black text-ink">
                    查看改善方案
                  </span>
                </div>
              </a>
            );
          })}
        </div>

        <div className="mt-10">
          <CTAWeChat source="体态自测列表" conversionScore={1} />
        </div>
      </section>
    </main>
  );
}
