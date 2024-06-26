
export interface Product {
  id?: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: Size[];
  slug: string;
  tags: string[];
  title: string;
  // type: ValidType;
  gender: ValidCategory;
}

export interface CartProduct {
  id: string;
  price: number;
  slug: string;
  title: string;
  quantity: number;
  size: Size;
  image: string;
}

export interface ProductImage {
  id: string;
  url: string;
}

export type ValidCategory = "men" | "women" | "kid" | "unisex";
export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";
export type ValidType =
  | "shirts"
  | "pants"
  | "hoodies"
  | "hats"
  | "not-specified";
