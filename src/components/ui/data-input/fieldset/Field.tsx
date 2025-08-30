import { Box } from "@mui/material";

export default function Field({
  className,
  sx,
  ...props
}: { className?: string; sx?: any } & React.ComponentPropsWithoutRef<"div">) {
  return (
    <Box
      {...props}
      className={className}
      sx={{
        "& > [data-slot=\"label\"] + [data-slot=\"control\"]": {
          mt: 3,
        },
        "& > [data-slot=\"label\"] + [data-slot=\"description\"]": {
          mt: 1,
        },
        "& > [data-slot=\"description\"] + [data-slot=\"control\"]": {
          mt: 3,
        },
        "& > [data-slot=\"control\"] + [data-slot=\"description\"]": {
          mt: 3,
        },
        "& > [data-slot=\"control\"] + [data-slot=\"error\"]": {
          mt: 3,
        },
        "& [data-slot=\"label\"]": {
          fontWeight: "medium",
        },
        ...sx
      }}
    />
  );
}
