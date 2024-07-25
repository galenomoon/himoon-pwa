import React from "react";
import Image from "next/image";
import logo from "@/assets/text-logo.png";

export default function Logo({ size = 600 }) {
  const className = `w-[${size}px] object-contain`;
  return <Image src={logo} alt="Logo" width={size*2} className={className} />;
}
