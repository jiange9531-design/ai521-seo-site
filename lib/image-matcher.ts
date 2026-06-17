import { siteImages } from "@/lib/site-images";

const slugMatchers: Array<[string[], string]> = [
  [["scapular-winging", "scapular", "winging"], siteImages.posture.scapularWinging],
  [["knee-valgus", "knee", "valgus"], siteImages.posture.kneeValgus],
  [["pelvic-tilt", "pelvic", "lumbar", "anterior-tilt"], siteImages.posture.pelvicTilt],
  [["high-low-shoulder", "uneven-shoulder", "shoulder-line"], siteImages.posture.highLowShoulder],
  [["rounded-shoulder", "rounded-shoulders", "hunchback"], siteImages.posture.roundedShoulder],
  [["neck-stiffness", "neck-shoulder", "cervical-pain"], siteImages.posture.neckStiffness],
  [["forward-head", "neck-forward", "cervical-forward", "forward"], siteImages.posture.forwardHead]
];

const titleMatchers: Array<[string[], string]> = [
  [
    ["翼状肩胛", "肩胛骨突出", "肩胛不稳", "肩胛稳定", "肩胛"],
    siteImages.posture.scapularWinging
  ],
  [
    ["膝内扣", "膝盖内扣", "下肢力线", "髋膝踝", "单腿站立", "深蹲"],
    siteImages.posture.kneeValgus
  ],
  [
    ["骨盆前倾", "小肚子", "腰椎前凸", "骨盆", "腰椎曲度", "髋部", "下背部"],
    siteImages.posture.pelvicTilt
  ],
  [
    ["高低肩", "肩线", "肩峰高度", "肩部水平线"],
    siteImages.posture.highLowShoulder
  ],
  [
    ["圆肩", "含胸", "肩膀前扣", "胸肩打开"],
    siteImages.posture.roundedShoulder
  ],
  [
    ["肩颈僵硬", "肩颈放松", "颈肩", "肩颈酸", "上斜方肌"],
    siteImages.posture.neckStiffness
  ],
  [
    ["头前伸", "脖子前倾", "颈椎前倾", "低头族", "看手机", "电脑办公颈椎", "下巴回收", "颈部姿势"],
    siteImages.posture.forwardHead
  ],
  [
    ["训练", "动作", "康复", "弹力带", "改善动作", "训练指导"],
    siteImages.services.rehabTraining
  ]
];

export function getImageForTitle(title: string, slug = "") {
  const normalizedSlug = slug.toLowerCase();

  const slugMatch = slugMatchers.find(([keywords]) => keywords.some((keyword) => normalizedSlug.includes(keyword)));
  if (slugMatch) return slugMatch[1];

  const normalizedTitle = title.toLowerCase();
  const titleMatch = titleMatchers.find(([keywords]) => keywords.some((keyword) => normalizedTitle.includes(keyword.toLowerCase())));
  if (titleMatch) return titleMatch[1];

  return siteImages.hero.postureAssessment;
}
