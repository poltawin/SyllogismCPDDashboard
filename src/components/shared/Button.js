import React from "react";

const Button = ({
  children,
  onClick,
  variant = "primary",
  icon: Icon,
  disabled = false,
  ...props
}) => {
  const baseStyles = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 16px",
    borderRadius: "4px",
    border: "none",
    cursor: disabled ? "not-allowed" : "pointer",
    fontSize: "0.875rem",
    fontWeight: "500",
    transition: "background-color 0.2s",
    opacity: disabled ? 0.6 : 1,
  };

  const variants = {
    primary: {
      backgroundColor: "#3b82f6",
      color: "white",
    },
    secondary: {
      backgroundColor: "#6b7280",
      color: "white",
    },
    success: {
      backgroundColor: "#059669",
      color: "white",
    },
    danger: {
      backgroundColor: "#dc2626",
      color: "white",
    },
  };

  const hoverStyles = {
    primary: { backgroundColor: "#2563eb" },
    secondary: { backgroundColor: "#4b5563" },
    success: { backgroundColor: "#047857" },
    danger: { backgroundColor: "#b91c1c" },
  };

  const buttonStyles = {
    ...baseStyles,
    ...variants[variant],
  };

  const handleMouseEnter = (e) => {
    if (!disabled) {
      Object.assign(e.target.style, hoverStyles[variant]);
    }
  };

  const handleMouseLeave = (e) => {
    if (!disabled) {
      Object.assign(e.target.style, variants[variant]);
    }
  };

  return (
    <button
      style={buttonStyles}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      disabled={disabled}
      {...props}
    >
      {Icon && <Icon size={16} />}
      {children}
    </button>
  );
};

export default Button;
