"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import type { ReactNode } from "react";
import { useRef } from "react";
import { SafeImage } from "@/components/ui/SafeImage";

type AmbientSceneProps = {
  src: string;
  alt: string;
  children?: ReactNode;
  className?: string;
  imageClassName?: string;
  imagePosition?: string;
  overlayClassName?: string;
  sizes?: string;
  intensity?: "quiet" | "standard";
};

export function AmbientScene({
  src,
  alt,
  children,
  className = "",
  imageClassName = "object-cover",
  imagePosition = "50% 50%",
  overlayClassName = "bg-gradient-to-t from-black/75 via-black/20 to-black/5",
  sizes = "100vw",
  intensity = "standard",
}: AmbientSceneProps) {
  const scene = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const isNearViewport = useInView(scene, { margin: "300px" });
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 42, damping: 24, mass: 1.4 });
  const smoothY = useSpring(pointerY, { stiffness: 42, damping: 24, mass: 1.4 });
  const { scrollYProgress } = useScroll({ target: scene, offset: ["start end", "end start"] });
  const scrollY = useTransform(scrollYProgress, [0, 1], reducedMotion ? [0, 0] : intensity === "quiet" ? [-10, 10] : [-24, 24]);
  const imageX = useTransform(smoothX, [-0.5, 0.5], reducedMotion ? [0, 0] : [-10, 10]);
  const imageY = useTransform(smoothY, [-0.5, 0.5], reducedMotion ? [0, 0] : [-8, 8]);
  const combinedY = useTransform(() => imageY.get() + scrollY.get());
  const rotateY = useTransform(smoothX, [-0.5, 0.5], reducedMotion ? [0, 0] : [-1.2, 1.2]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], reducedMotion ? [0, 0] : [1.2, -1.2]);

  return (
    <div
      ref={scene}
      className={`ambient-scene ${isNearViewport ? "ambient-scene-active" : ""} group/scene relative isolate overflow-hidden ${className}`}
      onPointerMove={(event) => {
        if (reducedMotion || event.pointerType !== "mouse") return;
        const bounds = event.currentTarget.getBoundingClientRect();
        pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5);
        pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5);
      }}
      onPointerLeave={() => {
        pointerX.set(0);
        pointerY.set(0);
      }}
    >
      <motion.div
        className="absolute -inset-8 will-change-transform"
        style={{
          x: imageX,
          y: combinedY,
          rotateX,
          rotateY,
          scale: intensity === "quiet" ? 1.045 : 1.075,
          transformPerspective: 1400,
        }}
      >
        <SafeImage
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className={`ambient-scene-image ${imageClassName}`}
          style={{ objectPosition: imagePosition }}
        />
      </motion.div>
      <div className={`absolute inset-0 -z-0 ${overlayClassName}`} />
      <div className="ambient-window-light absolute -inset-[30%] -z-0 opacity-50" aria-hidden="true" />
      <div className="ambient-leaf-shadow absolute -inset-[25%] -z-0 opacity-25" aria-hidden="true" />
      <div className="ambient-smoke absolute -bottom-[24%] left-[18%] -z-0 h-[65%] w-[45%] opacity-40" aria-hidden="true" />
      <div className="ambient-dust absolute inset-0 -z-0 opacity-35" aria-hidden="true" />
      <div className="ambient-reflection absolute inset-y-0 -left-1/3 -z-0 w-1/3" aria-hidden="true" />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
