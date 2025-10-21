// src/components/shared/TypeSelector.js - Letter-by-letter version

import React from "react";

export const TypeSelector = ({ value, onChange }) => {
  const letters = ["A", "E", "I", "O"];

  // Parse current type into individual letters
  const currentMajor = value[0] || "A";
  const currentMinor = value[1] || "A";
  const currentConclusion = value[2] || "A";

  const handleLetterChange = (position, letter) => {
    let newType = value;
    if (position === 0) {
      newType = letter + currentMinor + currentConclusion;
    } else if (position === 1) {
      newType = currentMajor + letter + currentConclusion;
    } else if (position === 2) {
      newType = currentMajor + currentMinor + letter;
    }
    onChange(newType);
  };

  const getLetterLabel = (letter) => {
    const labels = {
      A: "All (Universal Affirmative)",
      E: "No (Universal Negative)",
      I: "Some (Particular Affirmative)",
      O: "Some...not (Particular Negative)",
    };
    return labels[letter];
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
    },
    row: {
      display: "flex",
      flexDirection: "column",
      gap: "6px",
    },
    rowLabel: {
      fontSize: "0.75rem",
      fontWeight: "600",
      color: "#374151",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    badge: (color) => ({
      display: "inline-block",
      padding: "2px 8px",
      borderRadius: "4px",
      fontSize: "0.7rem",
      fontWeight: "700",
      backgroundColor: color,
      color: "white",
      fontFamily: "monospace",
    }),
    buttonGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: "6px",
    },
    button: (isSelected) => ({
      padding: "10px 8px",
      fontSize: "0.875rem",
      fontWeight: isSelected ? "700" : "500",
      border: `2px solid ${isSelected ? "#3b82f6" : "#d1d5db"}`,
      borderRadius: "6px",
      backgroundColor: isSelected ? "#eff6ff" : "white",
      color: isSelected ? "#1e40af" : "#6b7280",
      cursor: "pointer",
      transition: "all 0.2s",
      outline: "none",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "4px",
    }),
    letterLabel: (isSelected) => ({
      fontSize: "1.25rem",
      fontWeight: "700",
      fontFamily: "monospace",
      color: isSelected ? "#1e40af" : "#374151",
    }),
    letterDescription: {
      fontSize: "0.65rem",
      color: "#6b7280",
      textAlign: "center",
      lineHeight: "1.2",
    },
    currentType: {
      marginTop: "8px",
      padding: "12px",
      backgroundColor: "#f0f9ff",
      border: "2px solid #3b82f6",
      borderRadius: "6px",
      textAlign: "center",
    },
    currentTypeLabel: {
      fontSize: "0.7rem",
      color: "#6b7280",
      marginBottom: "4px",
      fontWeight: "600",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
    },
    currentTypeValue: {
      fontSize: "1.5rem",
      fontWeight: "700",
      color: "#1e40af",
      fontFamily: "monospace",
      letterSpacing: "2px",
    },
  };

  const handleMouseEnter = (e, isSelected) => {
    if (!isSelected) {
      e.currentTarget.style.borderColor = "#9ca3af";
      e.currentTarget.style.backgroundColor = "#f9fafb";
    }
  };

  const handleMouseLeave = (e, isSelected) => {
    if (!isSelected) {
      e.currentTarget.style.borderColor = "#d1d5db";
      e.currentTarget.style.backgroundColor = "white";
    }
  };

  return (
    <div style={styles.container}>
      {/* Major Premise */}
      <div style={styles.row}>
        <div style={styles.rowLabel}>
          <span>Major Premise</span>
          <span style={styles.badge("#3b82f6")}>1st</span>
        </div>
        <div style={styles.buttonGrid}>
          {letters.map((letter) => (
            <button
              key={letter}
              style={styles.button(currentMajor === letter)}
              onClick={() => handleLetterChange(0, letter)}
              onMouseEnter={(e) => handleMouseEnter(e, currentMajor === letter)}
              onMouseLeave={(e) => handleMouseLeave(e, currentMajor === letter)}
              title={getLetterLabel(letter)}
            >
              <div style={styles.letterLabel(currentMajor === letter)}>
                {letter}
              </div>
              <div style={styles.letterDescription}>
                {letter === "A" && "All"}
                {letter === "E" && "No"}
                {letter === "I" && "Some"}
                {letter === "O" && "Some not"}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Minor Premise */}
      <div style={styles.row}>
        <div style={styles.rowLabel}>
          <span>Minor Premise</span>
          <span style={styles.badge("#8b5cf6")}>2nd</span>
        </div>
        <div style={styles.buttonGrid}>
          {letters.map((letter) => (
            <button
              key={letter}
              style={styles.button(currentMinor === letter)}
              onClick={() => handleLetterChange(1, letter)}
              onMouseEnter={(e) => handleMouseEnter(e, currentMinor === letter)}
              onMouseLeave={(e) => handleMouseLeave(e, currentMinor === letter)}
              title={getLetterLabel(letter)}
            >
              <div style={styles.letterLabel(currentMinor === letter)}>
                {letter}
              </div>
              <div style={styles.letterDescription}>
                {letter === "A" && "All"}
                {letter === "E" && "No"}
                {letter === "I" && "Some"}
                {letter === "O" && "Some not"}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Conclusion */}
      <div style={styles.row}>
        <div style={styles.rowLabel}>
          <span>Conclusion</span>
          <span style={styles.badge("#ec4899")}>3rd</span>
        </div>
        <div style={styles.buttonGrid}>
          {letters.map((letter) => (
            <button
              key={letter}
              style={styles.button(currentConclusion === letter)}
              onClick={() => handleLetterChange(2, letter)}
              onMouseEnter={(e) =>
                handleMouseEnter(e, currentConclusion === letter)
              }
              onMouseLeave={(e) =>
                handleMouseLeave(e, currentConclusion === letter)
              }
              title={getLetterLabel(letter)}
            >
              <div style={styles.letterLabel(currentConclusion === letter)}>
                {letter}
              </div>
              <div style={styles.letterDescription}>
                {letter === "A" && "All"}
                {letter === "E" && "No"}
                {letter === "I" && "Some"}
                {letter === "O" && "Some not"}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Current Type Display */}
      <div style={styles.currentType}>
        <div style={styles.currentTypeLabel}>Current Type (Mood)</div>
        <div style={styles.currentTypeValue}>{value}</div>
      </div>
    </div>
  );
};

// Keep FigureSelector the same - export it here too
export const FigureSelector = ({ value, onChange }) => {
  const figures = [
    {
      value: "1",
      label: "Figure 1",
      structure: "M-P, S-M",
      description: "Standard",
      color: "#3b82f6",
    },
    {
      value: "2",
      label: "Figure 2",
      structure: "P-M, S-M",
      description: "Inverted major",
      color: "#8b5cf6",
    },
    {
      value: "3",
      label: "Figure 3",
      structure: "M-P, M-S",
      description: "Inverted minor",
      color: "#ec4899",
    },
    {
      value: "4",
      label: "Figure 4",
      structure: "P-M, M-S",
      description: "Both inverted",
      color: "#f59e0b",
    },
  ];

  const styles = {
    container: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: "8px",
    },
    button: (isSelected, color) => ({
      padding: "12px 8px",
      border: `2px solid ${isSelected ? color : "#d1d5db"}`,
      borderRadius: "6px",
      backgroundColor: isSelected ? `${color}15` : "white",
      cursor: "pointer",
      textAlign: "center",
      transition: "all 0.2s",
      outline: "none",
    }),
    label: (isSelected, color) => ({
      fontSize: "0.875rem",
      fontWeight: "700",
      marginBottom: "4px",
      color: isSelected ? color : "#374151",
    }),
    structure: {
      fontSize: "0.7rem",
      color: "#6b7280",
      fontFamily: "monospace",
      marginTop: "2px",
      fontWeight: "600",
    },
    description: {
      fontSize: "0.65rem",
      color: "#9ca3af",
      marginTop: "2px",
      fontStyle: "italic",
    },
  };

  const handleMouseEnter = (e, isSelected) => {
    if (!isSelected) {
      e.currentTarget.style.borderColor = "#9ca3af";
      e.currentTarget.style.backgroundColor = "#f9fafb";
    }
  };

  const handleMouseLeave = (e, isSelected) => {
    if (!isSelected) {
      e.currentTarget.style.borderColor = "#d1d5db";
      e.currentTarget.style.backgroundColor = "white";
    }
  };

  return (
    <div style={styles.container}>
      {figures.map((fig) => (
        <button
          key={fig.value}
          style={styles.button(value === fig.value, fig.color)}
          onClick={() => onChange(fig.value)}
          onMouseEnter={(e) => handleMouseEnter(e, value === fig.value)}
          onMouseLeave={(e) => handleMouseLeave(e, value === fig.value)}
        >
          <div style={styles.label(value === fig.value, fig.color)}>
            {fig.label}
          </div>
          <div style={styles.structure}>{fig.structure}</div>
          <div style={styles.description}>{fig.description}</div>
        </button>
      ))}
    </div>
  );
};
