import TableContext from "@/components/ui/data-display/table/TableContext";

import cn from "@/utilities/cn";

export default function Table({
  bleed = false,
  dense = false,
  grid = false,
  striped = false,
  className,
  children,
  ...props
}: { bleed?: boolean; dense?: boolean; grid?: boolean; striped?: boolean } & React.ComponentPropsWithoutRef<"div">) {
  return (
    <TableContext.Provider value={{ bleed, dense, grid, striped } as React.ContextType<typeof TableContext>}>
      <div className="flow-root">
        <div {...props} className={cn(className, "-mx-(--gutter) overflow-x-auto whitespace-nowrap")}>
          <div className={cn("inline-block min-w-full align-middle", !bleed && "sm:px-(--gutter)")}>
            <table className="min-w-full text-left text-sm/6 text-zinc-950 dark:text-white">{children}</table>
          </div>
        </div>
      </div>
    </TableContext.Provider>
  );
}
