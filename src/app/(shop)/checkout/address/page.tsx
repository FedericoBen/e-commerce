import Title from "@/components/ui/basics/Title/Title";
import styles from "./AddressPage.module.scss";
import AddressForm from "@/components/address/address-form/AddressForm";
import { getCountries } from "@/actions/country/get-countries";
import { getUserAddress } from "@/actions/address/set-user-address";
import { auth } from "@/auth.config";
import { redirect } from "next/navigation";
import { ROUTES } from "@/common/routes";

export default async function AddressPage() {
  const session = await auth();
  if (!session?.user) return redirect(ROUTES.LOGIN);
  const countries = await getCountries();
  const { address } = await getUserAddress(session.user.id);
  return (
    <div className={styles.container_page}>
      <div className={styles.container_form_address}>
        <Title title="Address" subtitle="Delivery address" />
        <AddressForm
          userAddressStore={
            address
              ? {
                  ...address,
                  address2: address?.address2 ?? "",
                  country: address?.countryId ?? "",
                }
              : {}
          }
          countries={countries}
        />
      </div>
    </div>
  );
}
