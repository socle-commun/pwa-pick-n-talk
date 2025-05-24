import { type ReactNode } from "react";

import Bars3Icon from "@heroicons/react/20/solid/Bars3Icon";
import XMarkIcon from "@heroicons/react/20/solid/XMarkIcon";

import cn from "@/utilities/cn";

interface ResponsiveTopBarProps {
  brand: ReactNode;
  children: ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

export default function ResponsiveTopBar({ brand, children, isOpen, onToggle }: ResponsiveTopBarProps) {
  return (
    <header role="banner">
      <nav className={cn("w-full px-4 py-2")}>
        <div className={cn("flex flex-col md:items-center md:flex-row md:justify-between")}>
          <div>
            <div className={cn("flex items-center md:block")}>
              <span>{brand}</span>
              <button
                className={cn("ml-auto p-2 h-min flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800 text-black dark:text-white md:hidden")}
                onClick={() => onToggle()}
              >
                <span className={cn("sr-only")}>Toggle main menu</span>
                <span aria-hidden="true" className={cn("size-4")}>{isOpen ? (<XMarkIcon />) : (<Bars3Icon />)}</span>
              </button>
            </div>
          </div>
          <div>
            <div className={cn("flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0", isOpen ? "block" : "hidden")}>
              <ul className={cn("items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0")}>
                {children}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};