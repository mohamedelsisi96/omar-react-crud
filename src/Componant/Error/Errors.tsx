import React from "react";
interface IError {
  msg: string;
}
function Errors({ msg }: IError) {
  return msg ? <span className="text-sm font-semibold">{msg}</span> : null;
}

export default Errors;
