// src/hooks/useSyllogismLogic.js - Enhanced version

import { useState, useCallback, useEffect, useMemo } from "react";
import {
  getPropositionType,
  formatStatement,
  getCPDConnectors,
} from "../utils/propositionHelpers";
import { validateSyllogism } from "../utils/syllogismValidation";
import { composeTernaryCPD } from "../utils/ternaryComposition";

// Helper functions for type conversions
const getQualityQuantityFromType = (type) => {
  const mapping = {
    A: { quality: "Universal", quantity: "Affirmative" },
    E: { quality: "Universal", quantity: "Negative" },
    I: { quality: "Particular", quantity: "Affirmative" },
    O: { quality: "Particular", quantity: "Negative" },
  };
  return mapping[type] || { quality: "Universal", quantity: "Affirmative" };
};

const parseStatementType = (statementType) => {
  return {
    major: statementType[0] || "A",
    minor: statementType[1] || "A",
    conclusion: statementType[2] || "A",
  };
};

const buildStatementType = (majorType, minorType, conclusionType) => {
  return majorType + minorType + conclusionType;
};

export const useSyllogismLogic = () => {
  const [terms, setTerms] = useState({
    S: "Venn diagrams",
    P: "Sentential notation",
    M: "Diagrams",
  });

  const [statementType, setStatementType] = useState("EAE");
  const [figure, setFigure] = useState("1");

  const [major, setMajor] = useState({
    quality: "Universal",
    quantity: "Negative",
    text: "No diagrams are sentential notations",
  });

  const [minor, setMinor] = useState({
    quality: "Universal",
    quantity: "Affirmative",
    text: "All Venn diagrams are diagrams",
  });

  const [conclusion, setConclusion] = useState({
    quality: "Universal",
    quantity: "Negative",
    text: "No Venn Diagrams are sentential notations",
  });

  const [validity, setValidity] = useState(true);
  const [showHint, setShowHint] = useState(false);
  const [isUpdatingFromType, setIsUpdatingFromType] = useState(false);

  // Compute ternary CPD connectors
  const ternaryConnectors = useMemo(() => {
    const majorType = getPropositionType(major.quality, major.quantity);
    const minorType = getPropositionType(minor.quality, minor.quantity);

    const majorConnectors = getCPDConnectors(majorType);
    const minorConnectors = getCPDConnectors(minorType);

    return composeTernaryCPD(minorConnectors, majorConnectors, figure);
  }, [major.quality, major.quantity, minor.quality, minor.quantity, figure]);

  // Update individual premises when statement type changes
  const updatePremisesFromType = useCallback((newStatementType) => {
    setIsUpdatingFromType(true);

    const types = parseStatementType(newStatementType);
    const majorQualQuant = getQualityQuantityFromType(types.major);
    const minorQualQuant = getQualityQuantityFromType(types.minor);
    const conclusionQualQuant = getQualityQuantityFromType(types.conclusion);

    setMajor((prev) => ({
      ...prev,
      quality: majorQualQuant.quality,
      quantity: majorQualQuant.quantity,
    }));

    setMinor((prev) => ({
      ...prev,
      quality: minorQualQuant.quality,
      quantity: minorQualQuant.quantity,
    }));

    setConclusion((prev) => ({
      ...prev,
      quality: conclusionQualQuant.quality,
      quantity: conclusionQualQuant.quantity,
    }));

    setTimeout(() => setIsUpdatingFromType(false), 10);
  }, []);

  // Update statement type when individual premises change
  const updateTypeFromPremises = useCallback(() => {
    if (isUpdatingFromType) return;

    const majorType = getPropositionType(major.quality, major.quantity);
    const minorType = getPropositionType(minor.quality, minor.quantity);
    const conclusionType = getPropositionType(
      conclusion.quality,
      conclusion.quantity
    );

    const newStatementType = buildStatementType(
      majorType,
      minorType,
      conclusionType
    );
    setStatementType(newStatementType);
  }, [
    major.quality,
    major.quantity,
    minor.quality,
    minor.quantity,
    conclusion.quality,
    conclusion.quantity,
    isUpdatingFromType,
  ]);

  const updateStatementText = useCallback(() => {
    const majorType = getPropositionType(major.quality, major.quantity);
    const minorType = getPropositionType(minor.quality, minor.quantity);
    const conclusionType = getPropositionType(
      conclusion.quality,
      conclusion.quantity
    );

    let majorText = "";
    let minorText = "";

    // Major premise arrangement based on figure
    if (figure === "1" || figure === "3") {
      majorText = formatStatement(majorType, terms.M, terms.P);
    } else {
      majorText = formatStatement(majorType, terms.P, terms.M);
    }

    // Minor premise arrangement based on figure
    if (figure === "1" || figure === "2") {
      minorText = formatStatement(minorType, terms.S, terms.M);
    } else {
      minorText = formatStatement(minorType, terms.M, terms.S);
    }

    const conclusionText = formatStatement(conclusionType, terms.S, terms.P);

    setMajor((prev) => ({ ...prev, text: majorText }));
    setMinor((prev) => ({ ...prev, text: minorText }));
    setConclusion((prev) => ({ ...prev, text: conclusionText }));
  }, [
    terms,
    major.quality,
    major.quantity,
    minor.quality,
    minor.quantity,
    conclusion.quality,
    conclusion.quantity,
    figure,
  ]);

  const checkValidity = useCallback(() => {
    const isValid = validateSyllogism(statementType, figure);
    setValidity(isValid);
  }, [statementType, figure]);

  const clearAll = useCallback(() => {
    setTerms({ S: "Subject", P: "Predicate", M: "Middle" });
    setStatementType("AAA");
    setFigure("1");
    setMajor({
      quality: "Universal",
      quantity: "Affirmative",
      text: "All Middle are Predicate",
    });
    setMinor({
      quality: "Universal",
      quantity: "Affirmative",
      text: "All Subject are Middle",
    });
    setConclusion({
      quality: "Universal",
      quantity: "Affirmative",
      text: "All Subject are Predicate",
    });
    setValidity(true);
    setShowHint(false);
  }, []);

  const toggleHint = useCallback(() => {
    setShowHint((prev) => !prev);
  }, []);

  const handleStatementTypeChange = useCallback(
    (newType) => {
      setStatementType(newType);
      updatePremisesFromType(newType);
    },
    [updatePremisesFromType]
  );

  // Effects for synchronization
  useEffect(() => {
    updateTypeFromPremises();
  }, [updateTypeFromPremises]);

  useEffect(() => {
    updateStatementText();
  }, [updateStatementText]);

  useEffect(() => {
    checkValidity();
  }, [checkValidity]);

  return {
    // State
    terms,
    statementType,
    figure,
    major,
    minor,
    conclusion,
    validity,
    showHint,
    ternaryConnectors, // NEW: Expose composed ternary connectors

    // Setters
    setTerms,
    setStatementType: handleStatementTypeChange,
    setFigure,
    setMajor,
    setMinor,
    setConclusion,

    // Actions
    updateStatementText,
    checkValidity,
    clearAll,
    toggleHint,
  };
};
