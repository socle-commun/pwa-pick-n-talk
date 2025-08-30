import { Box, type BoxProps } from "@mui/material";
import { type ReactNode } from "react";

interface ComboboxOptionProps extends BoxProps {
  className?: string;
  children?: ReactNode;
  selected?: boolean;
}

export default function ComboboxOption({
  children,
  className,
  selected,
  sx,
  ...props
}: ComboboxOptionProps) {
  return (
    <Box
      {...props}
      className={className}
      sx={{
        display: "flex",
        alignItems: "center",
        minWidth: 0,
        width: "100%",
        cursor: "default",
        gridTemplateColumns: "1fr auto",
        gap: 2,
        borderRadius: 2,
        py: { xs: 2.5, sm: 1.5 },
        px: { xs: 3.5, sm: 3 },
        fontSize: { xs: "1rem", sm: "0.875rem" },
        lineHeight: 1.5,
        color: "text.primary",
        outline: "none",
        "&:hover": {
          backgroundColor: "primary.main",
          color: "primary.contrastText",
        },
        "&[data-focus=\"true\"]": {
          backgroundColor: "primary.main",
          color: "primary.contrastText",
        },
        "&[data-disabled=\"true\"]": {
          opacity: 0.5,
        },
        "& [data-slot=\"icon\"]": {
          width: { xs: 20, sm: 16 },
          height: { xs: 20, sm: 16 },
          flexShrink: 0,
          color: "text.secondary",
        },
        "&:hover [data-slot=\"icon\"]": {
          color: "inherit",
        },
        "& [data-slot=\"avatar\"]": {
          width: { xs: 24, sm: 20 },
          height: { xs: 24, sm: 20 },
          mx: -0.5,
        },
        ...sx
      }}
    >
      <Box component="span" sx={{ display: "flex", alignItems: "center", minWidth: 0 }}>
        {children}
      </Box>
      {selected && (
        <svg
          style={{ width: 20, height: 20, alignSelf: "center" }}
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M4 8.5l3 3L12 4"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            stroke="currentColor"
          />
        </svg>
      )}
    </Box>
  );
}
