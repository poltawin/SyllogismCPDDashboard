import React from "react";
import { HelpCircle, RotateCcw } from "lucide-react";

// Custom Hooks
import { useSyllogismLogic } from "./hooks/useSyllogismLogic";

// Utils
import { getSyllogismName } from "./utils/syllogismValidation";

// Components
import TermsSection from "./components/TermsSection/TermsSection";
import ValidationIndicator from "./components/shared/ValidationIndicator";
import Button from "./components/shared/Button";
import CPDDiagram from "./components/DiagramsSection/CPDDiagram";
import PropositionSelector from "./components/shared/PropositionSelector";
import { TypeSelector, FigureSelector } from "./components/shared/TypeSelector";

const App = () => {
  const {
    // State
    terms,
    statementType,
    figure,
    major,
    minor,
    conclusion,
    validity,
    showHint,
    ternaryConnectors, // NEW: Get composed ternary connectors

    // Setters
    setTerms,
    setStatementType,
    setFigure,
    setMajor,
    setMinor,
    setConclusion,

    // Actions
    clearAll,
    toggleHint,
  } = useSyllogismLogic();

  const qualities = ["Universal", "Particular"];
  const quantities = ["Affirmative", "Negative"];

  const figures = [
    { value: "1", label: "Figure 1: M-P, S-M :- S-P" },
    { value: "2", label: "Figure 2: P-M, S-M :- S-P" },
    { value: "3", label: "Figure 3: M-P, M-S :- S-P" },
    { value: "4", label: "Figure 4: P-M, M-S :- S-P" },
  ];

  const types = [
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
  ];

  // Get syllogism name for display
  const syllogismName = getSyllogismName(statementType, figure);

  const styles = {
    container: {
      minHeight: "100vh",
      backgroundColor: "#f9fafb",
      padding: "16px",
    },
    content: {
      maxWidth: "1200px",
      margin: "0 auto",
    },
    header: {
      textAlign: "center",
      marginBottom: "24px",
    },
    title: {
      fontSize: "2rem",
      fontWeight: "bold",
      color: "#111827",
      marginBottom: "8px",
    },
    mainPanel: {
      backgroundColor: "white",
      borderRadius: "8px",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      padding: "24px",
    },
    dialogueWindow: {
      marginBottom: "24px",
    },
    dialogueBox: {
      border: "2px solid #d1d5db",
      padding: "16px",
      borderRadius: "4px",
      backgroundColor: "#f9fafb",
      minHeight: "64px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    dialogueText: {
      fontSize: "1.125rem",
      fontWeight: "500",
      color: "#374151",
    },
    validityContainer: {
      display: "flex",
      justifyContent: "flex-end",
      marginTop: "8px",
    },
    statementsSection: {
      marginBottom: "24px",
    },
    sectionTitle: {
      fontSize: "1.125rem",
      fontWeight: "600",
      marginBottom: "12px",
    },
    statementsControls: {
      display: "grid",
      gridTemplateColumns: "2fr 1fr", // Changed: Give more space to Type selector
      gap: "16px",
      marginBottom: "16px",
    },
    statementsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "16px",
    },
    statementBox: {
      border: "1px solid #d1d5db",
      padding: "12px",
      borderRadius: "4px",
      minHeight: "128px",
    },
    conclusionBox: {
      backgroundColor: "#f0fdf4",
    },
    statementText: {
      fontSize: "0.875rem",
      marginBottom: "12px",
      minHeight: "40px",
    },
    selectGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "8px",
    },
    select: {
      padding: "4px",
      border: "1px solid #d1d5db",
      borderRadius: "4px",
      fontSize: "0.75rem",
    },
    diagramsSection: {
      marginBottom: "24px",
    },
    diagramsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: "16px",
    },
    rulesSection: {
      marginBottom: "16px",
    },
    rulesBox: {
      border: "1px solid #d1d5db",
      padding: "16px",
      borderRadius: "4px",
      backgroundColor: "#f9fafb",
      minHeight: "64px",
    },
    rulesContent: {
      display: "flex",
      gap: "16px",
      fontSize: "0.875rem",
      color: "#6b7280",
    },
    controls: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "12px",
    },
    hint: {
      marginTop: "16px",
      padding: "16px",
      backgroundColor: "#fefce8",
      border: "1px solid #facc15",
      borderRadius: "4px",
    },
    hintText: {
      fontSize: "0.875rem",
      color: "#92400e",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>Diagrammatic Syllogism Tutor</h1>
        </div>

        {/* Main Interface */}
        <div style={styles.mainPanel}>
          {/* Dialogue Window */}
          <div style={styles.dialogueWindow}>
            <div style={styles.dialogueBox}>
              <div style={{ textAlign: "left", lineHeight: "1.6" }}>
                <div style={{ marginBottom: "8px" }}>
                  <strong>Major:</strong> {major.text}
                </div>
                <div style={{ marginBottom: "8px" }}>
                  <strong>Minor:</strong> {minor.text}
                </div>
                <div
                  style={{
                    borderTop: "1px solid #d1d5db",
                    paddingTop: "8px",
                    fontWeight: "600",
                  }}
                >
                  <strong>∴ Conclusion:</strong> {conclusion.text}
                </div>
              </div>
            </div>
            <div style={styles.validityContainer}>
              <ValidationIndicator
                isValid={validity}
                syllogismName={syllogismName}
              />
            </div>
          </div>

          {/* Terms Section */}
          <TermsSection terms={terms} setTerms={setTerms} />

          {/* Statements Section */}
          <div style={styles.statementsSection}>
            <h3 style={styles.sectionTitle}>Statements</h3>

            <div style={styles.statementsControls}>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    marginBottom: "8px",
                  }}
                >
                  Type (Mood)
                </label>
                <TypeSelector
                  value={statementType}
                  onChange={setStatementType}
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    marginBottom: "8px",
                  }}
                >
                  Figure
                </label>
                <FigureSelector value={figure} onChange={setFigure} />
              </div>
            </div>
          </div>

          {/* Major, Minor, Conclusion */}
          <div style={styles.statementsGrid}>
            <div>
              <h4 style={{ fontWeight: "500", marginBottom: "8px" }}>Major</h4>
              <div style={styles.statementBox}>
                <p style={styles.statementText}>{major.text}</p>
                <PropositionSelector
                  quality={major.quality}
                  quantity={major.quantity}
                  onQualityChange={(value) =>
                    setMajor({ ...major, quality: value })
                  }
                  onQuantityChange={(value) =>
                    setMajor({ ...major, quantity: value })
                  }
                />
              </div>
            </div>

            <div>
              <h4 style={{ fontWeight: "500", marginBottom: "8px" }}>Minor</h4>
              <div style={styles.statementBox}>
                <p style={styles.statementText}>{minor.text}</p>
                <PropositionSelector
                  quality={minor.quality}
                  quantity={minor.quantity}
                  onQualityChange={(value) =>
                    setMinor({ ...minor, quality: value })
                  }
                  onQuantityChange={(value) =>
                    setMinor({ ...minor, quantity: value })
                  }
                />
              </div>
            </div>

            <div>
              <h4 style={{ fontWeight: "500", marginBottom: "8px" }}>
                Conclusion
              </h4>
              <div style={{ ...styles.statementBox, ...styles.conclusionBox }}>
                <p style={styles.statementText}>{conclusion.text}</p>
                <PropositionSelector
                  quality={conclusion.quality}
                  quantity={conclusion.quantity}
                  onQualityChange={(value) =>
                    setConclusion({ ...conclusion, quality: value })
                  }
                  onQuantityChange={(value) =>
                    setConclusion({ ...conclusion, quantity: value })
                  }
                />
              </div>
            </div>
          </div>

          {/* Diagrams Section */}
          <div style={styles.diagramsSection}>
            <h3 style={styles.sectionTitle}>Diagrams</h3>
            <div style={styles.diagramsGrid}>
              <CPDDiagram
                title="Minor"
                type="binary"
                subject="S"
                predicate="M"
                proposition={minor}
              />

              <CPDDiagram
                title="Major"
                type="binary"
                subject="M"
                predicate="P"
                proposition={major}
              />

              <CPDDiagram
                title="Result"
                type="ternary"
                ternaryConnectors={ternaryConnectors}
                width={280}
                height={160}
              />

              <CPDDiagram
                title="Conclusion"
                type="binary"
                subject="S"
                predicate="P"
                proposition={conclusion}
                showValidation={true}
              />
            </div>
          </div>

          {/* Rules Section */}
          <div style={styles.rulesSection}>
            <h3 style={styles.sectionTitle}>Rules</h3>
            <div style={styles.rulesBox}>
              <div style={styles.rulesContent}>
                <span>◇ ⇒ ——</span>
                <span>◇ ⇒ ——</span>
              </div>
            </div>
          </div>

          {/* Bottom Controls */}
          <div style={styles.controls}>
            <Button variant="primary" icon={HelpCircle} onClick={toggleHint}>
              Hint
            </Button>
            <Button variant="secondary" icon={RotateCcw} onClick={clearAll}>
              Clear
            </Button>
          </div>

          {/* Hint Display */}
          {showHint && (
            <div style={styles.hint}>
              <p style={styles.hintText}>
                <strong>Hint:</strong> Check if the middle term is distributed
                in at least one premise, and ensure terms that are distributed
                in the conclusion are also distributed in the premises.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
