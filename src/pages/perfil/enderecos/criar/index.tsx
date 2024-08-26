import React from "react";

//components
import AddressForm from "@/components/AddressForm";

//requests
import { createAddress } from "@/requests/address/createAddress";

export default function AddressCreatePage() {
  return (
    <main className="flex flex-col items-center">
      <section className="max-w-screen-desktop w-full flex gap-6 flex-col items-center p-3">
        <AddressForm onSubmit={createAddress} />
      </section>
    </main>
  );
}
