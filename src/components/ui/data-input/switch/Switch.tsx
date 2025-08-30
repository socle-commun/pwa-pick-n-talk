import {
  Switch as MuiSwitch,
  type SwitchProps as MuiSwitchProps,
} from "@mui/material";

interface SwitchProps extends Omit<MuiSwitchProps, "color"> {
  color?: "primary" | "secondary" | "default";
  className?: string;
}

export default function Switch({
  color = "primary",
  className,
  sx,
  ...props
}: SwitchProps) {
  return (
    <MuiSwitch
      color={color}
      className={className}
      sx={{
        "&.MuiSwitch-root": {
          padding: 1,
        },
        ...sx
      }}
      {...props}
    />
  );
}
