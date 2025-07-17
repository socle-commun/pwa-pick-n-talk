import { type DaltonismType } from "@/utils/daltonism/types";

// Color swatches for each daltonism type based on semantic colors
// These values match exactly with the CSS custom properties in daltonism.css
export const COLOR_PREVIEWS: Record<DaltonismType, { success: string; warning: string; error: string; info: string }> = {
  none: {
    success: "rgb(34, 197, 94)",   // Original green
    warning: "rgb(234, 179, 8)",   // Original yellow
    error: "rgb(239, 68, 68)",     // Original red
    info: "rgb(59, 130, 246)"      // Original blue
  },
  protanopia: {
    success: "rgb(59, 130, 246)",   // Blue for success - no green/red confusion
    warning: "rgb(234, 179, 8)",    // Bright yellow warning
    error: "rgb(0, 51, 204)",       // Dark blue for errors - safe for red-blind users
    info: "rgb(0, 206, 209)"        // Cyan for info - distinct from success blue
  },
  deuteranopia: {
    success: "rgb(59, 130, 246)",  // Success as blue
    warning: "rgb(234, 179, 8)",   // Yellow warning
    error: "rgb(239, 68, 68)",     // Red error - more vivid
    info: "rgb(59, 130, 246)"      // Blue info
  },
  tritanopia: {
    success: "rgb(34, 197, 94)",   // Green success
    warning: "rgb(239, 68, 68)",   // Warning as red - more visible
    error: "rgb(220, 38, 38)",     // Darker red for errors
    info: "rgb(34, 197, 94)"       // Info as green
  }
};

interface ColorPreviewProps {
  daltonismType: DaltonismType;
  className?: string;
}

export function ColorPreview({ daltonismType, className = "" }: ColorPreviewProps) {
  const colors = COLOR_PREVIEWS[daltonismType];

  return (
    <div className={`flex gap-1 ${className}`}>
      <div
        className="w-3 h-3 rounded-full border border-gray-300 dark:border-gray-600"
        style={{ backgroundColor: colors.success }}
        title="Success color"
      />
      <div
        className="w-3 h-3 rounded-full border border-gray-300 dark:border-gray-600"
        style={{ backgroundColor: colors.warning }}
        title="Warning color"
      />
      <div
        className="w-3 h-3 rounded-full border border-gray-300 dark:border-gray-600"
        style={{ backgroundColor: colors.error }}
        title="Error color"
      />
      <div
        className="w-3 h-3 rounded-full border border-gray-300 dark:border-gray-600"
        style={{ backgroundColor: colors.info }}
        title="Info color"
      />
    </div>
  );
}
