import { Button, Box } from "@mui/material";
import { motion } from "framer-motion";
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
    position: 'relative',
    display: 'flex',
    minWidth: 0,
    alignItems: 'center',
    gap: 1.5,
    borderRadius: 2,
    p: 1,
    textAlign: 'left',
    fontSize: { xs: '1rem', sm: '0.875rem' },
    fontWeight: 500,
    color: 'text.primary',
    textTransform: 'none',
    justifyContent: 'flex-start',
    minHeight: 'auto',
    '&:hover': {
      backgroundColor: 'action.hover',
    },
    '&:active': {
      backgroundColor: 'action.selected',
    },
    ...sx
  };

  return (
    <Box sx={{ position: 'relative' }} className={className}>
      {current && (
        <motion.span
          layoutId="current-indicator"
          style={{
            position: 'absolute',
            left: 8,
            right: 8,
            bottom: -10,
            height: 2,
            borderRadius: 999,
            backgroundColor: 'currentColor',
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
            textDecoration: 'none',
            ...(current && {
              backgroundColor: 'action.selected',
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
            cursor: onClick ? 'pointer' : 'default',
            ...(current && {
              backgroundColor: 'action.selected',
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
