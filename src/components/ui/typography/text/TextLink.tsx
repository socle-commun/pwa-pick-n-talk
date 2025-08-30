import { Link, type LinkProps } from "@mui/material";
import { Link as RouterLink } from "react-router";

type TextLinkProps = LinkProps & {
  to?: string;
  href?: string;
};

export default function TextLink({
  to,
  href,
  children,
  sx,
  ...props
}: TextLinkProps) {
  const linkProps = to 
    ? { component: RouterLink, to }
    : { href };

  return (
    <Link
      {...linkProps}
      sx={{
        color: "text.primary",
        textDecoration: "underline",
        textDecorationColor: "rgba(0, 0, 0, 0.5)",
        "&:hover": {
          textDecorationColor: "currentColor",
        },
        ...sx,
      }}
      {...props}
    >
      {children}
    </Link>
  );
}
