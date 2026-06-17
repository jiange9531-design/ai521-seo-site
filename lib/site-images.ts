export const siteImages = {
  hero: {
    postureAssessment: "/images/hero/hero-posture-assessment.jpg"
  },

  entry: {
    problems: "/images/entry/entry-problems.jpg",
    analysis: "/images/entry/entry-analysis.jpg",
    training: "/images/entry/entry-training.jpg"
  },

  services: {
    postureCheck: "/images/services/service-posture-check.jpg",
    neckShoulder: "/images/services/service-neck-shoulder.jpg",
    pelvisLeg: "/images/services/service-pelvis-leg.jpg",
    rehabTraining: "/images/services/service-rehab-training.jpg"
  },

  problems: {
    forwardHead: "/images/problems/problem-forward-head.jpg",
    roundedShoulder: "/images/problems/problem-rounded-shoulder.jpg",
    pelvicTilt: "/images/problems/problem-pelvic-tilt.jpg",
    scapularWinging: "/images/problems/problem-scapular-winging.jpg",
    kneeValgus: "/images/problems/problem-knee-valgus.jpg",
    highLowShoulder: "/images/problems/problem-high-low-shoulder.jpg",
    neckStiffness: "/images/problems/problem-neck-stiffness.jpg"
  },

  posture: {
    forwardHead: "/images/posture/posture-forward-head.jpg",
    roundedShoulder: "/images/posture/posture-rounded-shoulder.jpg",
    pelvicTilt: "/images/posture/posture-pelvic-tilt.jpg",
    scapularWinging: "/images/posture/posture-scapular-winging.jpg",
    kneeValgus: "/images/posture/posture-knee-valgus.jpg",
    highLowShoulder: "/images/posture/posture-high-low-shoulder.jpg",
    neckStiffness: "/images/posture/posture-neck-stiffness.jpg"
  },

  resources: {
    header: "/images/resources/resources-header.jpg",
    assessmentForm: "/images/resources/resource-assessment-form.jpg",
    sevenDayPlan: "/images/resources/resource-7day-plan.jpg",
    exerciseList: "/images/resources/resource-exercise-list.jpg",
    wechatTemplate: "/images/resources/resource-wechat-template.jpg"
  },

  faq: {
    header: "/images/faq/faq-header.jpg",
    cta: "/images/faq/faq-cta.jpg"
  },

  contact: {
    wechat: "/images/contact/contact-wechat.jpg",
    assessmentChat: "/images/contact/contact-assessment-chat.jpg"
  },

  cta: {
    wechatPlan: "/images/cta/cta-wechat-plan.jpg"
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
