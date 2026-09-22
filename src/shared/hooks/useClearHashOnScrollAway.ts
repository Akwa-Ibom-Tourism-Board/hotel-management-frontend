import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Watches the given section ids; once the section matching the current
// URL hash scrolls out of view (in either direction), the hash is
// dropped so the URL doesn't stay pinned to a section the user has
// already scrolled past.
export const useClearHashOnScrollAway = (sectionIds: string[]) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let observer: IntersectionObserver | undefined;

    // IntersectionObserver reports the current (pre-scroll) state the
    // instant observe() is called, which would otherwise clear a hash
    // that ScrollToHash hasn't finished scrolling to yet. Starting the
    // observer after that scroll has had time to land avoids the race.
    const startTimer = setTimeout(() => {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            const isCurrentHash = `#${entry.target.id}` === window.location.hash;
            if (isCurrentHash && !entry.isIntersecting) {
              navigate(location.pathname, { replace: true });
            }
          }
        },
        // Shrinks the effective viewport from the top for the fixed
        // header, and requires at least a quarter of the section to be
        // visible to count as "in view" — a page short on trailing
        // content can otherwise leave a sliver on screen even at the
        // absolute scroll limit, which a pixel-exact threshold would
        // never treat as "scrolled past".
        { rootMargin: "-130px 0px 0px 0px", threshold: 0.25 },
      );

      sectionIds
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => el !== null)
        .forEach((el) => observer!.observe(el));
    }, 500);

    return () => {
      clearTimeout(startTimer);
      observer?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);
};
