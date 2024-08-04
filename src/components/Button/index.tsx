import Link from "next/link";
import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
  invert?: boolean;
  href?: string;
  disabled?: boolean;
  passHref?: boolean;
}

export default function Button({
  children,
  type = "button",
  onClick,
  className,
  invert,
  disabled,
  href,
  passHref
}: ButtonProps) {
  const Element = href ? Link : ("button" as React.ElementType);
  const props = href ? { href, passHref } : { onClick, type, disabled };
  const color = invert
    ? "bg-typography-secondary text-typography-primary"
    : "bg-background-black text-typography-yellow";

  return (
    <Element
      {...props}
      className={`rounded-full py-3 flex items-center uppercase justify-center text-center ${color} ${className}`}
    >
      {children}
    </Element>
  );
}
