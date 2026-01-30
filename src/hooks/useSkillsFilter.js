import { useRef, useState } from "react";

export function useSkillsFilter() {
  const [filter, setFilter] = useState("All");

  const containerRef = useRef(null);
  const buttonRefs = useRef({});

  return {
    filter,
    setFilter,
    containerRef,
    buttonRefs,
  };
}
