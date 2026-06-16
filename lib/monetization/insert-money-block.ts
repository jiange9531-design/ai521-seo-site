import type { InternalLink } from "@/lib/seo/internal-linking";

export function getMoneyBlocks(keyword: string, links: InternalLink[]) {
  return {
    afterH2: {
      title: "先判断：你是不是正在反复练错",
      body: `${keyword} 很多人不是没有训练，而是一直在用代偿动作训练。问题会反复，通常是因为只拉伸、只模仿动作，却没有先判断体态来源。`
    },
    middle: {
      title: "解决方案预告",
      body: "完整改善路径应该包含体态评估、紧张肌群放松、弱化肌群激活、动作模式重建和日常姿势管理。你可以先领取免费资料，再根据照片反馈进入更具体的训练方案。"
    },
    ending: {
      title: "微信领取入口",
      body: "添加微信 Wi985211DX，发送当前页面关键词和站姿照片，领取对应训练资料与初步评估建议。",
      cta: "免费领取训练资料",
      links: links.slice(0, 3)
    }
  };
}
