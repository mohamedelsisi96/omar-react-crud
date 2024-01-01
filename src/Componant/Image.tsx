import React from "react";
interface ImageProp {
  className: string;
  src: string;
  alt: string;
}

function Image({ className, src, alt }: ImageProp) {
  return <img className={className} src={src} alt={alt} />;
}

export default Image;
