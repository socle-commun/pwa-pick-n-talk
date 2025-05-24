import { type ReactNode } from "react";

import { NavLink } from "react-router";

import cn from "@/utilities/cn";

interface TopBarNavLinkProps {
  children: ReactNode;
  className?: string;
  onClick: () => void;
  to: string;
}

export default function TopBarNavLink({ children, className = "", onClick, to }: TopBarNavLinkProps) {
  return (
    <li>
      <NavLink to={to} className={cn("flex items-center gap-2 text-center", className)} onClick={onClick}>
        {children}
      </NavLink>
    </li>
  )
}