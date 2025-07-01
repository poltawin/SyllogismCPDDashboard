import React from "react";

const TermsSection = ({ terms, setTerms }) => {
  const styles = {
    section: {
      marginBottom: "24px",
    },
    title: {
      fontSize: "1.125rem",
      fontWeight: "600",
      marginBottom: "12px",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: "16px",
      alignItems: "center",
    },
    inputGroup: {
      display: "flex",
      flexDirection: "column",
    },
    label: {
      display: "block",
      fontSize: "0.875rem",
      fontWeight: "500",
      marginBottom: "4px",
    },
    input: {
      width: "100%",
      padding: "8px",
      border: "1px solid #d1d5db",
      borderRadius: "4px",
      fontSize: "0.875rem",
    },
    subjectInput: {
      backgroundColor: "#dcfce7",
    },
    predicateInput: {
      backgroundColor: "#dcfce7",
    },
    middleInput: {
      backgroundColor: "#f3f4f6",
    },
    levelGroup: {
      display: "flex",
      gap: "8px",
      alignItems: "center",
    },
    button: {
      padding: "4px 12px",
      backgroundColor: "#e5e7eb",
      borderRadius: "4px",
      fontSize: "0.875rem",
      border: "none",
      cursor: "pointer",
    },
  };

  const handleTermChange = (termType, value) => {
    setTerms((prev) => ({
      ...prev,
      [termType]: value,
    }));
  };

  return (
    <div style={styles.section}>
      <h3 style={styles.title}>Terms</h3>
      <div style={styles.grid}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>S: Subject</label>
          <input
            type="text"
            value={terms.S}
            onChange={(e) => handleTermChange("S", e.target.value)}
            style={{ ...styles.input, ...styles.subjectInput }}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>P: Predicate</label>
          <input
            type="text"
            value={terms.P}
            onChange={(e) => handleTermChange("P", e.target.value)}
            style={{ ...styles.input, ...styles.predicateInput }}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>M: Middle</label>
          <input
            type="text"
            value={terms.M}
            onChange={(e) => handleTermChange("M", e.target.value)}
            style={{ ...styles.input, ...styles.middleInput }}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Level</label>
          <div style={styles.levelGroup}>
            <span style={{ fontSize: "0.875rem" }}>Colour</span>
            <button style={styles.button}>BW/colour</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsSection;
