import { Box, type SxProps, type Theme } from "@mui/material";
import { type ComponentPropsWithoutRef } from "react";

interface NavbarSectionProps extends Omit<ComponentPropsWithoutRef<"div">, "className"> {
  sx?: SxProps<Theme>;
}

export default function NavbarSection({
  sx,
  ...props
}: NavbarSectionProps) {
  return (
    <Box
      {...props}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: { xs: 1, sm: 3 },
        minWidth: 0,
        ...sx
      }}
    />
  );
}
