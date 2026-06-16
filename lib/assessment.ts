import fs from "node:fs";
import path from "node:path";

export type AssessmentContent = {
  slug: string;
  title: string;
  description: string;
  sections: {
    symptoms: string[];
    causes: string[];
    detail: string;
    actions: string[];
    faqs: {
      question: string;
      answer: string;
    }[];
    keywords: string[];
    wechat: string;
  };
};

const contentDir = path.join(process.cwd(), "content", "assessment");

function readSection(markdown: string, heading: string) {
  const pattern = new RegExp(`## ${heading}\\n([\\s\\S]*?)(?=\\n## |$)`);
  return markdown.match(pattern)?.[1].trim() ?? "";
}

function readList(markdown: string, heading: string) {
  return readSection(markdown, heading)
    .split("\n")
    .map((line) => line.replace(/^[-*]\s+/, "").trim())
    .filter(Boolean);
}

function readFaqs(markdown: string, title: string) {
  const faqSection = readSection(markdown, "FAQ");
  const matches = [...faqSection.matchAll(/###\s+(.+)\n([\s\S]*?)(?=\n### |$)/g)];
  const parsedFaqs = matches
    .map((match) => ({
      question: match[1].trim(),
      answer: match[2].trim()
    }))
    .filter((item) => item.question && item.answer);

  if (parsedFaqs.length >= 3) {
    return parsedFaqs;
  }

  return [
    {
      question: `${title}多久能看到改善？`,
      answer: "通常需要先降低紧张感，再建立稳定控制。多数人坚持1到2周会感到动作更顺，外观和疼痛变化通常需要4到8周持续观察。"
    },
    {
      question: `${title}可以自己在家训练吗？`,
      answer: "可以先做低强度自测和基础训练，但如果出现麻木、放射痛、急性损伤或症状加重，应优先线下就医评估。"
    },
    {
      question: `${title}为什么容易反复？`,
      answer: "体态问题常和日常姿势、呼吸、核心控制和动作习惯有关。只拉伸不重建发力模式，身体容易回到原来的代偿状态。"
    }
  ];
}

function buildDefaultDetail(title: string) {
  return `${title}属于常见体态问题，通常不是单一肌肉紧张造成，而是姿势习惯、关节活动度、稳定肌群控制和日常动作模式共同影响。评估时建议先看正面、侧面和背面站姿，再结合久坐、训练、走路、上下楼等场景判断问题来源。很多人只做拉伸，短期觉得轻松，但很快又恢复原状，原因是身体没有建立新的控制能力。更稳妥的顺序是先降低过度紧张，再激活弱化肌群，最后把正确排列带回坐姿、站姿和训练动作。页面内容适合做初步自查，不替代医疗诊断。如果已经有持续疼痛、麻木、力量下降或急性损伤，需要先做线下专业评估。`;
}

export function getAssessmentSlugs() {
  if (!fs.existsSync(contentDir)) {
    return [];
  }

  return fs
    .readdirSync(contentDir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

export function getAssessmentBySlug(slug: string): AssessmentContent | null {
  const filePath = path.join(contentDir, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const markdown = fs.readFileSync(filePath, "utf8");
  const title = markdown.match(/^#\s+(.+)$/m)?.[1].trim() ?? slug;
  const symptoms = readList(markdown, "问题表现");
  const causes = readList(markdown, "原因");
  const detail = readSection(markdown, "深度解析") || buildDefaultDetail(title);
  const actions = readList(markdown, "改善动作");
  const faqs = readFaqs(markdown, title);
  const keywords = readList(markdown, "关键词");
  const wechat = readSection(markdown, "微信引流提示");
  const description =
    symptoms[0] ??
    `${title}的表现、常见原因和可执行改善动作，适合需要体态评估和纠正训练的人群。`;

  return {
    slug,
    title,
    description,
    sections: {
      symptoms,
      causes,
      detail,
      actions,
      faqs,
      keywords,
      wechat
    }
  };
}

export function getAllAssessments() {
  return getAssessmentSlugs()
    .map((slug) => getAssessmentBySlug(slug))
    .filter((item): item is AssessmentContent => Boolean(item));
}
