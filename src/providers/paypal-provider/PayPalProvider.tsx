"use client";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";

interface Props {
  children: React.ReactNode;
}

export const PayPalProvider = ({ children }: Props) => {
  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? "",
        intent: 'capture',
        currency: 'USD'
      }}
    >
      {children}
    </PayPalScriptProvider>
  );
};
