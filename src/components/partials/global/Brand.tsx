import Logo from "@/components/partials/global/Logo";

import cn from "@/utils/cn";

export default function Brand() {
  return (
    <div className={cn("w-content flex items-center gap-2")}>
      <Logo className={cn("size-8")} />
      <span className={cn("font-logo text-2xl font-bold")}>Pick'n'Talk</span>
      <span className={cn("px-2 text-sm self-end font-medium rounded-full bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-950")}>{__APP_VERSION__}</span>
    </div>
  )
}