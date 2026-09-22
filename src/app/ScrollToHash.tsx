import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// react-router's <Link> only updates the URL; it never scrolls the page,
// so a link to "/#benefits" needs this to actually move the viewport.
// A short delay lets the target route's content mount first when
// navigating in from a different page.
export const ScrollToHash = () => {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return undefined;

    const id = location.hash.slice(1);
    const timer = setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 80);

    return () => clearTimeout(timer);
  }, [location.pathname, location.hash]);

  return null;
};
