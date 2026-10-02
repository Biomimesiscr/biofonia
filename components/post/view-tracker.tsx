"use client";

import { useEffect, useRef } from "react";
import { registerView } from "@/app/actions/view";

/** Counts one view per visit; renders nothing. */
export function ViewTracker({ postId }: { postId: string }) {
  const counted = useRef<string | null>(null);

  useEffect(() => {
    // StrictMode runs effects twice in development: count each post once.
    if (counted.current === postId) return;
    counted.current = postId;
    void registerView(postId);
  }, [postId]);

  return null;
}
