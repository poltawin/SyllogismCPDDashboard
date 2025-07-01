import React from "react";
import { Check, X } from "lucide-react";

const ValidationIndicator = ({ isValid, showText = true }) => {
  const styles = {
    container: {
      padding: "4px 12px",
      borderRadius: "4px",
      backgroundColor: isValid ? "#dcfce7" : "#fecaca",
      color: isValid ? "#166534" : "#991b1b",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontSize: "0.875rem",
      fontWeight: "500",
    },
  };

  return (
    <div style={styles.container}>
      {isValid ? <Check size={16} /> : <X size={16} />}
      {showText && <span>Validity {isValid ? "✓" : "✗"}</span>}
    </div>
  );
};

export default ValidationIndicator;
