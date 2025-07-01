export const getPropositionType = (quality, quantity) => {
  if (quality === "Universal" && quantity === "Affirmative") return "A";
  if (quality === "Universal" && quantity === "Negative") return "E";
  if (quality === "Particular" && quantity === "Affirmative") return "I";
  if (quality === "Particular" && quantity === "Negative") return "O";
  return "A";
};

export const formatStatement = (type, subject, predicate) => {
  switch (type) {
    case "A":
      return `All ${subject} are ${predicate}`;
    case "E":
      return `No ${subject} are ${predicate}`;
    case "I":
      return `Some ${subject} are ${predicate}`;
    case "O":
      return `Some ${subject} are not ${predicate}`;
    default:
      return "";
  }
};

export const getCPDConnectors = (type) => {
  const configs = {
    A: [
      // All S are P
      { start: "top", end: "top", style: "double", color: "#6b7280" }, // S∩P (no-info)
      { start: "top", end: "bottom", style: "dashed", color: "#dc2626" }, // S∩¬P (none - nothing is S and not P)
      { start: "bottom", end: "top", style: "double", color: "#6b7280" }, // ¬S∩P (no-info)
      { start: "bottom", end: "bottom", style: "double", color: "#6b7280" }, // ¬S∩¬P (no-info)
    ],
    E: [
      // No S are P
      { start: "top", end: "top", style: "dashed", color: "#dc2626" }, // S∩P (none - nothing is both S and P)
      { start: "top", end: "bottom", style: "double", color: "#6b7280" }, // S∩¬P (no-info)
      { start: "bottom", end: "top", style: "double", color: "#6b7280" }, // ¬S∩P (no-info)
      { start: "bottom", end: "bottom", style: "double", color: "#6b7280" }, // ¬S∩¬P (no-info)
    ],
    I: [
      // Some S are P
      { start: "top", end: "top", style: "solid", color: "#059669" }, // S∩P (some - at least one is both S and P)
      { start: "top", end: "bottom", style: "double", color: "#6b7280" }, // S∩¬P (no-info)
      { start: "bottom", end: "top", style: "double", color: "#6b7280" }, // ¬S∩P (no-info)
      { start: "bottom", end: "bottom", style: "double", color: "#6b7280" }, // ¬S∩¬P (no-info)
    ],
    O: [
      // Some S are not P
      { start: "top", end: "top", style: "double", color: "#6b7280" }, // S∩P (no-info)
      { start: "top", end: "bottom", style: "solid", color: "#059669" }, // S∩¬P (some - at least one is S and not P)
      { start: "bottom", end: "top", style: "double", color: "#6b7280" }, // ¬S∩P (no-info)
      { start: "bottom", end: "bottom", style: "double", color: "#6b7280" }, // ¬S∩¬P (no-info)
    ],
  };
  return configs[type] || configs["A"];
};
