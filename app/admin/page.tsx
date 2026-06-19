export default function AdminPage() {
  return (
    <main className="mx-auto max-w-4xl px-5 py-12">
      <section className="rounded-3xl border border-line bg-white p-8 shadow-sm">
        <p className="text-sm font-black text-jade">Stable Production Mode</p>
        <h1 className="mt-3 text-4xl font-black text-ink">静态内容系统已锁定</h1>
        <p className="mt-5 leading-8 text-body">
          当前版本不运行流量分析、用户评分、转化漏斗或收入统计。后台页面仅保留为静态状态说明。
        </p>
      </section>
    </main>
  );
}
