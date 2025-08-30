import {
  Checkbox as MuiCheckbox,
  type CheckboxProps as MuiCheckboxProps,
} from "@mui/material";

interface CheckboxProps extends Omit<MuiCheckboxProps, "color"> {
  color?: "primary" | "secondary" | "default";
  className?: string;
}

export default function Checkbox({
  color = "primary",
  className,
  sx,
  ...props
}: CheckboxProps) {
  return (
    <MuiCheckbox
      color={color}
      className={className}
      sx={{
        '&.MuiCheckbox-root': {
          padding: 1,
        },
        ...sx
      }}
      {...props}
    />
  );
}
