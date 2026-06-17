export type TopicImage = {
  src: string;
  alt: string;
};

export const defaultTopicImage: TopicImage = {
  src: "/images/hero/hero-posture-assessment.jpg",
  alt: "体态评估与训练指导"
};

const exactImages: Record<string, TopicImage> = {
  "forward-head": {
    src: "/images/posture/posture-forward-head.jpg",
    alt: "头前伸体态评估示意图"
  },
  "rounded-shoulder": {
    src: "/images/posture/posture-rounded-shoulder.jpg",
    alt: "圆肩体态评估示意图"
  },
  "pelvic-tilt": {
    src: "/images/posture/posture-pelvic-tilt.jpg",
    alt: "骨盆前倾体态评估示意图"
  },
  "scapular-winging": {
    src: "/images/posture/posture-scapular-winging.jpg",
    alt: "翼状肩胛体态评估示意图"
  },
  "knee-valgus": {
    src: "/images/posture/posture-knee-valgus.jpg",
    alt: "膝内扣下肢力线评估示意图"
  },
  "high-low-shoulder": {
    src: "/images/posture/posture-high-low-shoulder.jpg",
    alt: "高低肩体态评估示意图"
  },
  "neck-stiffness": {
    src: "/images/posture/posture-neck-stiff.jpg",
    alt: "肩颈僵硬评估示意图"
  }
};

const fuzzyImages: Record<string, TopicImage> = {
  forward: exactImages["forward-head"],
  neck: exactImages["neck-stiffness"],
  cervical: exactImages["neck-stiffness"],
  rounded: exactImages["rounded-shoulder"],
  shoulder: exactImages["rounded-shoulder"],
  pelvic: exactImages["pelvic-tilt"],
  knee: exactImages["knee-valgus"],
  valgus: exactImages["knee-valgus"],
  scapular: exactImages["scapular-winging"]
};

export function getTopicImage(slug: string, title = "") {
  if (exactImages[slug]) {
    return exactImages[slug];
  }

  const text = `${slug} ${title}`.toLowerCase();
  const matchedKey = Object.keys(fuzzyImages).find((key) => text.includes(key));

  return matchedKey ? fuzzyImages[matchedKey] : defaultTopicImage;
}
