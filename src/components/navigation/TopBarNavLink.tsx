import { type ReactNode } from "react";

import Link from "@/components/navigation/Link";

import cn from "@/utilities/cn";

interface TopBarNavLinkProps {
  children: ReactNode;
  className?: string;
  onClick: () => void;
  href: string;
}

export default function TopBarNavLink({ children, className = "", onClick, href }: TopBarNavLinkProps) {
  return (
    <li>
      <Link href={href} className={cn("flex items-center gap-2 text-center", className)} onClick={onClick}>
        {children}
      </Link>
    </li>
  )
}