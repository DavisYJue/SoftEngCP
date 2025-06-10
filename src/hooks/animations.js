import { useEffect, useState } from "react";
import { useAnimation } from "framer-motion";

export function usePageAnimation() {
  const controls = useAnimation();
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Play entrance animation on mount
    controls.start({
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    });
  }, [controls]);

  const startExitAnimation = async () => {
    setIsExiting(true);
    await controls.start({
      y: -100,
      opacity: 0,
      transition: { duration: 0.6, ease: "easeInOut" },
    });
  };

  return { controls, isExiting, startExitAnimation };
}
