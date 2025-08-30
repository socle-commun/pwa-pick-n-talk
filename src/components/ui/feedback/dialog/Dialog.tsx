import {
  Dialog as MuiDialog,
  DialogContent,
  // Backdrop, // TODO: Custom backdrop usage
  useTheme,
  useMediaQuery,
} from "@mui/material";
import type { ReactNode } from "react";

const sizeMap = {
  xs: 'xs',
  sm: 'sm', 
  md: 'md',
  lg: 'lg',
  xl: 'xl',
  '2xl': 'xl',
  '3xl': 'xl',
  '4xl': 'xl',
  '5xl': 'xl',
} as const;

interface DialogProps {
  open: boolean;
  onClose: () => void;
  size?: keyof typeof sizeMap;
  className?: string;
  children: ReactNode;
  sx?: any;
}

export default function Dialog({
  open,
  onClose,
  size = "lg",
  className,
  children,
  sx,
  ...props
}: DialogProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <MuiDialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      maxWidth={sizeMap[size]}
      fullWidth
      className={className}
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: { xs: '24px 24px 0 0', sm: 2 },
          p: { xs: 4, sm: 3 },
          margin: { xs: 0, sm: 2 },
          maxHeight: { xs: 'calc(100% - 24px)', sm: 'calc(100% - 64px)' },
          width: { xs: '100%', sm: 'auto' },
        },
        '& .MuiBackdrop-root': {
          backgroundColor: 'rgba(0, 0, 0, 0.25)',
        },
        ...sx
      }}
      {...props}
    >
      <DialogContent sx={{ p: 0 }}>
        {children}
      </DialogContent>
    </MuiDialog>
  );
}
