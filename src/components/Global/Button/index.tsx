import Link from "next/link";
import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
  invert?: boolean;
  href?: string;
}

export default function Button({
  children,
  type = "button",
  onClick,
  className,
  invert,
  href,
}: ButtonProps) {
  const Element = href ? Link : ("button" as React.ElementType);
  const props = href ? { href } : { onClick, type };
  const color = invert
    ? "bg-typography-secondary text-typography-primary"
    : "bg-background-black text-typography-yellow";

  return (
    <Element
      {...props}
      className={`rounded-full py-3 flex items-center justify-center text-center ${color} ${className}`}
    >
      {children}
    </Element>
  );
}
