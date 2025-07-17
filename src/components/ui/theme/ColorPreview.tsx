

import { COLOR_PREVIEWS, type DaltonismType } from "./colorPreviews";

export function ColorPreview({ daltonismType = "default", className = "" }: { daltonismType?: DaltonismType; className?: string }) {
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
