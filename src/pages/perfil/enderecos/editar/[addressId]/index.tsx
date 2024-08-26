import React from "react";

//requests
import { updateAddress } from "@/requests/address/updateAddress";

//components
import AddressForm from "@/components/AddressForm";

export default function AddressEditPage() {

  return (
    <main className="flex flex-col items-center">
      <section className="max-w-screen-desktop w-full flex gap-6 flex-col items-center p-3">
        <AddressForm onSubmit={updateAddress} />
      </section>
    </main>
  );
}
