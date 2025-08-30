import { DialogContentText } from "@mui/material";
import Text from "@/components/ui/typography/text/Text";

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
      component={Text}
      className={className}
      sx={{
        mt: 1,
        textWrap: 'pretty',
        ...sx
      }}
      {...props}
    >
      {children}
    </DialogContentText>
  );
}
