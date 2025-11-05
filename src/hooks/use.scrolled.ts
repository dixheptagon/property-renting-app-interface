import { useEffect, useState } from "react";

export function useScrolled({
  navbarHeight = 0,
}: { navbarHeight?: number } = {}) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > navbarHeight);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return scrolled;
}
