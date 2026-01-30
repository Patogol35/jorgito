import { useState, useRef, useEffect, useMemo } from "react";

export function useSkillsFilter(skills) {
  const [filter, setFilter] = useState("All");

  const containerRef = useRef(null);
  const buttonRefs = useRef({});

  // Scroll automático al botón activo
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

  // Filtrado optimizado
  const filteredSkills = useMemo(() => {
    return filter === "All"
      ? skills
      : skills.filter((s) => s.category === filter);
  }, [filter, skills]);

  return {
    filter,
    setFilter,
    filteredSkills,
    containerRef,
    buttonRefs,
  };
}
