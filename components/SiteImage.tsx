"use client";

import Image from "next/image";
import { useState } from "react";

type SiteImageProps = {
  src?: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
};

export default function SiteImage({ src, alt, width, height, className = "", priority = false }: SiteImageProps) {
  const [failed, setFailed] = useState(!src);

  if (!src || failed) {
    return (
      <div
        className={`flex min-h-48 items-center justify-center rounded-2xl border border-dashed border-line bg-panel p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <div>
          <span className="inline-flex rounded-full bg-accent px-3 py-1 text-xs font-black text-ink">
            图片待替换
          </span>
          <p className="mt-3 text-sm font-bold leading-6 text-body">图片待替换：{alt}</p>
        </div>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
