"use client";
import { getStockBySlug } from "@/actions/products/get-stock-by-slug";
import styles from "./StockLabel.module.scss";
import { titleFont } from "@/config/fonts";
import React, { useEffect, useState } from "react";
import { useCartStore } from "@/store/cart/cart-store";
import Skeleton from "@/components/ui/basics/Skeleton/Skeleton";

interface StockLabelProps {
  slug: string;
}

const StockLabel = ({ slug }: StockLabelProps) => {
  const [stock, setStock] = useState<number | null>(null);

  useEffect(() => {
    getStockBySlug(slug).then((resp) => setStock(resp));
  }, [slug]);

  return (
    <>
      {stock ? (
        <h1 className={`${titleFont.className} ${styles.stock}`}>
          Stock: {stock}
        </h1>
      ) : (
        <Skeleton />
      )}
    </>
  );
};

export default StockLabel;
