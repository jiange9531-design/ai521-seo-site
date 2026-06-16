export type TopicImage = {
  src: string;
  alt: string;
};

const topicImages: Record<string, TopicImage> = {
  forward: {
    src: "/images/topics/forward-head.svg",
    alt: "头前伸体态侧面示意图"
  },
  neck: {
    src: "/images/topics/forward-head.svg",
    alt: "肩颈前倾体态示意图"
  },
  rounded: {
    src: "/images/topics/rounded-shoulder.svg",
    alt: "圆肩含胸体态示意图"
  },
  shoulder: {
    src: "/images/topics/rounded-shoulder.svg",
    alt: "肩颈圆肩体态示意图"
  },
  pelvic: {
    src: "/images/topics/pelvic-tilt.svg",
    alt: "骨盆前倾体态示意图"
  },
  knee: {
    src: "/images/topics/knee-valgus.svg",
    alt: "膝内扣下肢力线示意图"
  },
  valgus: {
    src: "/images/topics/knee-valgus.svg",
    alt: "膝内扣改善训练示意图"
  },
  scapular: {
    src: "/images/topics/scapular-winging.svg",
    alt: "翼状肩胛背面示意图"
  }
};

export const defaultTopicImage: TopicImage = {
  src: "/images/topics/posture-general.svg",
  alt: "体态评估与训练示意图"
};

export function getTopicImage(slug: string, title = "") {
  const text = `${slug} ${title}`.toLowerCase();
  const matchedKey = Object.keys(topicImages).find((key) => text.includes(key));

  return matchedKey ? topicImages[matchedKey] : defaultTopicImage;
}
