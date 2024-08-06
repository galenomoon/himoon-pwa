import React, { useState } from "react";
import { PiEye, PiEyeClosed } from "react-icons/pi";

interface InputProps extends React.ComponentProps<"input"> {
  Icon?: React.ElementType;
  type?: string;
}

export function Input({ Icon = React.Fragment, type, ...props }: InputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const Eye = isPasswordVisible ? PiEyeClosed : PiEye;

  return (
    <data className="flex items-center justify-center w-full rounded-full border-2 border-typography-primary/10 px-4 py-3 gap-2">
      <Icon size={24} className="flex-shrink-0 text-typography-primary/40" />
      <input
        type={
          type === "password" && isPasswordVisible ? "text" : type || "text"
        }
        {...props}
        className="w-full h-full placeholder:font-light outline-none"
      />
      {type === "password" && (
        <button
          type="button"
          onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          className="flex-shrink-0"
        >
          <Eye size={24} className="text-typography-primary/40" />
        </button>
      )}
    </data>
  );
}
