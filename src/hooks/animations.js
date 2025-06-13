import { useState } from "react";

export function usePageAnimation() {
  const [isExiting, setIsExiting] = useState(false);
  const [exitTarget, setExitTarget] = useState(null);

  const variants = {
    initial: { y: -100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -100, opacity: 0 },
  };

  const transition = { duration: 0.8, ease: "easeInOut" };

  const startExit = (target) => {
    setExitTarget(target);
    setIsExiting(true);
  };

  return {
    isExiting,
    exitTarget,
    variants,
    transition,
    startExit,
  };
}
