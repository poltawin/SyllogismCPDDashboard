// src/components/RulesSection/RulesDisplay.js

import React from "react";

const RulesDisplay = ({
  showCompositionRules = true,
  showValidityRules = true,
}) => {
  const styles = {
    container: {
      marginBottom: "24px",
    },
    sectionTitle: {
      fontSize: "1.125rem",
      fontWeight: "600",
      marginBottom: "12px",
    },
    rulesGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "16px",
    },
    ruleBox: {
      border: "1px solid #d1d5db",
      padding: "16px",
      borderRadius: "4px",
      backgroundColor: "#f9fafb",
    },
    ruleTitle: {
      fontSize: "0.875rem",
      fontWeight: "600",
      marginBottom: "12px",
      color: "#374151",
    },
    ruleItem: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      marginBottom: "8px",
      fontSize: "0.875rem",
      color: "#6b7280",
    },
    connector: {
      display: "inline-block",
      width: "40px",
      height: "3px",
      verticalAlign: "middle",
    },
    connectorDouble: {
      borderTop: "1.5px solid #6b7280",
      borderBottom: "1.5px solid #6b7280",
      height: "4px",
      margin: "0 4px",
    },
    connectorSolid: {
      backgroundColor: "#059669",
      height: "3px",
    },
    connectorDashed: {
      backgroundImage:
        "linear-gradient(to right, #dc2626 60%, transparent 60%)",
      backgroundSize: "8px 3px",
      backgroundRepeat: "repeat-x",
      height: "3px",
    },
    arrow: {
      fontWeight: "bold",
      color: "#374151",
    },
    label: {
      fontSize: "0.75rem",
      color: "#6b7280",
      fontStyle: "italic",
    },
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.sectionTitle}>Rules</h3>
      <div style={styles.rulesGrid}>
        {/* Composition Rules */}
        {showCompositionRules && (
          <div style={styles.ruleBox}>
            <div style={styles.ruleTitle}>Composition Rules (C1-C3)</div>

            <div style={styles.ruleItem}>
              <span style={styles.label}>C1:</span>
              <div style={{ ...styles.connector, ...styles.connectorSolid }} />
              <span>+</span>
              <div style={{ ...styles.connector, ...styles.connectorSolid }} />
              <span style={styles.arrow}>→</span>
              <div style={{ ...styles.connector, ...styles.connectorSolid }} />
              <span style={styles.label}>some</span>
            </div>

            <div style={styles.ruleItem}>
              <span style={styles.label}>C1:</span>
              <div style={{ ...styles.connector, ...styles.connectorSolid }} />
              <span>+</span>
              <div style={styles.connectorDouble} />
              <span style={styles.arrow}>→</span>
              <div style={{ ...styles.connector, ...styles.connectorSolid }} />
              <span style={styles.label}>some</span>
            </div>

            <div style={styles.ruleItem}>
              <span style={styles.label}>C2:</span>
              <div style={styles.connectorDouble} />
              <span>+</span>
              <div style={styles.connectorDouble} />
              <span style={styles.arrow}>→</span>
              <div style={styles.connectorDouble} />
              <span style={styles.label}>no-info</span>
            </div>

            <div style={styles.ruleItem}>
              <span style={styles.label}>C3:</span>
              <span>Any</span>
              <div style={{ ...styles.connector, ...styles.connectorDashed }} />
              <span style={styles.arrow}>→</span>
              <div style={{ ...styles.connector, ...styles.connectorDashed }} />
              <span style={styles.label}>none</span>
            </div>
          </div>
        )}

        {/* Validity Rules */}
        {showValidityRules && (
          <div style={styles.ruleBox}>
            <div style={styles.ruleTitle}>Validity Rules (V1-V4)</div>

            <div style={styles.ruleItem}>
              <span style={styles.label}>V1:</span>
              <span>Any</span>
              <div style={{ ...styles.connector, ...styles.connectorSolid }} />
              <span style={styles.arrow}>→</span>
              <span>Conclusion</span>
              <div style={{ ...styles.connector, ...styles.connectorSolid }} />
            </div>

            <div style={styles.ruleItem}>
              <span style={styles.label}>V2:</span>
              <span>Both</span>
              <div style={{ ...styles.connector, ...styles.connectorDashed }} />
              <span style={styles.arrow}>→</span>
              <span>Conclusion</span>
              <div style={{ ...styles.connector, ...styles.connectorDashed }} />
            </div>

            <div style={styles.ruleItem}>
              <span style={styles.label}>V3:</span>
              <span>Both</span>
              <div style={styles.connectorDouble} />
              <span>or mixed</span>
              <span style={styles.arrow}>→</span>
              <div style={styles.connectorDouble} />
            </div>

            <div style={styles.ruleItem}>
              <span style={styles.label}>V4:</span>
              <span>Other combinations</span>
              <span style={styles.arrow}>→</span>
              <span style={{ color: "#dc2626", fontWeight: "600" }}>
                Invalid
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RulesDisplay;
