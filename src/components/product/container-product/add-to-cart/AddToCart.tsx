"use client";
import React, { useState } from "react";
import SizeSelector from "./size-selector/SizeSelector";
import QuantitySelector from "@/components/ui/basics/quantity-selector/QuantitySelector";
import Button from "@/components/ui/basics/Button/Button";
import { Product, Size } from "@/interfaces/products.interface";
import { useCartStore } from "@/store/cart/cart-store";
import { CartProduct } from "../../../../interfaces/products.interface";

interface AddToCartProps {
  product: Product;
}

interface AddToCartState {
  size: Size | null;
  quantity: number;
  posted: boolean;
}

const initState:AddToCartState = {
  size: null,
  quantity: 1,
  posted: false,
};

const AddToCart = ({ product }: AddToCartProps) => {
  const addProductToCart = useCartStore((state) => state.addProductToCart);

  const [addToCartState, setAddToCartState] =
    useState<AddToCartState>(initState);

  const addToCart = () => {
    setAddToCartState({ ...addToCartState, posted: true });
    if (!addToCartState.size) return;
    const { size, quantity } = addToCartState;
    const { title, slug, images, id, price } = product;
    addProductToCart({
      id,
      slug,
      title,
      price,
      quantity,
      size,
      image: images[0],
    } as CartProduct);
    setAddToCartState(initState);
  };

  return (
    <>
      {addToCartState.posted && (
        <span className="fade-in">
          <p style={{ color: "red" }}>You should to select a size</p>
        </span>
      )}
      {/* Selector de tallas */}
      <SizeSelector
        selectedSize={addToCartState.size}
        availableSizes={product.sizes}
        onChange={(size) => setAddToCartState({ ...addToCartState, size })}
      />

      {/* Selector de cantidad */}
      <QuantitySelector
        quantity={addToCartState.quantity}
        onChange={(quantity) =>
          setAddToCartState({ ...addToCartState, quantity })
        }
      />
      {/* Button */}
      <Button onClick={addToCart}>Add to cart shop</Button>
    </>
  );
};

export default AddToCart;
