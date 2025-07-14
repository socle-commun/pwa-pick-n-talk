import cn from "@/utils/cn";

export default function TouchTarget({ children }: { children: React.ReactNode }) {
  return (
    <>
      <span
        className={cn("absolute top-1/2 left-1/2 size-[max(100%,2.75rem)] -translate-x-1/2 -translate-y-1/2 pointer-fine:hidden")}
        aria-hidden="true"
      />
      {children}
    </>
  )
}