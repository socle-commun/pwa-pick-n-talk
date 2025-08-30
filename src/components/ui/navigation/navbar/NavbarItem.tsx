import { Button, Box } from "@mui/material";
import { forwardRef } from "react";

interface NavbarItemProps {
  current?: boolean;
  className?: string;
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  sx?: any;
}

export default forwardRef<HTMLButtonElement, NavbarItemProps>(
  function NavbarItem(
    {
      current,
      className,
      children,
      href,
      onClick,
      sx,
      ...props
    },
    ref
  ) {
  const baseStyles = {
    position: "relative",
    display: "flex",
    minWidth: 0,
    alignItems: "center",
    gap: 1.5,
    borderRadius: 2,
    p: 1,
    textAlign: "left",
    fontSize: { xs: "1rem", sm: "0.875rem" },
    fontWeight: 500,
    color: "text.primary",
    textTransform: "none",
    justifyContent: "flex-start",
    minHeight: "auto",
    "&:hover": {
      backgroundColor: "action.hover",
    },
    "&:active": {
      backgroundColor: "action.selected",
    },
    ...sx
  };

  return (
    <Box sx={{ position: "relative" }} className={className}>
      {current && (
        <Box
          sx={{
            position: "absolute",
            left: 1,
            right: 1,
            bottom: -1.25,
            height: 0.25,
            borderRadius: 999,
            backgroundColor: "primary.main",
            transition: "all 0.2s ease-in-out",
          }}
        />
      )}
      {href ? (
        <Button
          component="a"
          href={href}
          {...props}
          sx={{
            ...baseStyles,
            textDecoration: "none",
            ...(current && {
              backgroundColor: "action.selected",
              fontWeight: 600,
            }),
          }}
        >
          {children}
        </Button>
      ) : (
        <Button
          {...props}
          onClick={onClick}
          sx={{
            ...baseStyles,
            cursor: onClick ? "pointer" : "default",
            ...(current && {
              backgroundColor: "action.selected",
              fontWeight: 600,
            }),
          }}
          ref={ref}
        >
          {children}
        </Button>
      )}
    </Box>
  );
});
