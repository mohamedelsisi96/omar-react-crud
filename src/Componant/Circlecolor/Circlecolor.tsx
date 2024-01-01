import React, { HTMLAttributes } from "react";
interface Iprop extends HTMLAttributes<HTMLSpanElement> {
  color: string;
}
function Circlecolor({ color, ...rest }: Iprop) {
  return (
    <span
      style={{ backgroundColor: color }}
      className={`block w-5 h-5 bg-[${color}] rounded-full `}
      {...rest}
    />
  );
}

export default Circlecolor;
