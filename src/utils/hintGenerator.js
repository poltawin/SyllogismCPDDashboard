// src/utils/hintGenerator.js

import { getSyllogismName } from "./syllogismValidation";

/**
 * Generates educational hints based on the current syllogism state
 */
export const generateHint = (statementType, figure, validity) => {
  const syllogismName = getSyllogismName(statementType, figure);

  if (validity) {
    return {
      type: "success",
      title: `Valid Syllogism: ${syllogismName}`,
      message: getValidSyllogismHint(statementType, figure, syllogismName),
    };
  } else {
    return {
      type: "error",
      title: "Invalid Syllogism",
      message: getInvalidSyllogismHint(statementType, figure),
    };
  }
};

const getValidSyllogismHint = (statementType, figure, name) => {
  const hints = {
    "EAE-1":
      "In Celarent, the negative major premise (E) establishes that no M are P. The universal affirmative minor (A) places all S within M. Therefore, no S can be P.",

    "AAA-1":
      "Barbara is the fundamental syllogism! Both premises are universal affirmative (A), and the middle term M perfectly links S to P through the chain: All S→M→P.",

    "AII-1":
      "Darii uses a particular conclusion (I). The universal major (A) ensures all M are P, and the particular minor (I) places at least some S in M, yielding 'Some S are P'.",

    "EIO-1":
      "Ferio combines a negative major (E) with a particular minor (I). Since some S are M and no M are P, we can conclude that some S are not P.",

    "EAE-2":
      "Cesare (Figure 2) reverses the major premise to P-M. The negative major excludes all P from M, and since all S are M, no S can be P.",

    "AEE-2":
      "Camestres uses two negative propositions to reach a negative conclusion. All P are M, but no S are M, so no S can be P.",

    "EIO-2":
      "Festino (Figure 2) follows the same pattern as Ferio but with P-M arrangement. Some S are M, but no P are M, therefore some S are not P.",

    "AOO-2":
      "Baroco is unique—it's the only valid AOO form. All P are M, but some S are not M, so some S cannot be P.",

    "IAI-3":
      "Darapti (Figure 3) has M as subject in both premises. Some M are P and all M are S, ensuring at least some S are P.",

    "AII-3":
      "Datisi is Figure 3's version of Darii. All M are P and some M are S yields 'Some S are P'.",

    "OAO-3":
      "Bocardo uses a particular negative major. Some M are not P, but all M are S, so some S are not P.",

    "EIO-3":
      "Ferison is the Figure 3 variant of Ferio/Festino. No M are P and some M are S yields 'Some S are not P'.",
  };

  return (
    hints[`${statementType}-${figure}`] ||
    `This is a valid ${name} syllogism. Try tracing the connectors through the ternary diagram to see how the premises combine to yield the conclusion!`
  );
};

const getInvalidSyllogismHint = (statementType, figure) => {
  const [major, minor, conclusion] = statementType.split("");

  // Common fallacies
  const hints = [];

  // Both premises negative
  if ((major === "E" || major === "O") && (minor === "E" || minor === "O")) {
    hints.push(
      "❌ Both premises are negative. From two negative premises, no valid conclusion can be drawn about the relationship between S and P."
    );
  }

  // Both premises particular
  if ((major === "I" || major === "O") && (minor === "I" || minor === "O")) {
    hints.push(
      "❌ Both premises are particular. This typically fails because the middle term M isn't sufficiently distributed."
    );
  }

  // Affirmative premises, negative conclusion
  if (
    (major === "A" || major === "I") &&
    (minor === "A" || minor === "I") &&
    (conclusion === "E" || conclusion === "O")
  ) {
    hints.push(
      "❌ You cannot derive a negative conclusion from two affirmative premises."
    );
  }

  // Negative premise but affirmative conclusion
  if (
    (major === "E" || major === "O" || minor === "E" || minor === "O") &&
    (conclusion === "A" || conclusion === "I")
  ) {
    hints.push(
      "❌ When one premise is negative, the conclusion must also be negative."
    );
  }

  // Universal conclusion from particular premise
  if (
    (major === "I" || major === "O" || minor === "I" || minor === "O") &&
    (conclusion === "A" || conclusion === "E")
  ) {
    hints.push(
      "❌ Universal conclusion from particular premise(s). If a term isn't distributed in the premise, it can't be distributed in the conclusion."
    );
  }

  if (hints.length === 0) {
    hints.push(
      "This combination violates one of the syllogistic rules. Check the distribution of terms and the rules about negative/affirmative propositions."
    );
  }

  return hints.join("\n\n");
};

/**
 * Generate step-by-step guidance for analyzing a syllogism
 */
export const generateStepByStepGuide = (statementType, figure) => {
  return [
    {
      step: 1,
      title: "Identify the premises",
      description: `Major premise: ${statementType[0]}, Minor premise: ${statementType[1]}, Figure ${figure}`,
    },
    {
      step: 2,
      title: "Draw binary CPDs",
      description:
        "Look at the Major and Minor diagrams. Each connector represents a possible case (subset).",
    },
    {
      step: 3,
      title: "Compose into ternary",
      description:
        "Apply composition rules C1-C3 to combine premise connectors into the Result diagram.",
    },
    {
      step: 4,
      title: "Compare with conclusion",
      description:
        "Use validity rules V1-V4 to check if the Result properly implies the Conclusion.",
    },
  ];
};
