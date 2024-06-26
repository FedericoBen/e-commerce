import { CartProduct } from "@/interfaces/products.interface";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartState {
  cart: CartProduct[];
  clearCart: () => void;
  getTotalItems: () => number;
  getSummaryInfo: () => {
    total: number;
    subTotal: number;
    taxes: number;
    productInCart: number;
  };
  addProductToCart: (product: CartProduct) => void;
  removeProduct: (product: CartProduct) => void;
  updateProductQuantity: (product: CartProduct, newQuantity: number) => void;
}

const compareProducts = (productInCart: CartProduct, product: CartProduct) =>
  !!(productInCart.id == product.id && productInCart.size == product.size);

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      clearCart: () => {
        set({ cart: [] });
      },
      getSummaryInfo: () => {
        const { cart } = get();
        const productInCart = cart.reduce(
          (total, product) => total + product.quantity,
          0
        );
        const subTotal = cart.reduce(
          (subTotal, product) => subTotal + product.quantity * product.price,
          0
        );
        const taxes = subTotal * 0.15;
        const total = subTotal + taxes;
        return {
          total,
          subTotal,
          taxes,
          productInCart,
        };
      },
      removeProduct: (product: CartProduct) => {
        const { cart } = get();
        set({ cart: cart.filter((item) => !compareProducts(item, product)) });
      },
      updateProductQuantity: (product: CartProduct, newQuantity: number) => {
        const { cart } = get();
        set({
          cart: cart.map((productInCart) => ({
            ...productInCart,
            ...(compareProducts(productInCart, product)
              ? { quantity: newQuantity }
              : {}),
          })),
        });
      },
      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((total, product) => total + product.quantity, 0);
      },
      addProductToCart: (product: CartProduct) => {
        const { cart } = get();
        // 1. Verify if the product exist in the cart with the size selected
        const productInCart = cart.some((productInCart) =>
          compareProducts(productInCart, product)
        );
        //2. if the product don´t exist in the cart is added
        if (!productInCart) return set({ cart: [...cart, product] });

        //3. If the product exist increment the quantity
        set({
          cart: cart.map((productInCart) => ({
            ...productInCart,
            ...(compareProducts(productInCart, product)
              ? { quantity: productInCart.quantity + product.quantity }
              : {}),
          })),
        });
      },
    }),
    {
      name: "shoping-cart",
    }
  )
);
