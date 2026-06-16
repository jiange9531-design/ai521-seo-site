import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CTAWeChat from "@/components/CTAWeChat";
import { getAllAssessments, getAssessmentBySlug, getAssessmentSlugs } from "@/lib/assessment";
import { getSiteUrl } from "@/lib/site";
import { getTopicImage } from "@/lib/topic-images";

type PageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return getAssessmentSlugs().map((slug) => ({ slug }));
}

function generateAssessmentKeywords(slug: string, title: string) {
  const slugWords = slug.split("-").filter(Boolean);

  return [
    title,
    `${title}评估`,
    `${title}原因`,
    `${title}改善`,
    `${title}训练`,
    `${title}怎么矫正`,
    "体态评估",
    "体态矫正",
    "体态改善资料包",
    "免费体态测试",
    ...slugWords,
    slugWords.join(" ")
  ].filter(Boolean);
}

function getPageKeywords(slug: string, title: string, markdownKeywords: string[]) {
  return Array.from(new Set([...markdownKeywords, ...generateAssessmentKeywords(slug, title)]));
}

function getRelatedAssessments(slug: string, title: string, keywords: string[]) {
  const currentTokens = new Set([title, ...keywords, ...slug.split("-")].filter(Boolean));

  return getAllAssessments()
    .filter((item) => item.slug !== slug)
    .map((item) => {
      const itemTokens = [item.title, ...item.sections.keywords, ...item.slug.split("-")].filter(Boolean);
      const score = itemTokens.reduce(
        (total, token) =>
          total + (currentTokens.has(token) ? 2 : keywords.some((keyword) => keyword.includes(token) || token.includes(keyword)) ? 1 : 0),
        0
      );

      return { item, score };
    })
    .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title, "zh-CN"))
    .slice(0, 3)
    .map(({ item }) => item);
}

