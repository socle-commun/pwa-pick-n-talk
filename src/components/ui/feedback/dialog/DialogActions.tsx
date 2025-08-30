import { DialogActions as MuiDialogActions } from "@mui/material";

export default function DialogActions({
  className,
  sx,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & { sx?: any }) {
  return (
    <MuiDialogActions
      {...props}
      className={className}
      sx={{
        mt: 4,
        flexDirection: { xs: 'column-reverse', sm: 'row' },
        gap: 1.5,
        alignItems: 'center',
        justifyContent: 'flex-end',
        p: 0,
        '& > *': {
          width: { xs: '100%', sm: 'auto' },
        },
        ...sx
      }}
    />
  );
}
