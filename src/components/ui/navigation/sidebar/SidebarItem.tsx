import { Button, ListItem, ListItemButton, Box } from "@mui/material";
import { motion } from "framer-motion";
import { forwardRef, type ForwardedRef } from "react";
import { Link } from "@/components/ui/navigation";

interface SidebarItemProps {
  current?: boolean;
  className?: string;
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  sx?: any;
}

export default forwardRef(function SidebarItem(
  {
    current,
    className,
    children,
    href,
    onClick,
    sx,
    ...props
  }: SidebarItemProps,
  ref: ForwardedRef<HTMLAnchorElement | HTMLButtonElement>
) {
  const baseStyles = {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    gap: 1.5,
    borderRadius: 1.5,
    px: 1,
    py: { xs: 1.25, sm: 1 },
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
            top: 8,
            bottom: 8,
            left: -16,
            width: 2,
            borderRadius: 999,
            backgroundColor: 'currentColor',
          }}
        />
      )}
      {href ? (
        <Button
          component={Link}
          href={href}
          {...props}
          sx={{
            ...baseStyles,
            ...(current && {
              backgroundColor: 'action.selected',
              fontWeight: 600,
            }),
          }}
          ref={ref}
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
