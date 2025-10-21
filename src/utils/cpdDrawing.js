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
  connectors.forEach((connector) => {
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

export const createTernaryCPD = (
  svgElement,
  ternaryConnectors,
  width = 280,
  height = 160
) => {
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

  // If no connectors provided, show placeholder
  if (!ternaryConnectors || ternaryConnectors.length !== 8) {
    return;
  }

  // Define the 8 connector paths
  const paths = [
    // Upper triangle (0-1): S and P members
    {
      points: [
        { x: leftX, y: centerY - 35 },
        { x: centerX, y: centerY - 15 },
        { x: rightX, y: centerY - 35 },
      ],
      connector: ternaryConnectors[0],
    },
    {
      points: [
        { x: leftX, y: centerY - 28 },
        { x: centerX, y: centerY - 8 },
        { x: rightX, y: centerY - 28 },
      ],
      connector: ternaryConnectors[1],
    },

    // Descending parallelogram (2-3): S member, P non-member
    {
      points: [
        { x: leftX, y: centerY - 15 },
        { x: centerX, y: centerY + 5 },
        { x: rightX, y: centerY + 25 },
      ],
      connector: ternaryConnectors[2],
    },
    {
      points: [
        { x: leftX, y: centerY - 8 },
        { x: centerX, y: centerY + 12 },
        { x: rightX, y: centerY + 32 },
      ],
      connector: ternaryConnectors[3],
    },

    // Ascending parallelogram (4-5): S non-member, P member
    {
      points: [
        { x: leftX, y: centerY + 25 },
        { x: centerX, y: centerY + 5 },
        { x: rightX, y: centerY - 15 },
      ],
      connector: ternaryConnectors[4],
    },
    {
      points: [
        { x: leftX, y: centerY + 32 },
        { x: centerX, y: centerY + 12 },
        { x: rightX, y: centerY - 8 },
      ],
      connector: ternaryConnectors[5],
    },

    // Bottom triangle (6-7): S and P non-members
    {
      points: [
        { x: leftX, y: centerY + 28 },
        { x: centerX, y: centerY + 8 },
        { x: rightX, y: centerY + 28 },
      ],
      connector: ternaryConnectors[6],
    },
    {
      points: [
        { x: leftX, y: centerY + 35 },
        { x: centerX, y: centerY + 15 },
        { x: rightX, y: centerY + 35 },
      ],
      connector: ternaryConnectors[7],
    },
  ];

  // Draw each connector
  paths.forEach(({ points, connector }) => {
    const pathString = `M${points[0].x},${points[0].y} L${points[1].x},${points[1].y} L${points[2].x},${points[2].y}`;

    if (connector.style === "solid") {
      svg
        .append("path")
        .attr("d", pathString)
        .attr("stroke", connector.color)
        .attr("stroke-width", 3)
        .attr("fill", "none");
    } else if (connector.style === "dashed") {
      svg
        .append("path")
        .attr("d", pathString)
        .attr("stroke", connector.color)
        .attr("stroke-width", 3)
        .attr("stroke-dasharray", "8,4")
        .attr("fill", "none");
    } else if (connector.style === "double") {
      svg
        .append("path")
        .attr("d", pathString)
        .attr("stroke", connector.color)
        .attr("stroke-width", 1.5)
        .attr("fill", "none")
        .attr("transform", "translate(0,-2)");
      svg
        .append("path")
        .attr("d", pathString)
        .attr("stroke", connector.color)
        .attr("stroke-width", 1.5)
        .attr("fill", "none")
        .attr("transform", "translate(0,2)");
    }
  });
};
