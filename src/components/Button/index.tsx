import Link from "next/link";
import React from "react";
import { PiSpinner } from "react-icons/pi";

interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
  invert?: boolean;
  href?: string;
  disabled?: boolean;
  passHref?: boolean;
  isLoading?: boolean;
}

export default function Button({
  children,
  type = "button",
  onClick,
  className,
  invert,
  disabled,
  href,
  passHref,
  isLoading,
}: ButtonProps) {
  const Element = href ? Link : ("button" as React.ElementType);
  const isDisabled = isLoading || disabled;
  const props = href
    ? { href: isDisabled ? "#" : href, passHref }
    : { onClick, type, disabled: isDisabled };
  const color = invert
    ? "bg-typography-secondary text-typography-primary"
    : "bg-background-black text-typography-yellow";

  return (
    <Element
      {...props}
      className={`rounded-full py-3 flex items-center uppercase justify-center text-center ${color} ${
        isDisabled ? "opacity-60" : ""
      } ${className}`}
    >
      {isLoading ? <PiSpinner size={24} className="animate-spin" /> : children}
    </Element>
  );
}
