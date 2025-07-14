import { forwardRef, type ComponentPropsWithoutRef } from "react";

import {
  type ButtonProps as HeadlessButtonProps,
  Button as HeadlessButton,
} from "@headlessui/react";

import { TouchTarget } from "@/components/ui/actions";
import { Avatar } from "@/components/ui/data-display";
import { Link } from "@/components/ui/navigation";

import cn from "@/utils/cn";

type AvatarButtonProps = {
  src?: string | null;
  square?: boolean;
  initials?: string;
  alt?: string;
  className?: string;
};

export default forwardRef(function AvatarButton(
  {
    src,
    square = false,
    initials,
    alt,
    className,
    ...props
  }: AvatarButtonProps &
    (
      | Omit<HeadlessButtonProps, "as" | "className">
      | Omit<ComponentPropsWithoutRef<typeof Link>, "className">
    ),
  ref: React.ForwardedRef<HTMLElement>
) {
  const classes = cn(
    className,
    square ? "rounded-[20%]" : "rounded-full",
    "relative inline-grid focus:not-data-focus:outline-hidden data-focus:outline-2 data-focus:outline-offset-2 data-focus:outline-blue-500"
  );

  return "href" in props ? (
    <Link
      {...props}
      className={classes}
      ref={ref as React.ForwardedRef<HTMLAnchorElement>}
    >
      <TouchTarget>
        <Avatar src={src} square={square} initials={initials} alt={alt} />
      </TouchTarget>
    </Link>
  ) : (
    <HeadlessButton {...props} className={classes} ref={ref}>
      <TouchTarget>
        <Avatar src={src} square={square} initials={initials} alt={alt} />
      </TouchTarget>
    </HeadlessButton>
  );
});
