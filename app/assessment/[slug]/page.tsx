import type { Metadata } from "next";
import SiteImage from "@/components/SiteImage";
import { notFound } from "next/navigation";
import CTAWeChat from "@/components/CTAWeChat";
import { getAllAssessments, getAssessmentBySlug, getAssessmentSlugs } from "@/lib/assessment";
import { getSiteUrl } from "@/lib/site";
import { getImageForTitle } from "@/lib/image-matcher";

type PageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return getAssessmentSlugs().map((slug) => ({ slug }));
}

function generateAssessmentKeywords(slug: string, title: string) {
  return [
    title,
    `${title}评估`,
    `${title}原因`,
    `${title}改善`,
    `${title}训练`,
    `${title}怎么矫正`,
    "体态评估",
    "体态矫正",
    "7天训练方案",
    ...slug.split("-").filter(Boolean)
  ];
}

function getPageKeywords(slug: string, title: string, markdownKeywords: string[]) {
  return Array.from(new Set([...markdownKeywords, ...generateAssessmentKeywords(slug, title)].filter(Boolean)));
}

function getRelatedAssessments(slug: string, title: string, keywords: string[]) {
  const currentTokens = new Set([title, ...keywords, ...slug.split("-")].filter(Boolean));

  return getAllAssessments()
    .filter((item) => item.slug !== slug)
    .map((item) => {
      const itemTokens = [item.title, ...item.sections.keywords, ...item.slug.split("-")].filter(Boolean);
      const score = itemTokens.reduce((total, token) => total + (currentTokens.has(token) ? 2 : 0), 0);
      return { item, score };
    })
    .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title, "zh-CN"))
    .slice(0, 3)
    .map(({ item }) => item);
}

function getSelfTests(title: string) {
  return [
    `拍一张自然站立侧面照，观察${title}相关位置是否明显偏离身体中线。`,
    "记录肩颈、腰背或膝踝是否在久坐、站久、训练后更明显。",
    "做一次轻柔动作测试，观察活动范围、紧张感和左右差异。"
  ];
}

function getCommonMistakes() {
  return [
    "只做拉伸，不做稳定和控制训练。",
    "动作幅度过大，训练后反而更酸、更紧。",
    "忽略坐姿、屏幕高度、呼吸和日常动作习惯。"
  ];
}

function getSuitablePeople(title: string) {
  return [
    `想先判断自己是否存在${title}相关体态问题的人。`,
    "长期久坐、低头看手机、电脑办公或训练后容易酸胀的人。",
    "希望获得基础动作清单和7天训练安排的人。"
  ];
}

function getMedicalWarnings() {
  return [
    "出现麻木、放射痛、明显无力或夜间疼痛时，建议及时就医。",
    "近期有外伤、手术史或症状快速加重时，不建议自行强行训练。",
    "训练中疼痛持续升高，应停止动作并寻求专业评估。"
  ];
}

export function generateMetadata({ params }: PageProps): Metadata {
  const assessment = getAssessmentBySlug(params.slug);

  if (!assessment) {
    return {
      title: "体态评估页面未找到",
      description: "该体态评估页面不存在，请返回体态评估列表查看其他问题。"
    };
  }

  const title = `${assessment.title}评估与改善方案`;
  const description = assessment.description;
  const pagePath = `/assessment/${assessment.slug}/`;
  const pageUrl = `${getSiteUrl()}${pagePath}`;
  const imageSrc = getImageForTitle(assessment.title, assessment.slug);

  return {
    title,
    description,
    keywords: getPageKeywords(assessment.slug, assessment.title, assessment.sections.keywords),
    alternates: {
      canonical: pagePath
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: pageUrl,
      siteName: "每日运动解剖分享",
      locale: "zh_CN",
      images: imageSrc ? [{ url: imageSrc, alt: `${assessment.title}体态评估图片` }] : undefined
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: imageSrc ? [imageSrc] : undefined
    }
  };
}

