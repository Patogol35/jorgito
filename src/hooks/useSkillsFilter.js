import { useState, useRef, useEffect } from "react";

export function useSkillsFilter() {
  const [filter, setFilter] = useState("All");

  const containerRef = useRef(null);
  const buttonRefs = useRef({});

  useEffect(() => {
    const activeBtn = buttonRefs.current[filter];
    const container = containerRef.current;

    if (activeBtn && container) {
      container.scrollTo({
        left:
          activeBtn.offsetLeft -
          container.offsetWidth / 2 +
          activeBtn.offsetWidth / 2,
        behavior: "smooth",
      });
    }
  }, [filter]);

  return {
    filter,
    setFilter,
    containerRef,
    buttonRefs,
  };
}
