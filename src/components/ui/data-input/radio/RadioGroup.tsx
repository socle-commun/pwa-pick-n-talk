import {
  RadioGroup as MuiRadioGroup,
  type RadioGroupProps as MuiRadioGroupProps
} from "@mui/material";
import { Box } from "@mui/material";

interface RadioGroupProps extends MuiRadioGroupProps {
  className?: string;
  sx?: any;
}

export default function RadioGroup({
  className,
  sx,
  children,
  ...props
}: RadioGroupProps) {
  return (
    <Box
      data-slot="control"
      className={className}
      sx={{
        "& > *": {
          marginBottom: 3,
        },
        "& [data-slot=\"label\"]": {
          fontWeight: "normal",
        },
        "&:has([data-slot=\"description\"])": {
          "& > *": {
            marginBottom: 6,
          },
          "& [data-slot=\"label\"]": {
            fontWeight: "medium",
          },
        },
        ...sx
      }}
    >
      <MuiRadioGroup {...props}>
        {children}
      </MuiRadioGroup>
    </Box>
  );
}
