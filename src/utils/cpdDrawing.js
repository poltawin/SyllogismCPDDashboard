import * as d3 from "d3";

export const drawConnector = (svg, x1, y1, x2, y2, style, color) => {
  if (style === "solid") {
    svg
      .append("line")
      .attr("x1", x1)
      .attr("y1", y1)
      .attr("x2", x2)
      .attr("y2", y2)
      .attr("stroke", color)
      .attr("stroke-width", 3);
  } else if (style === "dashed") {
    svg
      .append("line")
      .attr("x1", x1)
      .attr("y1", y1)
      .attr("x2", x2)
      .attr("y2", y2)
      .attr("stroke", color)
      .attr("stroke-width", 3)
      .attr("stroke-dasharray", "8,4");
  } else if (style === "double") {
    svg
      .append("line")
      .attr("x1", x1)
      .attr("y1", y1 - 2)
      .attr("x2", x2)
      .attr("y2", y2 - 2)
      .attr("stroke", color)
      .attr("stroke-width", 1.5);
    svg
      .append("line")
      .attr("x1", x1)
      .attr("y1", y1 + 2)
      .attr("x2", x2)
      .attr("y2", y2 + 2)
      .attr("stroke", color)
      .attr("stroke-width", 1.5);
  }
};

export const createBinaryCPD = (
  type,
  subject,
  predicate,
  svgElement,
  width = 180,
  height = 120,
  connectors
) => {
  const svg = d3.select(svgElement);
  svg.selectAll("*").remove();

  svg.attr("width", width).attr("height", height);

  const centerY = height / 2;
  const leftX = 40;
  const rightX = width - 40;
  const topOffset = 25;
  const bottomOffset = 25;

  // Draw variable labels
  svg
    .append("text")
    .attr("x", leftX)
    .attr("y", centerY + 5)
    .attr("text-anchor", "middle")
    .attr("font-size", "18")
    .attr("font-weight", "bold")
    .text(subject);

  svg
    .append("text")
    .attr("x", rightX)
    .attr("y", centerY + 5)
    .attr("text-anchor", "middle")
    .attr("font-size", "18")
    .attr("font-weight", "bold")
    .text(predicate);

  // Draw connectors
  connectors.forEach((connector, index) => {
    const startY =
      connector.start === "top" ? centerY - topOffset : centerY + bottomOffset;
    const endY =
      connector.end === "top" ? centerY - topOffset : centerY + bottomOffset;

    drawConnector(
      svg,
      leftX,
      startY,
      rightX,
      endY,
      connector.style,
      connector.color
    );
  });
};

export const createTernaryCPD = (svgElement, width = 280, height = 160) => {
  const svg = d3.select(svgElement);
  svg.selectAll("*").remove();

  svg.attr("width", width).attr("height", height);

  const centerX = width / 2;
  const centerY = height / 2;
  const leftX = 60;
  const rightX = width - 60;

  // Draw S-M-P labels
  svg
    .append("text")
    .attr("x", leftX)
    .attr("y", centerY + 5)
    .attr("text-anchor", "middle")
    .attr("font-size", "18")
    .attr("font-weight", "bold")
    .text("S");

  svg
    .append("text")
    .attr("x", centerX)
    .attr("y", centerY + 5)
    .attr("text-anchor", "middle")
    .attr("font-size", "18")
    .attr("font-weight", "bold")
    .text("M");

  svg
    .append("text")
    .attr("x", rightX)
    .attr("y", centerY + 5)
    .attr("text-anchor", "middle")
    .attr("font-size", "18")
    .attr("font-weight", "bold")
    .text("P");

  // Draw ternary connectors in triangular/parallelogram patterns
  const patterns = [
    // Upper triangle
    {
      path: `M${leftX},${centerY - 35} L${centerX},${centerY - 15} L${rightX},${
        centerY - 35
      }`,
      color: "#059669",
      style: "solid",
    },
    // Descending parallelogram
    {
      path: `M${leftX},${centerY - 15} L${centerX},${centerY + 5} L${rightX},${
        centerY + 35
      }`,
      color: "#dc2626",
      style: "dashed",
    },
    // Ascending parallelogram
    {
      path: `M${leftX},${centerY + 35} L${centerX},${centerY + 5} L${rightX},${
        centerY - 15
      }`,
      color: "#7c3aed",
      style: "solid",
    },
    // Bottom triangle
    {
      path: `M${leftX},${centerY + 35} L${centerX},${centerY + 15} L${rightX},${
        centerY + 35
      }`,
      color: "#ea580c",
      style: "double",
    },
  ];

  patterns.forEach((pattern) => {
    if (pattern.style === "solid") {
      svg
        .append("path")
        .attr("d", pattern.path)
        .attr("stroke", pattern.color)
        .attr("stroke-width", 3)
        .attr("fill", "none");
    } else if (pattern.style === "dashed") {
      svg
        .append("path")
        .attr("d", pattern.path)
        .attr("stroke", pattern.color)
        .attr("stroke-width", 3)
        .attr("stroke-dasharray", "8,4")
        .attr("fill", "none");
    } else if (pattern.style === "double") {
      svg
        .append("path")
        .attr("d", pattern.path)
        .attr("stroke", pattern.color)
        .attr("stroke-width", 1.5)
        .attr("fill", "none")
        .attr("transform", "translate(0,-2)");
      svg
        .append("path")
        .attr("d", pattern.path)
        .attr("stroke", pattern.color)
        .attr("stroke-width", 1.5)
        .attr("fill", "none")
        .attr("transform", "translate(0,2)");
    }
  });
};
