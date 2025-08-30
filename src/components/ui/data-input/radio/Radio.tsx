import {
  Radio as MuiRadio,
  type RadioProps as MuiRadioProps,
} from "@mui/material";

interface RadioProps extends Omit<MuiRadioProps, "color"> {
  color?: "primary" | "secondary" | "default";
  className?: string;
}

export default function Radio({
  color = "primary",
  className,
  sx,
  ...props
}: RadioProps) {
  return (
    <MuiRadio
      color={color}
      className={className}
      sx={{
        "&.MuiRadio-root": {
          padding: 1,
        },
        ...sx
      }}
      {...props}
    />
  );
}
