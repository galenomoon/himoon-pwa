import React from "react";
import TabNavigator from "@/components/TabNavigation";

export default function Profile() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl text-center">Em breve você poderá editar seu perfil aqui!</h1>
      <TabNavigator />
    </main>
  );
}
