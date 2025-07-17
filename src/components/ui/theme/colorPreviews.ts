type DaltonismType = "default" | "protanopia" | "deuteranopia" | "tritanopia";

export const COLOR_PREVIEWS: Record<DaltonismType, {
  success: string;
  warning: string;
  error: string;
  info: string;
}> = {
  default: {
    success: "rgb(34, 197, 94)", // Original green
    warning: "rgb(234, 179, 8)", // Original yellow
    error: "rgb(239, 68, 68)",   // Original red
    info: "rgb(59, 130, 246)"    // Original blue
  },
  protanopia: {
    success: "#A3A3A3",
    warning: "#FFD700",
    error: "#B22222",
    info: "#4682B4"
  },
  deuteranopia: {
    success: "#A3A3A3",
    warning: "#FFD700",
    error: "#B22222",
    info: "#4682B4"
  },
  tritanopia: {
    success: "#A3A3A3",
    warning: "#FFD700",
    error: "#B22222",
    info: "#4682B4"
  }
};

export type { DaltonismType };
