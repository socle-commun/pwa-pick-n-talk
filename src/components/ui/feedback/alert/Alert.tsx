import {
  Dialog as MuiDialog,
  DialogContent,
  // useTheme, // TODO: For responsive dialog sizing
  // useMediaQuery, // TODO: For responsive dialog sizing
} from "@mui/material";
import { type ReactNode } from "react";

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

interface AlertProps {
  open: boolean;
  onClose: () => void;
  size?: keyof typeof sizeMap;
  className?: string;
  children: ReactNode;
  sx?: any;
}

export default function Alert({
  open,
  onClose,
  size = "md",
  className,
  children,
  sx,
  ...props
}: AlertProps) {
  return (
    <MuiDialog
      open={open}
      onClose={onClose}
      maxWidth={sizeMap[size]}
      fullWidth
      className={className}
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: 2,
          p: { xs: 4, sm: 3 },
          margin: 2,
          boxShadow: 3,
        },
        '& .MuiBackdrop-root': {
          backgroundColor: 'rgba(0, 0, 0, 0.15)',
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
