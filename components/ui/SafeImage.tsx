"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

export function SafeImage({ className = "", alt, ...props }: ImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`absolute inset-0 bg-[radial-gradient(circle_at_35%_30%,#c78654,transparent_36%),linear-gradient(145deg,#5a3424,#1f1b18)] ${className}`}
        role="img"
        aria-label={`${alt} — image unavailable`}
      />
    );
  }

  return <Image {...props} alt={alt} className={className} unoptimized onError={() => setFailed(true)} />;
}
