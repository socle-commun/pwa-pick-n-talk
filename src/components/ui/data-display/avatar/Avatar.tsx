import { Avatar as MuiAvatar } from "@mui/material";
import { type ComponentPropsWithoutRef } from "react";

type AvatarProps = {
  src?: string | null;
  square?: boolean;
  initials?: string;
  alt?: string;
  className?: string;
  sx?: any;
};

export default function Avatar({
  src = null,
  square = false,
  initials,
  alt = "",
  className,
  sx,
  ...props
}: AvatarProps & ComponentPropsWithoutRef<"span">) {
  return (
    <MuiAvatar
      src={src || undefined}
      alt={alt}
      className={className}
      sx={{
        borderRadius: square ? 2 : '50%',
        border: 1,
        borderColor: 'divider',
        fontSize: '48px',
        fontWeight: 500,
        textTransform: 'uppercase',
        userSelect: 'none',
        ...sx
      }}
      {...props}
    >
      {initials}
    </MuiAvatar>
  );
}
