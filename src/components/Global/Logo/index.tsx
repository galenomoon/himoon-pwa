import React from "react";
import Image from "next/image";
import logo from "@/assets/text-logo.png";

export default function Logo() {
  return <Image src={logo} alt="Logo" width={600} className="w-[300px]" />;
}
