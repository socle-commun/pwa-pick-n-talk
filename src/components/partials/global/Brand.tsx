import Logo from "@/components/partials/global/Logo";

export default function Brand() {
  return (
    <div className={"w-content flex items-center gap-1.5 sm:gap-2 min-w-0"}>
      <Logo className={"size-7 sm:size-8 flex-shrink-0"} />
      <span className={"font-logo text-lg sm:text-2xl font-bold theme-text-primary truncate"}>Pick'n'Talk</span>
      <span

      >
        {__APP_VERSION__}
      </span>
    </div>
  );
}
