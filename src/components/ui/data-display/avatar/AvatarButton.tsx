import { IconButton } from "@mui/material";
import { forwardRef } from "react";
import { Avatar } from "@/components/ui/data-display";

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

export default forwardRef<HTMLButtonElement, AvatarButtonProps>(
  function AvatarButton(
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
    },
    ref
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

    // For now, simplify to just handle onClick cases
    // href functionality can be handled at parent level if needed
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
  }
);
