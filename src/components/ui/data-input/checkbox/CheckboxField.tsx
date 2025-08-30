import {
  FormControlLabel,
  type FormControlLabelProps
} from "@mui/material";
import { Box } from "@mui/material";

interface CheckboxFieldProps extends Omit<FormControlLabelProps, "control"> {
  className?: string;
  sx?: any;
  control: React.ReactElement;
}

export default function CheckboxField({
  className,
  sx,
  control,
  label,
  ...props
}: CheckboxFieldProps) {
  return (
    <Box
      data-slot="field"
      className={className}
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1.125rem 1fr", sm: "1rem 1fr" },
        gap: { x: 4, y: 1 },
        "& [data-slot=\"control\"]": {
          gridColumnStart: 1,
          gridRowStart: 1,
          mt: { xs: 0.75, sm: 1 },
        },
        "& [data-slot=\"label\"]": {
          gridColumnStart: 2,
          gridRowStart: 1,
        },
        "& [data-slot=\"description\"]": {
          gridColumnStart: 2,
          gridRowStart: 2,
        },
        "&:has([data-slot=\"description\"]) [data-slot=\"label\"]": {
          fontWeight: "medium",
        },
        ...sx
      }}
    >
      <FormControlLabel
        control={control}
        label={label}
        {...props}
        sx={{
          margin: 0,
          alignItems: "flex-start",
        }}
      />
    </Box>
  );
}
