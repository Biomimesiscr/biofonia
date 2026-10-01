"use client";

import * as React from "react";
import {
  MOTION_KEY,
  setMotionCategory,
  setMotionMode,
  type Category,
} from "@/lib/cojeev-motion/settings";

/** Cojeev categories Biofonía animates; the library ships with cards off. */
const ENABLED: readonly Category[] = ["buttons", "icons", "pills", "cards"];

/**
 * Turns on Cojeev motion for the site the first time a visitor arrives.
 * A preference already saved by the library (MOTION_KEY) is left untouched,
 * and prefers-reduced-motion is still honoured by the motion hooks themselves.
 */
export function MotionDefaults() {
  React.useEffect(() => {
    try {
      if (window.localStorage.getItem(MOTION_KEY) !== null) return;
    } catch {
      return;
    }
    setMotionMode("subtle");
    ENABLED.forEach((category) => setMotionCategory(category, true));
  }, []);
  return null;
}
