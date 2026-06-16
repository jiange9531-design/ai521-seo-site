export function getPaywallPath(tier: number) {
  return {
    free: "基础讲解：问题表现、原因、常见错误",
    semiPaid: tier === 1 ? "训练方案：完整动作顺序与7天安排" : "训练方案：基础改善动作包",
    premium: "高价值内容：系统课程、动作反馈、阶段训练计划",
    path: [
      "SEO文章",
      "免费领取资料",
      "添加微信 Wi985211DX",
      "获得训练方案",
      "进入付费课程"
    ]
  };
}
