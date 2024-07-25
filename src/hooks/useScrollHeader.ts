import { useState, useEffect } from "react";

export function useScrollHeader() {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlHeader = () => {
    if (typeof window === "undefined") return;
    if (window.scrollY < 100) {
      setShowHeader(true);
      return;
    }
    setShowHeader(window.scrollY < lastScrollY);
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlHeader);

      return () => {
        window.removeEventListener("scroll", controlHeader);
      };
    }
  }, [lastScrollY]);

  return showHeader;
}
