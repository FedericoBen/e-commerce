"use client";
import Input from "@/components/ui/basics/Input/Input";
import styles from "./AddressForm.module.scss";
import { useForm } from "react-hook-form";
import Button from "@/components/ui/basics/Button/Button";
import { InterfaceCountry } from "@/interfaces/country.interface";
import { useAddressStore } from "@/store/address/address-store";
import { useEffect } from "react";
import {
  deleteUserAddress,
  setUserAddress,
} from "@/actions/address/set-user-address";
import { useSession } from "next-auth/react";
import { ROUTES } from "@/common/routes";
import { InterfaceAddress } from "@/interfaces/address.interface";
import { useRouter } from "next/navigation";

type FormInputs = {
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  postalCode: string;
  city: string;
  country: string;
  phone: string;
  rememberAddress: boolean;
};

interface AddressFormProps {
  countries: InterfaceCountry[];
  userAddressStore?: Partial<InterfaceAddress>;
}

const AddressForm = ({ countries, userAddressStore }: AddressFormProps) => {
  const { data: session } = useSession({ required: true });
  const router = useRouter();
  const { setAddress, address } = useAddressStore((state) => state);
  const {
    handleSubmit,
    register,
    reset,
    formState: { isValid, errors },
  } = useForm<FormInputs>({
    defaultValues: {
      ...(userAddressStore ?? {}),
      rememberAddress: Object.keys(userAddressStore ?? {}).length > 0,
    },
  });

  const onSubmit = async (data: FormInputs) => {
    if (!session?.user.id) return window.location.replace(ROUTES.LOGIN);
    const { rememberAddress, ...address } = data;
    setAddress(address);
    if (data.rememberAddress) {
      await setUserAddress(address, session.user.id);
    } else {
      await deleteUserAddress(session.user.id);
    }
    router.push(ROUTES.CHECKOUT);
  };

  useEffect(() => {
    if (!address.firstName) return;
    reset({ ...address });
  }, [address, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.container_items_form}>
        <div className={styles.item_form}>
          <Input {...register("firstName", { required: true })} label="Name" />
        </div>
        <div className={styles.item_form}>
          <Input
            {...register("lastName", { required: true })}
            label="Last name"
          />
        </div>
        <div className={styles.item_form}>
          <Input {...register("address", { required: true })} label="Address" />
        </div>
        <div className={styles.item_form}>
          <Input {...register("address2")} label="Address 2 (Optional)" />
        </div>
        <div className={styles.item_form}>
          <Input
            {...register("postalCode", { required: true })}
            label="Postal code"
          />
        </div>
        <div className={styles.item_form}>
          <Input {...register("city", { required: true })} label="City" />
        </div>
        <div className={styles.item_form}>
          <span>Country</span>
          <select
            className={styles.select}
            {...register("country", { required: true })}
          >
            <option value="">[Select]</option>
            {countries.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.item_form}>
          <Input {...register("phone", { required: true })} label="Phone" />
        </div>
        <div className={styles.container_check}>
          <span>Remember address ?</span>
          <input
            {...register("rememberAddress")}
            type="checkbox"
            style={{ height: "16px", width: "16px" }}
          />
        </div>
      </div>
      <Button
        disabled={!isValid}
        type="submit"
        style={{
          width: "100%",
          maxWidth: "300px",
        }}
      >
        Confirm
      </Button>
    </form>
  );
};

export default AddressForm;
