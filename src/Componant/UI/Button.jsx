import React, { ReactNode } from "react";

interface IProp {
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}

function Button({ className, children, ...rest }: IProp) {
  return (
    <button className={`${className} rounded-md w-full`} {...rest}>
      {children}
    </button>
  );
}

export default Button;
