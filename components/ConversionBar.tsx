export default function ConversionBar() {
  return (
    <aside className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-white/95 shadow-[0_-8px_30px_rgba(16,32,51,0.14)] backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-3 py-2 sm:px-5">
        <div className="hidden min-w-32 sm:block">
          <span className="block text-xs font-bold text-body">体态改善入口</span>
          <strong className="text-sm text-jade">固定展示</strong>
        </div>
        <a
          href="/assessment/"
          className="flex min-h-12 flex-1 items-center justify-center rounded-xl bg-jade px-5 py-3 text-center text-sm font-black text-white shadow-sm"
        >
          领取专属修复方案（9.9）
        </a>
      </div>
    </aside>
  );
}
