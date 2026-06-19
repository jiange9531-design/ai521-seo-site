export default function TrafficCheckPage() {
  return (
    <main className="mx-auto max-w-4xl px-5 py-12">
      <section className="rounded-3xl border border-line bg-white p-8 shadow-sm">
        <p className="text-sm font-black text-jade">Stable Production Mode</p>
        <h1 className="mt-3 text-4xl font-black text-ink">流量追踪已关闭</h1>
        <p className="mt-5 leading-8 text-body">
          此页面仅保留原访问地址。当前版本不发送 page_view、CTA、微信、线索或转化事件。
        </p>
      </section>
    </main>
  );
}
