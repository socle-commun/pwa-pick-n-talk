import PictogramCard from "./PictogramCard";
import { type Pictogram } from "@/db/models";
import cn from "@/utils/cn";

export interface PictogramsGridLayoutProps {
  pictograms: Pictogram[];
  className?: string;
}

export function PictogramsGridLayout({ pictograms, className }: PictogramsGridLayoutProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 p-4",
        className
      )}
    >
      {pictograms.map((pictogram: Pictogram) => (
        <PictogramCard key={pictogram.id} pictogram={pictogram} />
      ))}
    </div>
  );
}
