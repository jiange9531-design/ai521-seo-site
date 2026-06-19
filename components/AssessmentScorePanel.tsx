"use client";

import { useState } from "react";

type AnswerMap = Record<number, boolean>;

export default function AssessmentScorePanel({
  items,
  productHref
}: {
  items: string[];
  productHref: string;
}) {
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [finalScore, setFinalScore] = useState<number | null>(null);
  const answeredCount = Object.keys(answers).length;
  const score = items.length === 0
    ? 0
    : Math.round((Object.values(answers).filter(Boolean).length / items.length) * 100);

  function answer(index: number, value: boolean) {
    const nextAnswers = { ...answers, [index]: value };
    setAnswers(nextAnswers);

    if (Object.keys(nextAnswers).length === items.length) {
      const matched = Object.values(nextAnswers).filter(Boolean).length;
      setFinalScore(items.length === 0 ? 0 : Math.round((matched / items.length) * 100));
    }
  }

  return (
    <section className="rounded-3xl border border-jade bg-white p-6 shadow-sm">
      <p className="text-sm font-black text-jade">体态风险评分</p>
      <h2 className="mt-2 text-3xl font-black text-ink">完成评估，生成 0–100 分结果</h2>
      <div className="mt-6 grid gap-4">
        {items.map((item, index) => (
          <fieldset key={item} className="rounded-2xl bg-panel p-4">
            <legend className="px-1 text-sm font-bold leading-7 text-body">{item}</legend>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {[
                ["符合", true],
                ["不符合", false]
              ].map(([label, value]) => (
                <button
                  key={label as string}
                  type="button"
                  onClick={() => answer(index, value as boolean)}
                  className={`rounded-xl border px-4 py-3 text-sm font-black ${
                    answers[index] === value
                      ? "border-jade bg-jade text-white"
                      : "border-line bg-white text-body"
                  }`}
                >
                  {label as string}
                </button>
              ))}
            </div>
          </fieldset>
        ))}
      </div>
      <div className="mt-6 rounded-2xl bg-ink p-5 text-white">
        <span className="text-xs font-black text-accent">当前 score</span>
        <strong className="mt-1 block text-5xl text-accent">{score}</strong>
        <p className="mt-3 text-sm text-white/70">
          已完成 {answeredCount}/{items.length} 项
        </p>
        {finalScore !== null && (
          <div className="mt-4">
            <p className={`font-black ${finalScore > 70 ? "text-red-300" : "text-accent"}`}>
              {finalScore > 70 ? "高风险，需要立即修复" : "存在明显功能风险"}
            </p>
            {finalScore > 70 && (
              <p className="mt-2 text-sm leading-7 text-white/75">
                该问题若持续，将影响长期身体结构稳定性
              </p>
            )}
          </div>
        )}
      </div>
      <a
        href={productHref}
        className="mt-6 flex min-h-14 w-full items-center justify-center rounded-xl bg-accent px-6 py-4 text-center text-base font-black text-ink"
      >
        领取专属修复方案（9.9）
      </a>
    </section>
  );
}
