import React from "react";
import TabNavigator from "@/components/TabNavigation";

export default function Notifications() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl text-center">
        Em breve você poderá ver suas notificações aqui!
      </h1>
      <TabNavigator />
    </main>
  );
}
