// src/components/shared/TypeSelector.js

import React from "react";

export const TypeSelector = ({ value, onChange }) => {
  // Group types by first letter for easier navigation
  const typeGroups = {
    A: [
      "AAA",
      "AAE",
      "AAI",
      "AAO",
      "AEA",
      "AEE",
      "AEI",
      "AEO",
      "AIA",
      "AIE",
      "AII",
      "AIO",
      "AOA",
      "AOE",
      "AOI",
      "AOO",
    ],
    E: [
      "EAA",
      "EAE",
      "EAI",
      "EAO",
      "EEA",
      "EEE",
      "EEI",
      "EEO",
      "EIA",
      "EIE",
      "EII",
      "EIO",
      "EOA",
      "EOE",
      "EOI",
      "EOO",
    ],
    I: [
      "IAA",
      "IAE",
      "IAI",
      "IAO",
      "IEA",
      "IEE",
      "IEI",
      "IEO",
      "IIA",
      "IIE",
      "III",
      "IIO",
      "IOA",
      "IOE",
      "IOI",
      "IOO",
    ],
    O: [
      "OAA",
      "OAE",
      "OAI",
      "OAO",
      "OEA",
      "OEE",
      "OEI",
      "OEO",
      "OIA",
      "OIE",
      "OII",
      "OIO",
      "OOA",
      "OOE",
      "OOI",
      "OOO",
    ],
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
    },
    groupLabel: {
      fontSize: "0.7rem",
      fontWeight: "600",
      color: "#6b7280",
      marginBottom: "2px",
    },
    buttonGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(8, 1fr)",
      gap: "4px",
    },
    button: (isSelected) => ({
      padding: "6px 4px",
      fontSize: "0.7rem",
      fontWeight: isSelected ? "700" : "500",
      border: `2px solid ${isSelected ? "#3b82f6" : "#d1d5db"}`,
      borderRadius: "4px",
      backgroundColor: isSelected ? "#eff6ff" : "white",
      color: isSelected ? "#1e40af" : "#6b7280",
      cursor: "pointer",
      transition: "all 0.2s",
      outline: "none",
      fontFamily: "monospace",
    }),
  };

  const handleMouseEnter = (e, isSelected) => {
    if (!isSelected) {
      e.target.style.borderColor = "#9ca3af";
      e.target.style.backgroundColor = "#f9fafb";
    }
  };

  const handleMouseLeave = (e, isSelected) => {
    if (!isSelected) {
      e.target.style.borderColor = "#d1d5db";
      e.target.style.backgroundColor = "white";
    }
  };

  return (
    <div style={styles.container}>
      {Object.entries(typeGroups).map(([letter, types]) => (
        <div key={letter}>
          <div style={styles.groupLabel}>Major: {letter}</div>
          <div style={styles.buttonGrid}>
            {types.map((type) => (
              <button
                key={type}
                style={styles.button(value === type)}
                onClick={() => onChange(type)}
                onMouseEnter={(e) => handleMouseEnter(e, value === type)}
                onMouseLeave={(e) => handleMouseLeave(e, value === type)}
                title={`${type} - ${
                  letter === "A"
                    ? "All"
                    : letter === "E"
                    ? "No"
                    : letter === "I"
                    ? "Some"
                    : "Some...not"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// src/components/shared/FigureSelector.js

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
