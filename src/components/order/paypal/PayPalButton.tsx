"use client";
import Skeleton from "@/components/ui/basics/Skeleton/Skeleton";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import {
  CreateOrderData,
  CreateOrderActions,
  OnApproveData,
  OnApproveActions,
} from "@paypal/paypal-js";
import { setTransactionId } from "@/actions/payments/set-transaction-id";
import { paypalCheckPayment } from "@/actions/payments/paypal-payment";

interface PayPalButtonProps {
  orderId: string;
  amount: number;
}

const PayPalButton = ({ orderId, amount }: PayPalButtonProps) => {
  const [{ isPending }] = usePayPalScriptReducer();

  const roundedAmount = Math.round(amount * 100) / 100; //Number with two decimals

  if (isPending)
    return (
      <>
        <Skeleton
          style={{ height: "45px", borderRadius: "4px", marginBottom: "12px" }}
        />
        <Skeleton style={{ height: "45px", borderRadius: "4px" }} />
      </>
    );

  const createOrder = async (
    data: CreateOrderData,
    actions: CreateOrderActions
  ): Promise<string> => {
    const transactionId = await actions.order.create({
      intent: "CAPTURE",
      purchase_units: [
        {
          invoice_id: orderId,
          amount: {
            currency_code: "USD",
            value: "1.00",
          },
        },
      ],
    });

    const resp = await setTransactionId(orderId, transactionId);
    if (!resp.ok) throw new Error(resp.message);

    return transactionId;
  };

  const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {
    const details = await actions.order?.capture();
    if (!details) return;

    await paypalCheckPayment(details.id);
  };

  return <PayPalButtons createOrder={createOrder} onApprove={onApprove} />;
};

export default PayPalButton;
