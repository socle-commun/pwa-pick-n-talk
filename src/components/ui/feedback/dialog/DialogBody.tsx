import { Box } from "@mui/material";

export default function DialogBody({
  className,
  sx,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & { sx?: any }) {
  return (
    <Box
      {...props}
      className={className}
      sx={{
        mt: 3,
        ...sx
      }}
    />
  );
}
