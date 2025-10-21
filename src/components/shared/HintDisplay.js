// src/components/shared/HintDisplay.js

import React from "react";
import { Lightbulb, AlertCircle, CheckCircle } from "lucide-react";

const HintDisplay = ({ hint, onClose }) => {
  if (!hint) return null;

  const styles = {
    container: {
      marginTop: "16px",
      padding: "16px",
      borderRadius: "8px",
      border: "2px solid",
      backgroundColor: hint.type === "success" ? "#f0fdf4" : "#fef2f2",
      borderColor: hint.type === "success" ? "#86efac" : "#fca5a5",
    },
    header: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      marginBottom: "12px",
    },
    icon: {
      flexShrink: 0,
    },
    title: {
      fontSize: "1rem",
      fontWeight: "600",
      color: hint.type === "success" ? "#166534" : "#991b1b",
      flex: 1,
    },
    closeButton: {
      background: "none",
      border: "none",
      cursor: "pointer",
      fontSize: "1.25rem",
      color: "#6b7280",
      padding: "0 4px",
    },
    message: {
      fontSize: "0.875rem",
      lineHeight: "1.6",
      color: hint.type === "success" ? "#15803d" : "#b91c1c",
      whiteSpace: "pre-line",
    },
  };

  const Icon = hint.type === "success" ? CheckCircle : AlertCircle;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.icon}>
          <Icon
            size={24}
            color={hint.type === "success" ? "#16a34a" : "#dc2626"}
          />
        </div>
        <div style={styles.title}>{hint.title}</div>
        {onClose && (
          <button
            style={styles.closeButton}
            onClick={onClose}
            aria-label="Close hint"
          >
            ×
          </button>
        )}
      </div>
      <div style={styles.message}>{hint.message}</div>
    </div>
  );
};

export default HintDisplay;
