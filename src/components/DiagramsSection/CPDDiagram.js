import React, { useRef, useEffect } from "react";
import { createBinaryCPD, createTernaryCPD } from "../../utils/cpdDrawing";
import {
  getCPDConnectors,
  getPropositionType,
} from "../../utils/propositionHelpers";

const CPDDiagram = ({
  title,
  type = "binary",
  subject,
  predicate,
  proposition,
  ternaryConnectors,
  showValidation = false,
  width = 180,
  height = 120,
}) => {
  const svgRef = useRef();

  const styles = {
    container: {
      textAlign: "center",
    },
    title: {
      fontWeight: "500",
      marginBottom: "8px",
      fontSize: "0.875rem",
    },
    diagramWrapper: {
      border: "1px solid #d1d5db",
      borderRadius: "4px",
      padding: "8px",
      backgroundColor: "#f9fafb",
      position: "relative",
    },
    validation: {
      position: "absolute",
      top: "8px",
      right: "8px",
      fontSize: "0.75rem",
    },
  };

  useEffect(() => {
    if (!svgRef.current) return;

    if (type === "binary" && proposition) {
      const propType = getPropositionType(
        proposition.quality,
        proposition.quantity
      );
      const connectors = getCPDConnectors(propType);
      createBinaryCPD(
        propType,
        subject,
        predicate,
        svgRef.current,
        width,
        height,
        connectors
      );
    } else if (type === "ternary") {
      createTernaryCPD(svgRef.current, ternaryConnectors, width, height);
    }
  }, [type, subject, predicate, proposition, ternaryConnectors, width, height]);

  return (
    <div style={styles.container}>
      <h4 style={styles.title}>{title}</h4>
      <div style={styles.diagramWrapper}>
        <svg ref={svgRef}></svg>
        {showValidation && (
          <div style={styles.validation}>
            <span>✓</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CPDDiagram;