export default function AssessmentDetailPage({ params }: PageProps) {
  const assessment = getAssessmentBySlug(params.slug);

  if (!assessment) {
    notFound();
  }

  const imageSrc = getImageForTitle(assessment.title, assessment.slug);
  const pageKeywords = getPageKeywords(assessment.slug, assessment.title, assessment.sections.keywords);
  const related = getRelatedAssessments(assessment.slug, assessment.title, pageKeywords);
  const pageUrl = `${getSiteUrl()}/assessment/${assessment.slug}/`;
  const modules = [
    ["问题表现", assessment.sections.symptoms],
    ["常见原因", assessment.sections.causes],
    ["自测方法", getSelfTests(assessment.title)],
    ["改善动作", assessment.sections.actions],
    ["常见错误", getCommonMistakes()],
    ["适合人群", getSuitablePeople(assessment.title)],
    ["什么时候需要就医", getMedicalWarnings()],
    ["免费领取7天训练方案", ["添加微信后发送关键词「体态评估」，领取体态自测表、基础动作清单和7天改善训练方案。"]]
  ];
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: `${assessment.title}评估与改善方案`,
        description: assessment.description,
        url: pageUrl,
        image: imageSrc,
        inLanguage: "zh-CN",
        keywords: pageKeywords.join(", "),
        author: {
          "@type": "Organization",
          name: "每日运动解剖分享"
        },
        publisher: {
          "@type": "Organization",
          name: "每日运动解剖分享"
        }
      },
      {
        "@type": "FAQPage",
        mainEntity: assessment.sections.faqs.slice(0, 3).map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer
          }
        }))
      }
    ]
  };

  return (
    <main className="bg-[linear-gradient(180deg,#eef5ff_0%,#ffffff_260px)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <article className="mx-auto max-w-6xl px-5 py-10">
        <nav className="text-sm font-semibold text-body">
          <a href="/assessment/" className="hover:text-jade">
            体态自测
          </a>
          <span className="px-2">/</span>
          <span>{assessment.title}</span>
        </nav>

        <section className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.88fr] lg:items-stretch">
          <div className="rounded-3xl border border-line bg-white p-6 shadow-sm lg:p-8">
            <p className="text-sm font-black text-jade">体态问题解析</p>
            <h1 className="mt-3 text-4xl font-black leading-tight text-ink lg:text-5xl">
              {assessment.title}
              <br />
              评估与改善方案
            </h1>
            <p className="mt-5 text-lg leading-8 text-body">{assessment.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {pageKeywords.slice(0, 8).map((keyword) => (
                <span key={keyword} className="rounded-full bg-panel px-3 py-1 text-xs font-bold text-jade">
                  {keyword}
                </span>
              ))}
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl border border-line bg-white p-3 shadow-sm">
            <SiteImage
              src={imageSrc}
              alt={`${assessment.title}体态评估图片`}
              width={900}
              height={620}
              priority
              className="h-full min-h-80 w-full rounded-2xl object-cover"
            />
          </div>
        </section>

        <section className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="space-y-5">
            <section className="rounded-3xl border border-line bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-black text-ink">深度分析</h2>
              <p className="mt-4 leading-8 text-body">{assessment.sections.detail}</p>
            </section>

            {modules.map(([title, items], index) => (
              <DetailModule key={title as string} index={index + 1} title={title as string} items={items as string[]} />
            ))}

            <section className="rounded-3xl border border-line bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-black text-ink">常见问题</h2>
              <div className="mt-5 space-y-4">
                {assessment.sections.faqs.slice(0, 3).map((faq) => (
                  <div key={faq.question} className="rounded-2xl border border-line bg-panel p-5">
                    <h3 className="text-lg font-black text-moss">{faq.question}</h3>
                    <p className="mt-3 leading-7 text-body">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-line bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-black text-ink">相关页面推荐</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {related.map((item) => {
                  const relatedImageSrc = getImageForTitle(item.title, item.slug);
                  return (
                    <a
                      key={item.slug}
                      href={`/assessment/${item.slug}/`}
                      className="group overflow-hidden rounded-2xl border border-line bg-white transition hover:-translate-y-1 hover:shadow-md"
                    >
                      <SiteImage
                        src={relatedImageSrc}
                        alt={`${item.title}体态评估图片`}
                        width={900}
                        height={620}
                        className="aspect-[16/10] w-full object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-black text-ink group-hover:text-jade">{item.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-body">{item.description}</p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </section>
          </div>

          <aside className="space-y-5">
            <CTAWeChat source={assessment.title} conversionScore={1} />
            <section className="rounded-3xl border border-line bg-white p-5 shadow-sm">
              <h2 className="text-lg font-black text-ink">推荐阅读</h2>
              <div className="mt-4 grid gap-3">
                {related.map((item) => (
                  <a
                    key={item.slug}
                    href={`/assessment/${item.slug}/`}
                    className="rounded-2xl border border-line bg-panel px-4 py-3 text-sm font-bold text-body transition hover:border-jade hover:text-jade"
                  >
                    {item.title}
                  </a>
                ))}
              </div>
            </section>
          </aside>
        </section>
      </article>
    </main>
  );
}

function DetailModule({ index, title, items }: { index: number; title: string; items: string[] }) {
  return (
    <section className="rounded-3xl border border-line bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-sm font-black text-ink">
          {String(index).padStart(2, "0")}
        </span>
        <h2 className="text-2xl font-black text-ink">{title}</h2>
      </div>
      <div className="mt-5 grid gap-3">
        {items.map((item) => (
          <p key={item} className="border-l-4 border-jade rounded-2xl bg-panel px-4 py-3 leading-7 text-body">
            {item}
          </p>
        ))}
      </div>
    </section>
  );
}
