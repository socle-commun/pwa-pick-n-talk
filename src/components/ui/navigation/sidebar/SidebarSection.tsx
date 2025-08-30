import { LayoutGroup } from "framer-motion";
import { useId } from "react";
import { Box } from "@mui/material";

export default function SidebarSection({
  className,
  sx,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & { sx?: any }) {
  const id = useId();

  return (
    <LayoutGroup id={id}>
      <Box
        {...props}
        className={className}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 0.25,
          ...sx
        }}
      />
    </LayoutGroup>
  );
}
