"use client";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";
import styles from "./QuantitySelector.module.scss";
import { useState } from "react";

interface QuantitySelectorProps {
  quantity?: number;
  maxQuantity?:number;
  onChange?: (quantity: number) => void;
}

const QuantitySelector = ({
  quantity = 1,
  maxQuantity = 5,
  onChange = () => {},
}: QuantitySelectorProps) => {
  return (
    <div className={styles.container_quantity_selector}>
      <button onClick={() => quantity > 1 && onChange(quantity - 1)}>
        <IoRemoveCircleOutline size={30} />
      </button>
      <span className={styles.container_quantity}>{quantity}</span>
      <button onClick={() => quantity < maxQuantity && onChange(quantity + 1)}>
        <IoAddCircleOutline size={30} />
      </button>
    </div>
  );
};

export default QuantitySelector;
