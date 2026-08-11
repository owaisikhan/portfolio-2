"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

import { cn } from "@/app/_lib/utils";
import { prefersReducedMotion } from "@/app/_lib/gsap";

/**
 * Tilts toward the pointer and tracks a spotlight under it.
 *
 * The spotlight is driven by two CSS custom properties written straight onto
 * the element, not by React state — a state update per pointer move would
 * re-render every sibling card in the grid on every frame.
 */
export function TiltCard({
  children,
  className,
  accent = "var(--color-accent-lime)",
  max = 6,
  ...props
}) {
  const ref = useRef(null);
  const [active, setActive] = useState(false);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const config = { stiffness: 180, damping: 20, mass: 0.5 };
  const rotateX = useSpring(
    useTransform(py, [0, 1], [max, -max]),
    config,
  );
  const rotateY = useSpring(
    useTransform(px, [0, 1], [-max, max]),
    config,
  );

  function handleMove(event) {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const nx = (event.clientX - rect.left) / rect.width;
    const ny = (event.clientY - rect.top) / rect.height;

    el.style.setProperty("--spot-x", `${nx * 100}%`);
    el.style.setProperty("--spot-y", `${ny * 100}%`);

    if (prefersReducedMotion()) return;
    px.set(nx);
    py.set(ny);
  }

  function handleLeave() {
    setActive(false);
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerEnter={() => setActive(true)}
      onPointerLeave={handleLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1100,
        "--card-accent": accent,
      }}
      className={cn(
        "group/tilt relative isolate transform-gpu transition-[border-color] duration-300",
        className,
      )}
      {...props}
    >
      {/* Spotlight. Pointer-events off so it never eats a click on a link. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100"
        style={{
          opacity: active ? 1 : undefined,
          background:
            "radial-gradient(320px circle at var(--spot-x, 50%) var(--spot-y, 50%), color-mix(in oklab, var(--card-accent) 16%, transparent), transparent 70%)",
        }}
      />
      {children}
    </motion.div>
  );
}
