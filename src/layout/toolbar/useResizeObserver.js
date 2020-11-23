import { useEffect } from "react";

const observedMap = new Map();

const resizeObserver = new ResizeObserver((entries) => {
  for (let entry of entries) {
    const { target, contentRect } = entry;
    if (observedMap.has(target)) {
      const callback = observedMap.get(target);
      callback(contentRect);
    }
  }
});

export default function useResizeObserver(ref, onResize) {
  useEffect(() => {
    const target = ref.current;
    observedMap.set(target, onResize);
    resizeObserver.observe(target);
    return () => {
      resizeObserver.unobserve(target);
      observedMap.delete(target);
    };
  }, [ref, onResize]);
}
