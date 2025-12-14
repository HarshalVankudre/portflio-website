"use client";

import * as React from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUp } from "lucide-react";

import { Button } from "@/components/ui/button";

export function BackToTop() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = React.useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 700);
  });

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={
        visible
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 16, scale: 0.98 }
      }
      transition={{ duration: 0.25 }}
      style={{ pointerEvents: visible ? "auto" : "none" }}
    >
      <Button
        size="icon"
        variant="secondary"
        aria-label="Back to top"
        className="rounded-full shadow-lg"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <ArrowUp className="h-4 w-4" />
      </Button>
    </motion.div>
  );
}

