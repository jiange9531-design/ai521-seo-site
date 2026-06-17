export const siteImages = {
  hero: {
    postureAssessment: "/images/hero/hero-posture-assessment.png"
  },

  entry: {
    problems: "/images/entry/entry-problems.png",
    analysis: "/images/entry/entry-analysis.png",
    training: "/images/entry/entry-training.png"
  },

  services: {
    postureCheck: "/images/services/service-posture-check.png",
    neckShoulder: "/images/services/service-neck-shoulder.png",
    pelvisLeg: "/images/posture/posture-pelvic-tilt.png",
    rehabTraining: "/images/services/service-rehab-training.png"
  },

  problems: {
    forwardHead: "/images/problems/problem-forward-head.png",
    roundedShoulder: "/images/problems/problem-rounded-shoulder.png",
    pelvicTilt: "/images/posture/posture-pelvic-tilt.png",
    scapularWinging: "/images/posture/posture-rounded-shoulder.png",
    kneeValgus: "/images/posture/posture-knee-valgus.png",
    highLowShoulder: "/images/posture/posture-high-low-shoulder.png",
    neckStiffness: "/images/problems/problem-forward-head.png"
  },

  posture: {
    forwardHead: "/images/posture/posture-forward-head.png",
    roundedShoulder: "/images/posture/posture-rounded-shoulder.png",
    pelvicTilt: "/images/posture/posture-pelvic-tilt.png",
    scapularWinging: "/images/posture/posture-scapular-winging.png",
    kneeValgus: "/images/posture/posture-knee-valgus.png",
    highLowShoulder: "/images/posture/posture-high-low-shoulder.png",
    neckStiffness: "/images/services/service-neck-shoulder.png"
  },

  resources: {
    header: "/images/hero/hero-posture-assessment.png",
    assessmentForm: "/images/services/service-posture-check.png",
    sevenDayPlan: "/images/services/service-rehab-training.png",
    exerciseList: "/images/entry/entry-training.png",
    wechatTemplate: "/images/entry/entry-analysis.png"
  },

  faq: {
    header: "/images/entry/entry-analysis.png",
    cta: "/images/services/service-neck-shoulder.png"
  },

  contact: {
    wechat: "/images/entry/entry-analysis.png",
    assessmentChat: "/images/services/service-posture-check.png"
  },

  cta: {
    wechatPlan: "/images/services/service-rehab-training.png"
  }
} as const;

export type SiteImageSrc = string;

const slugImageRules: Array<[string, SiteImageSrc]> = [
  ["rounded", siteImages.posture.roundedShoulder],
  ["shoulder", siteImages.posture.roundedShoulder],
  ["pelvic", siteImages.posture.pelvicTilt],
  ["knee", siteImages.posture.kneeValgus],
  ["valgus", siteImages.posture.kneeValgus],
  ["scapular", siteImages.posture.scapularWinging],
  ["forward", siteImages.posture.forwardHead],
  ["cervical", siteImages.posture.neckStiffness],
  ["neck", siteImages.posture.neckStiffness]
];

export function getAssessmentImageSrc(slug: string, title = "") {
  if (slug === "forward-head") return siteImages.posture.forwardHead;
  if (slug === "rounded-shoulder") return siteImages.posture.roundedShoulder;
  if (slug === "pelvic-tilt") return siteImages.posture.pelvicTilt;
  if (slug === "scapular-winging") return siteImages.posture.scapularWinging;
  if (slug === "knee-valgus") return siteImages.posture.kneeValgus;
  if (slug === "high-low-shoulder") return siteImages.posture.highLowShoulder;
  if (slug === "neck-stiffness") return siteImages.posture.neckStiffness;

  const text = `${slug} ${title}`.toLowerCase();
  const matched = slugImageRules.find(([keyword]) => text.includes(keyword));

  return matched?.[1] ?? "";
}
