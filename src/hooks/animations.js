import { useState } from "react";

export function usePageAnimation() {
  const [isExiting, setIsExiting] = useState(false);

  const variants = {
    initial: { y: -100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -100, opacity: 0 },
  };

  const transition = { duration: 1, ease: "easeInOut" };

  const startExit = () => setIsExiting(true);

  return {
    isExiting,
    variants,
    transition,
    startExit,
  };
}
