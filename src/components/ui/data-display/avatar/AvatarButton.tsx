import { IconButton, Button } from "@mui/material";
import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { Avatar } from "@/components/ui/data-display";
import { Link } from "@/components/ui/navigation";

type AvatarButtonProps = {
  src?: string | null;
  square?: boolean;
  initials?: string;
  alt?: string;
  className?: string;
  href?: string;
  onClick?: () => void;
  sx?: any;
};

export default forwardRef(function AvatarButton(
  {
    src,
    square = false,
    initials,
    alt,
    className,
    href,
    onClick,
    sx,
    ...props
  }: AvatarButtonProps,
  ref: React.ForwardedRef<HTMLElement>
) {
  const baseStyles = {
    borderRadius: square ? 2 : '50%',
    padding: 0,
    minWidth: 'auto',
    '&:focus': {
      outline: 2,
      outlineOffset: 2,
      outlineColor: 'primary.main',
    },
    ...sx
  };

  if (href) {
    return (
      <IconButton
        component={Link}
        href={href}
        {...props}
        className={className}
        sx={baseStyles}
        ref={ref}
      >
        <Avatar src={src} square={square} initials={initials} alt={alt} />
      </IconButton>
    );
  }

  return (
    <IconButton
      {...props}
      onClick={onClick}
      className={className}
      sx={baseStyles}
      ref={ref}
    >
      <Avatar src={src} square={square} initials={initials} alt={alt} />
    </IconButton>
  );
});
