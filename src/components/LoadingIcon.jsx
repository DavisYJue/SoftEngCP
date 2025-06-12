import { useState, useEffect } from "react";
import Template from "@/components/Template";

const LoadingIcon = () => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 5 ? "" : prev + "."));
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <Template>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-indigo-800 space-y-4">
        <p className="text-2xl font-semibold tracking-wide drop-shadow-md animate-pulse">
          Loading Roads Data...{dots}
        </p>
      </div>
    </Template>
  );
};

export default LoadingIcon;
