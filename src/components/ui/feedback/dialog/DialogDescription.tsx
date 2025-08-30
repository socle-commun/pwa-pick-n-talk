import { DialogContentText } from "@mui/material";

interface DialogDescriptionProps {
  className?: string;
  children: React.ReactNode;
  sx?: any;
}

export default function DialogDescription({
  className,
  children,
  sx,
  ...props
}: DialogDescriptionProps) {
  return (
    <DialogContentText
      className={className}
      sx={{
        mt: 1,
        textWrap: "pretty",
        color: "text.secondary",
        lineHeight: 1.5,
        ...sx
      }}
      {...props}
    >
      {children}
    </DialogContentText>
  );
}
