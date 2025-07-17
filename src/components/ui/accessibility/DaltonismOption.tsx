import { type DaltonismType } from "@/utils/daltonism/types";

interface DaltonismOptionType {
  type: DaltonismType;
  label: string;
  icon: string;
}

interface DaltonismOptionProps {
  option: DaltonismOptionType;
  isSelected?: boolean;
}

export function DaltonismOption({ option, isSelected }: DaltonismOptionProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-lg">{option.icon}</span>
      <div className="flex-1 min-w-0">
        <div className="font-medium">{option.label}</div>
      </div>
      {isSelected && (
        <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-blue-600">
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      )}
    </div>
  );
}

export type { DaltonismOptionType };
