"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/**
 * A soft ring that trails the pointer and grows over interactive elements.
 *
 * Renders nothing unless the device has a fine pointer and reduced motion is
 * off — a trailing ring on a touch device is a permanently stale dot, and it
 * is pure decoration, so there is nothing to fall back to.
 *
 * The capability check goes through `useSyncExternalStore` rather than a
 * `setState` inside an effect: the media queries *are* an external store, the
 * server snapshot is `false` so the first client render matches the HTML, and
 * a visitor who switches on reduced motion mid-session loses the ring
 * immediately instead of at the next remount.
 */
function subscribe(onChange) {
  const queries = [
    window.matchMedia("(pointer: fine)"),
    window.matchMedia("(prefers-reduced-motion: reduce)"),
  ];
  queries.forEach((query) => query.addEventListener("change", onChange));
  return () =>
    queries.forEach((query) => query.removeEventListener("change", onChange));
}

function getSnapshot() {
  return (
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function Cursor() {
  const enabled = useSyncExternalStore(subscribe, getSnapshot, () => false);
  const [hot, setHot] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  const handleMove = useCallback(
    (event) => {
      x.set(event.clientX);
      y.set(event.clientY);

      const target = event.target;
      setHot(
        Boolean(
          target instanceof Element &&
            target.closest("a, button, [role='button'], [data-cursor-hot]"),
        ),
      );
    },
    [x, y],
  );

  useEffect(() => {
    if (!enabled) return;
    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => window.removeEventListener("pointermove", handleMove);
  }, [enabled, handleMove]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ x: springX, y: springY }}
      className="pointer-events-none fixed top-0 left-0 z-90 -translate-x-1/2 -translate-y-1/2"
    >
      <motion.span
        animate={{ scale: hot ? 2.4 : 1, opacity: hot ? 0.5 : 0.85 }}
        transition={{ type: "spring", stiffness: 320, damping: 24 }}
        className="block size-6 rounded-full border border-accent-lime/70"
      />
    </motion.div>
  );
}
