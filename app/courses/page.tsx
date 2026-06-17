import type { Metadata } from "next";
import SiteImage from "@/components/SiteImage";
import { siteImages } from "@/lib/site-images";

export const metadata: Metadata = {
  title: "体态改善训练方案",
  description: "按照先评估、再训练、再反馈的顺序，建立更安全的体态改善路径。"
};

const courses = [
  {
    title: "7天体态改善入门计划",
    desc: "适合刚开始自测的人，用7天建立肩颈、胸椎、骨盆和下肢的基础控制。",
    image: siteImages.services.rehabTraining,
    href: "/contact/"
  },
  {
    title: "肩颈体态改善专题",
    desc: "围绕头前伸、圆肩、肩颈僵硬，安排放松、激活和肩胛稳定训练。",
    image: siteImages.services.neckShoulder,
    href: "/assessment/001-neck-forward-how-to-correct/"
  },
  {
    title: "骨盆与下肢力线专题",
    desc: "针对骨盆前倾、膝内扣和站姿不稳，建立核心、臀腿和足弓控制。",
    image: siteImages.services.pelvisLeg,
    href: "/assessment/026-pelvic-tilt/"
  }
];

export default function CoursesPage() {
  return (
    <main className="bg-[linear-gradient(180deg,#eef5ff_0%,#ffffff_260px)]">
      <section className="mx-auto max-w-6xl px-5 py-12">
        <p className="text-sm font-black text-jade">训练方案</p>
        <h1 className="mt-3 text-4xl font-black text-ink">体态改善训练方案</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-body">
          按照“先评估、再训练、再反馈”的顺序，帮你建立更安全的改善路径。
        </p>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {courses.map((course) => (
            <a
              key={course.title}
              href={course.href}
              className="group overflow-hidden rounded-3xl border border-line bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <SiteImage src={course.image} alt={course.title} width={900} height={560} className="aspect-[16/10] w-full object-cover" />
              <div className="p-6">
                <h2 className="text-xl font-black text-ink group-hover:text-jade">{course.title}</h2>
                <p className="mt-3 leading-7 text-body">{course.desc}</p>
                <span className="mt-5 inline-flex rounded-full bg-accent px-4 py-2 text-sm font-black text-ink">
                  查看方案
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
