import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AddressState {
  address: {
    firstName: string;
    lastName: string;
    address: string;
    address2?: string;
    postalCode: string;
    country: string;
    city: string;
    phone: string;
  };
  setAddress: (address: AddressState["address"]) => void;
}

export const useAddressStore = create<AddressState>()(
  persist(
    (set, get) => ({
      address: {
        firstName: "",
        lastName: "",
        address: "",
        address2: "",
        postalCode: "",
        country: "",
        city: "",
        phone: "",
      },
      setAddress: (address: AddressState["address"]) => {
        set({ address });
      },
    }),
    {
      name: "address-storage",
    }
  )
);
