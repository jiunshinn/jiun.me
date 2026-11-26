import type { Transition } from "framer-motion";

/*
 * Motion presets for the bookshelf. This file has no "use client", so that
 * server components (such as the motion lab page) can read the labels.
 */

/* -------------------------------------------------------------------------- */
/*  Motion presets                                                            */
/* -------------------------------------------------------------------------- */

export interface Pose {
  y: number;
  z: number;
  rotateY: number;
  /** Top edge toward the viewer when negative. Turns on the bottom edge. */
  rotateX?: number;
  /** Lean. Turns on the bottom-right corner. */
  rotateZ?: number;
}

export interface MotionPreset {
  label: string;
  description: string;
  hover: Pose;
  open: Pose;
  spring: Transition;
  /** Optional two-step route to the open pose: first `mid`, then `open`. */
  path?: { mid: Partial<Pose> & { x?: number }; at: number; duration: number };
}

export const REST: Pose = { y: 0, z: 0, rotateY: 0 };

export const MOTION_PRESETS = {
  turn: {
    label: "Turn",
    description: "The book turns on its spine to show the cover.",
    hover: { y: -10, z: 56, rotateY: -20 },
    open: { y: -16, z: 120, rotateY: -66 },
    spring: { type: "spring", stiffness: 210, damping: 27, mass: 0.9 },
  },
  tip: {
    label: "Tip",
    description: "A finger tips the book out by its top edge, then it swings open.",
    hover: { y: -2, z: 14, rotateY: 0, rotateX: -11 },
    open: { y: -16, z: 120, rotateY: -62 },
    spring: { type: "spring", stiffness: 240, damping: 24 },
    path: { mid: { y: -6, z: 70, rotateY: -4, rotateX: -22 }, at: 0.38, duration: 0.95 },
  },
  lift: {
    label: "Lift",
    description: "The book slides up out of the row, then turns to face you.",
    hover: { y: -26, z: 0, rotateY: 0 },
    open: { y: -14, z: 100, rotateY: -74 },
    spring: { type: "spring", stiffness: 190, damping: 26 },
    path: { mid: { y: -74, z: 20, rotateY: 0 }, at: 0.42, duration: 1.05 },
  },
  bouncy: {
    label: "Bouncy",
    description: "The same turn, with a loose spring and a small lean on hover.",
    hover: { y: -14, z: 40, rotateY: -14, rotateZ: -2.5 },
    open: { y: -18, z: 120, rotateY: -68 },
    spring: { type: "spring", stiffness: 260, damping: 13, mass: 0.9 },
  },
  display: {
    label: "Display",
    description: "Hover pulls the book toward you. Open shows the cover flat, as on a stand.",
    hover: { y: -6, z: 90, rotateY: 0 },
    open: { y: -12, z: 50, rotateY: -88 },
    spring: { type: "spring", stiffness: 160, damping: 24 },
  },
} satisfies Record<string, MotionPreset>;

export type MotionName = keyof typeof MOTION_PRESETS;
