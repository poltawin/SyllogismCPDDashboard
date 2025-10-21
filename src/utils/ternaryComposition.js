// src/utils/ternaryComposition.js

/**
 * Composition rules from the CPD paper (Fig. 9)
 * C1: Both "some" → "some"
 * C1: One "some" + one "no-info" → "some"
 * C2: Both "no-info" → "no-info"
 * C3: Any "none" (one or both) → "none"
 */
export const composeConnectors = (style1, style2) => {
  // C3: If either is "none", result is "none"
  if (style1 === "dashed" || style2 === "dashed") {
    return { style: "dashed", color: "#dc2626" };
  }

  // C1: If either is "some", result is "some"
  if (style1 === "solid" || style2 === "solid") {
    return { style: "solid", color: "#059669" };
  }

  // C2: Both "no-info" → "no-info"
  return { style: "double", color: "#6b7280" };
};

// Helper function removed - was not needed in final implementation

/**
 * Creates ternary CPD by composing two binary premise CPDs
 * Based on Figure arrangement: S-M (minor) and M-P (major)
 *
 * The 8 ternary connectors map to premise connector pairs:
 * Upper Triangle (S and P both members):
 *   - Connector 0 (S∩M∩P): minor[0] + major[0]
 *   - Connector 1 (S∩¬M∩P): minor[1] + major[2]
 *
 * Descending Parallelogram (S member, P non-member):
 *   - Connector 2 (S∩M∩¬P): minor[0] + major[1]
 *   - Connector 3 (S∩¬M∩¬P): minor[1] + major[3]
 *
 * Ascending Parallelogram (S non-member, P member):
 *   - Connector 4 (¬S∩M∩P): minor[2] + major[0]
 *   - Connector 5 (¬S∩¬M∩P): minor[3] + major[2]
 *
 * Bottom Triangle (S and P both non-members):
 *   - Connector 6 (¬S∩M∩¬P): minor[2] + major[1]
 *   - Connector 7 (¬S∩¬M∩¬P): minor[3] + major[3]
 */
export const composeTernaryCPD = (minorConnectors, majorConnectors, figure) => {
  // Adjust connector mappings based on figure type
  // Figure 1: M-P, S-M → standard mapping
  // Figure 2: P-M, S-M → reflect major premise
  // Figure 3: M-P, M-S → reflect minor premise
  // Figure 4: P-M, M-S → reflect both premises

  let minor = [...minorConnectors];
  let major = [...majorConnectors];

  // Apply reflections based on figure
  if (figure === "2" || figure === "4") {
    // Reflect major premise (P-M becomes M-P)
    major = [major[0], major[2], major[1], major[3]];
  }

  if (figure === "3" || figure === "4") {
    // Reflect minor premise (M-S becomes S-M)
    minor = [minor[0], minor[2], minor[1], minor[3]];
  }

  // Compose the 8 ternary connectors
  const ternaryConnectors = [
    // Upper triangle (inverted V shape)
    composeConnectors(minor[0].style, major[0].style), // S∩M∩P
    composeConnectors(minor[1].style, major[2].style), // S∩¬M∩P

    // Descending parallelogram (\\ shape)
    composeConnectors(minor[0].style, major[1].style), // S∩M∩¬P
    composeConnectors(minor[1].style, major[3].style), // S∩¬M∩¬P

    // Ascending parallelogram (// shape)
    composeConnectors(minor[2].style, major[0].style), // ¬S∩M∩P
    composeConnectors(minor[3].style, major[2].style), // ¬S∩¬M∩P

    // Bottom triangle (V shape)
    composeConnectors(minor[2].style, major[1].style), // ¬S∩M∩¬P
    composeConnectors(minor[3].style, major[3].style), // ¬S∩¬M∩¬P
  ];

  return ternaryConnectors;
};

/**
 * Validates if ternary result implies the conclusion
 * Validity rules from the paper (Fig. 11):
 * V1: If either/both result connectors are "some" → conclusion must be "some"
 * V2: Both result connectors "none" → conclusion must be "none"
 * V3: Both "no-info" OR one "no-info" + one "none" → conclusion must be "no-info"
 * V4: All other combinations are invalid
 */
export const validateConclusion = (ternaryConnectors, conclusionConnectors) => {
  // Map ternary connector pairs to conclusion connectors:
  // Upper triangle (0,1) → conclusion[0] (top)
  // Descending parallelogram (2,3) → conclusion[1] (descending)
  // Ascending parallelogram (4,5) → conclusion[2] (ascending)
  // Bottom triangle (6,7) → conclusion[3] (bottom)

  const pairs = [
    [ternaryConnectors[0], ternaryConnectors[1], conclusionConnectors[0]],
    [ternaryConnectors[2], ternaryConnectors[3], conclusionConnectors[1]],
    [ternaryConnectors[4], ternaryConnectors[5], conclusionConnectors[2]],
    [ternaryConnectors[6], ternaryConnectors[7], conclusionConnectors[3]],
  ];

  for (const [result1, result2, conclusion] of pairs) {
    // V1: Either result is "some" → conclusion must be "some"
    if (result1.style === "solid" || result2.style === "solid") {
      if (conclusion.style !== "solid") {
        return false;
      }
    }
    // V2: Both results are "none" → conclusion must be "none"
    else if (result1.style === "dashed" && result2.style === "dashed") {
      if (conclusion.style !== "dashed") {
        return false;
      }
    }
    // V3: Both "no-info" OR mixed "no-info"/"none" → conclusion must be "no-info"
    else if (
      (result1.style === "double" && result2.style === "double") ||
      (result1.style === "double" && result2.style === "dashed") ||
      (result1.style === "dashed" && result2.style === "double")
    ) {
      if (conclusion.style !== "double") {
        return false;
      }
    }
    // V4: All other combinations are invalid
    else {
      return false;
    }
  }

  return true;
};

/**
 * Get visual pattern type for display purposes
 */
export const getPatternType = (index) => {
  if (index < 2) return "upper-triangle";
  if (index < 4) return "descending-parallelogram";
  if (index < 6) return "ascending-parallelogram";
  return "bottom-triangle";
};
