import { useEffect, useRef, useState } from "react";

const OBSERVER_OPTIONS = { threshold: 0.15, rootMargin: "0px 0px -60px 0px" };

// Wraps any element and fades/slides it in the first time it scrolls into
// view (or immediately, for stuff already on screen at load — like the
// hero, since the observer fires right away for elements already visible).
// `delay` (ms) lets a group of siblings cascade in one after another
// instead of popping in all at once.
export default function Reveal({
  as: Tag = "div",
  children,
  delay = 0,
  className = "",
  ...rest
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.unobserve(node);
      }
    }, OBSERVER_OPTIONS);

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const combinedClassName = `reveal${visible ? " is-visible" : ""}${
    className ? ` ${className}` : ""
  }`;

  return (
    <Tag
      ref={ref}
      className={combinedClassName}
      style={{ "--reveal-delay": `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}