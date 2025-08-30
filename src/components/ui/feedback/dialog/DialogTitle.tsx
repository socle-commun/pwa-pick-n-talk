import { DialogTitle as MuiDialogTitle } from "@mui/material";

interface DialogTitleProps {
  className?: string;
  children: React.ReactNode;
  sx?: any;
}

export default function DialogTitle({
  className,
  children,
  sx,
  ...props
}: DialogTitleProps) {
  return (
    <MuiDialogTitle
      className={className}
      sx={{
        fontSize: { xs: '1.125rem', sm: '1rem' },
        lineHeight: 1.5,
        fontWeight: 600,
        textWrap: 'balance',
        p: 0,
        mb: 2,
        ...sx
      }}
      {...props}
    >
      {children}
    </MuiDialogTitle>
  );
}