function getSelfTests(title: string) {
  return [
    `拍一张自然站立侧面照，观察${title}相关位置是否明显偏离中线。`,
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
  const baseUrl = getSiteUrl();

  if (!assessment) {
    return {
      title: "体态评估页面未找到",
      description: "该体态评估页面不存在，请返回体态评估列表查看其他问题。"
    };
  }

  const pagePath = `/assessment/${assessment.slug}/`;
  const pageUrl = `${baseUrl}${pagePath}`;
  const title = `${assessment.title}评估与改善方案｜体态问题解析`;
  const keywords = getPageKeywords(assessment.slug, assessment.title, assessment.sections.keywords);

  return {
    title,
    description: assessment.description,
    keywords,
    alternates: {
      canonical: pagePath
    },
    openGraph: {
      title,
      description: assessment.description,
      type: "article",
      url: pageUrl,
      siteName: "体态评估中心",
      locale: "zh_CN"
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: assessment.description
    }
  };
}

export default function AssessmentDetailPage({ params }: PageProps) {
  const assessment = getAssessmentBySlug(params.slug);

  if (!assessment) {
    notFound();
  }

  const pageKeywords = getPageKeywords(assessment.slug, assessment.title, assessment.sections.keywords);
  const related = getRelatedAssessments(assessment.slug, assessment.title, pageKeywords);
  const topicImage = getTopicImage(assessment.slug, assessment.title);
  const baseUrl = getSiteUrl();
  const pageUrl = `${baseUrl}/assessment/${assessment.slug}/`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: `${assessment.title}评估与改善方案`,
        description: assessment.description,
        url: pageUrl,
        inLanguage: "zh-CN",
        keywords: pageKeywords.join(", "),
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": pageUrl
        },
        author: {
          "@type": "Organization",
          name: "体态评估中心"
        },
        publisher: {
          "@type": "Organization",
          name: "体态评估中心"
        },
        about: pageKeywords.slice(0, 8),
        articleSection: ["问题表现", "常见原因", "自测方法", "改善动作", "常见错误", "适合人群", "什么时候需要就医"],
        potentialAction: {
          "@type": "CommunicateAction",
          name: "添加微信领取7天体态改善训练表",
          target: "Wi985211DX"
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
    <main className="mx-auto max-w-6xl px-5 py-8 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      <article className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div>
          <nav className="text-sm text-ink/55">
            <a href="/assessment/">体态评估</a>
            <span className="px-2">/</span>
            <span>{assessment.title}</span>
          </nav>

          <h1 className="mt-5 text-3xl font-black leading-tight text-ink sm:text-4xl">{assessment.title}：表现、原因与改善动作</h1>
          <p className="mt-4 text-base leading-7 text-ink/70 sm:text-lg sm:leading-8">{assessment.description}</p>
          <img src={topicImage.src} alt={topicImage.alt} className="mt-6 aspect-[16/9] w-full rounded-lg border border-line bg-mint object-cover shadow-sm" />
          <div className="mt-5 flex flex-wrap gap-2">
            {pageKeywords.slice(0, 8).map((keyword) => (
              <span key={keyword} className="rounded-full border border-line bg-white px-3 py-1 text-xs font-medium text-ink/65">
                {keyword}
              </span>
            ))}
          </div>

          <DetailSection title="问题表现" items={assessment.sections.symptoms} />

          <section className="mt-8">
            <h2 className="text-2xl font-black text-ink">常见原因</h2>
            <p className="mt-3 leading-7 text-ink/70">{assessment.sections.detail}</p>
            <List items={assessment.sections.causes} />
          </section>

          <DetailSection title="自测方法" items={getSelfTests(assessment.title)} />

          <section className="mt-8">
            <h2 className="text-2xl font-black text-ink">改善动作</h2>
            <p className="mt-3 leading-7 text-ink/70">
              先用低强度动作建立控制感，再逐步增加训练难度。训练过程中记录疼痛、活动度和姿势变化，避免只追求次数。
            </p>
            <ol className="mt-4 space-y-3">
              {assessment.sections.actions.map((item, index) => (
                <li key={item} className="rounded-md border border-line bg-white p-4 text-ink/75">
                  <strong className="mr-2 text-jade">{index + 1}.</strong>
                  {item}
                </li>
              ))}
            </ol>
          </section>

          <DetailSection title="常见错误" items={getCommonMistakes()} />
          <DetailSection title="适合人群" items={getSuitablePeople(assessment.title)} />
          <DetailSection title="什么时候需要就医" items={getMedicalWarnings()} />

          <section className="mt-8">
            <h2 className="text-2xl font-black text-ink">免费领取7天训练方案</h2>
            <div className="mt-4">
              <CTAWeChat source={assessment.title} conversionScore={1} />
            </div>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-black text-ink">常见问题</h2>
            <div className="mt-4 space-y-4">
              {assessment.sections.faqs.slice(0, 3).map((faq) => (
                <section key={faq.question} className="rounded-lg border border-line bg-white p-5">
                  <h3 className="text-lg font-bold text-ink">{faq.question}</h3>
                  <p className="mt-3 leading-7 text-ink/70">{faq.answer}</p>
                </section>
              ))}
            </div>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-black text-ink">相关推荐</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {related.map((item) => (
                <a key={item.slug} href={`/assessment/${item.slug}/`} className="rounded-lg border border-line bg-white p-5 transition hover:border-jade">
                  <h3 className="text-lg font-bold text-ink">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-ink/70">{item.description}</p>
                </a>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-5">
          <CTAWeChat source={assessment.title} />
          <section className="rounded-lg border border-line bg-white p-5">
            <h2 className="text-lg font-bold text-ink">相关体态问题</h2>
            <div className="mt-4 space-y-3">
              {related.map((item) => (
                <a key={item.slug} href={`/assessment/${item.slug}/`} className="block rounded-md border border-line px-4 py-3 text-sm font-medium text-ink/75 hover:border-jade hover:text-jade">
                  {item.title}
                </a>
              ))}
            </div>
          </section>
        </aside>
      </article>
    </main>
  );
}

function DetailSection({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="mt-8">
      <h2 className="text-2xl font-black text-ink">{title}</h2>
      <List items={items} />
    </section>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-3">
      {items.map((item) => (
        <li key={item} className="rounded-md border border-line bg-white p-4 text-ink/75">
          {item}
        </li>
      ))}
    </ul>
  );
}
