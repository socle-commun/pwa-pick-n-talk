import Logo from "@/components/partials/global/Logo";

import cn from "@/utils/cn";

export default function Brand() {
  return (
    <div className={cn("w-content flex items-center gap-1.5 sm:gap-2 min-w-0")}>
      <Logo className={cn("size-7 sm:size-8 flex-shrink-0")} />
      <span className={cn("font-logo text-lg sm:text-2xl font-bold theme-text-primary truncate")}>Pick'n'Talk</span>
      <span
        className={cn(
          "px-1.5 sm:px-2 text-xs sm:text-sm self-end font-medium rounded-full theme-bg-primary theme-text-inverse flex-shrink-0"
        )}
      >
        {__APP_VERSION__}
      </span>
    </div>
  );
}
