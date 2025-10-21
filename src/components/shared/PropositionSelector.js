// src/components/shared/PropositionSelector.js

import React from "react";

const PropositionSelector = ({
  quality,
  quantity,
  onQualityChange,
  onQuantityChange,
}) => {
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
    },
    row: {
      display: "flex",
      gap: "4px",
    },
    button: (isSelected) => ({
      flex: 1,
      padding: "6px 8px",
      fontSize: "0.75rem",
      fontWeight: isSelected ? "600" : "500",
      border: `2px solid ${isSelected ? "#3b82f6" : "#d1d5db"}`,
      borderRadius: "4px",
      backgroundColor: isSelected ? "#eff6ff" : "white",
      color: isSelected ? "#1e40af" : "#6b7280",
      cursor: "pointer",
      transition: "all 0.2s",
      outline: "none",
    }),
    label: {
      fontSize: "0.7rem",
      fontWeight: "600",
      color: "#6b7280",
      marginBottom: "2px",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
    },
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
      {/* Quality Row */}
      <div>
        <div style={styles.label}>Quality</div>
        <div style={styles.row}>
          <button
            style={styles.button(quality === "Universal")}
            onClick={() => onQualityChange("Universal")}
            onMouseEnter={(e) => handleMouseEnter(e, quality === "Universal")}
            onMouseLeave={(e) => handleMouseLeave(e, quality === "Universal")}
          >
            Universal
          </button>
          <button
            style={styles.button(quality === "Particular")}
            onClick={() => onQualityChange("Particular")}
            onMouseEnter={(e) => handleMouseEnter(e, quality === "Particular")}
            onMouseLeave={(e) => handleMouseLeave(e, quality === "Particular")}
          >
            Particular
          </button>
        </div>
      </div>

      {/* Quantity Row */}
      <div>
        <div style={styles.label}>Quantity</div>
        <div style={styles.row}>
          <button
            style={styles.button(quantity === "Affirmative")}
            onClick={() => onQuantityChange("Affirmative")}
            onMouseEnter={(e) =>
              handleMouseEnter(e, quantity === "Affirmative")
            }
            onMouseLeave={(e) =>
              handleMouseLeave(e, quantity === "Affirmative")
            }
          >
            Affirmative
          </button>
          <button
            style={styles.button(quantity === "Negative")}
            onClick={() => onQuantityChange("Negative")}
            onMouseEnter={(e) => handleMouseEnter(e, quantity === "Negative")}
            onMouseLeave={(e) => handleMouseLeave(e, quantity === "Negative")}
          >
            Negative
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropositionSelector;
