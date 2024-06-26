import Image from "next/image";
import React, { StyleHTMLAttributes } from "react";

interface ProductImageProps {
  src?: string;
  alt: string;
  height?: number;
  width?: number;
  className?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const ProductImage = ({
  src,
  alt,
  height,
  width,
  className,
  onMouseEnter,
  onMouseLeave,
}: ProductImageProps) => {
  const localSrc = !src
    ? "/imgs/placeholder.jpg"
    : src.startsWith("http")
    ? src
    : `/products/${src}`;
  return (
    <Image
      className={className}
      src={localSrc}
      alt={alt}
      height={height}
      width={width}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  );
};

export default ProductImage;
