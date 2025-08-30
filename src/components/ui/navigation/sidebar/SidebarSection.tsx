import { Box } from "@mui/material";

export default function SidebarSection({
  className,
  sx,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & { sx?: any }) {
  return (
    <Box
      {...props}
      className={className}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 0.25,
        ...sx
      }}
    />
  );
}
