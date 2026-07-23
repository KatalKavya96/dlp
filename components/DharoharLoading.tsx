"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image, { type ImageProps } from "next/image";
import { useEffect, useMemo, useState } from "react";

const criticalAssets = [
  "/images/dharohar-mark.png",
  "/images/hero-parallax/sunset-background.webp",
  "/images/hero-parallax/architecture.webp",
  "/images/hero-parallax/cookware.webp",
  "/images/hero-parallax/curtain.webp",
] as const;

const secondaryAssets = [
  "/images/artisan.jpg",
  "/images/curated/styled-copper-closed.webp",
  "/images/curated/styled-copper-detail.webp",
  "/images/curated/copper-madurai-handi.webp",
  "/images/curated/copper-lagaan.webp",
  "/images/curated/brass-flat-kadhai.webp",
  "/images/curated/brass-lagaan.webp",
  "/images/curated/brass-patila.webp",
  "/images/curated/brass-kadhai-set.webp",
  "/images/curated/brass-roti-box.jpg",
  "/images/curated/brass-cutlery.jpg",
  "/images/curated/kansa-thaali-clean.jpg",
  "/images/curated/copper-bottle.jpg",
  "/images/curated/copper-dispenser.png",
  "/images/curated/copper-dispenser-lifestyle.jpg",
  "/images/curated/brass-davara-clean.jpg",
  "/images/materials/bronze/kansa-kadai-main.png",
] as const;

const wait = (milliseconds: number) => new Promise<void>((resolve) => window.setTimeout(resolve, milliseconds));

function preloadImage(source: string, onSettled: () => void = () => undefined) {
  return new Promise<void>((resolve) => {
    const image = new window.Image();
    let finished = false;

    const settle = async () => {
      if (finished) return;
      finished = true;
      try {
        await image.decode?.();
      } catch {
        // A decoded frame is preferable, but a loaded asset should never block entry.
      }
      onSettled();
      resolve();
    };

    image.onload = settle;
    image.onerror = settle;
    image.src = source;
    if (image.complete) void settle();
  });
}

export function DharoharLoader() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(4);
  const message = useMemo(() => {
    if (progress < 34) return "Gathering the collection";
    if (progress < 72) return "Polishing every detail";
    if (progress < 100) return "Setting the family table";
    return "The story is ready";
  }, [progress]);

  useEffect(() => {
    let cancelled = false;
    let completed = 0;
    const startedAt = performance.now();
    const previousOverflow = document.body.style.overflow;
    let returningVisitor = false;
    try {
      returningVisitor = window.sessionStorage.getItem("dharohar-loader-seen") === "true";
    } catch {
      // Storage may be unavailable in a privacy-restricted browser.
    }

    if (returningVisitor) {
      queueMicrotask(() => {
        if (cancelled) return;
        setProgress(100);
        setVisible(false);
      });
      void Promise.all(secondaryAssets.map((source) => preloadImage(source)));
      return () => { cancelled = true; };
    }

    document.body.style.overflow = "hidden";
    document.documentElement.setAttribute("data-dharohar-loading", "true");

    const pageReady = document.readyState === "complete"
      ? Promise.resolve()
      : new Promise<void>((resolve) => window.addEventListener("load", () => resolve(), { once: true }));
    const fontsReady = document.fonts?.ready ?? Promise.resolve();
    const assetsReady = Promise.all(criticalAssets.map((source) => preloadImage(source, () => {
      completed += 1;
      if (!cancelled) setProgress(Math.max(4, Math.round((completed / criticalAssets.length) * 94)));
    })));
    const safetyRelease = wait(6500);

    void Promise.race([Promise.all([pageReady, fontsReady, assetsReady]), safetyRelease]).then(async () => {
      const minimumDwell = 950;
      const remaining = Math.max(0, minimumDwell - (performance.now() - startedAt));
      if (remaining) await wait(remaining);
      if (cancelled) return;
      setProgress(100);
      await wait(320);
      if (cancelled) return;
      try {
        window.sessionStorage.setItem("dharohar-loader-seen", "true");
      } catch {
        // The loader still exits normally when storage is unavailable.
      }
      document.body.style.overflow = previousOverflow;
      document.documentElement.removeAttribute("data-dharohar-loading");
      setVisible(false);
      void Promise.all(secondaryAssets.map((source) => preloadImage(source)));
    });

    return () => {
      cancelled = true;
      document.body.style.overflow = previousOverflow;
      document.documentElement.removeAttribute("data-dharohar-loading");
    };
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="dharohar-loader"
          className="dharohar-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.012 }}
          transition={{ duration: .72, ease: [.22, 1, .36, 1] }}
          role="status"
          aria-live="polite"
          aria-label={`${message}. ${progress}% loaded.`}
        >
          <div className="dharohar-loader-light" aria-hidden="true" />
          <div className="dharohar-loader-grain" aria-hidden="true" />
          <div className="dharohar-loader-content">
            <div className="dharohar-loader-seal" aria-hidden="true">
              <span className="dharohar-loader-orbit dharohar-loader-orbit-outer" />
              <span className="dharohar-loader-orbit dharohar-loader-orbit-inner" />
              <span className="dharohar-loader-monogram">D</span>
            </div>
            <p className="dharohar-loader-wordmark">Dharohar</p>
            <p className="dharohar-loader-kicker">Crafted by tradition · Carried by you</p>
            <div className="dharohar-loader-progress" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>
              <motion.span animate={{ width: `${progress}%` }} transition={{ duration: .45, ease: [.22, 1, .36, 1] }} />
            </div>
            <div className="dharohar-loader-meta"><span>{message}</span><span>{progress.toString().padStart(2, "0")}</span></div>
          </div>
          <p className="dharohar-loader-footnote">Copper · Brass · Kansa</p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export function DharoharImage({ alt, onLoad, onError, ...props }: ImageProps) {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      <span className={`dharohar-image-skeleton ${loaded ? "is-loaded" : ""}`} aria-hidden="true" />
      <Image
        {...props}
        alt={alt}
        onLoad={(event) => {
          setLoaded(true);
          onLoad?.(event);
        }}
        onError={(event) => {
          setLoaded(true);
          onError?.(event);
        }}
      />
    </>
  );
}
