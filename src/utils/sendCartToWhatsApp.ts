import { IAddress } from "@/interfaces/address";
import { ICartItem } from "@/interfaces/cartItem";
import { IUser } from "@/interfaces/user";

export function sendCartToWhatsApp({
  cartItems,
  defaultAddress,
  totalPrice,
  currentUser,
}: {
  cartItems: ICartItem[];
  totalPrice: number;
  defaultAddress: IAddress;
  currentUser: IUser;
}) {
  let total = 0;

  const message = cartItems.map((cartItem) => {
    const price = cartItem.product.price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    total += Number(cartItem.product.price) * cartItem.quantity;

    return [
      `*${cartItem.product.name}*`,
      `Qtd: ${cartItem.quantity}`,
      `Preço: ${price}`,
      `____________________`,
    ].join("\n");
  });

  const total_price = totalPrice.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const address = currentUser?.addresses?.find(
    (address) => address.id === defaultAddress?.id
  );

  const formattedMessage = [
    "*🛒💗 Seu Carrinho 🛒💗:*",
    currentUser?.firstName
      ? `*Nome:* ${currentUser.firstName} ${currentUser.lastName}`
      : "",
    currentUser?.phone ? `*Celular:* ${currentUser.phone}` : "",
    address?.zip ? `*CEP:* ${address.zip}` : "",
    address?.street ? `*Endereço:* ${address.street}, ${address.number}` : "",
    address?.complement ? `*Complemento:* ${address.complement}` : "",
    address?.neighborhood ? `*Bairro:* ${address.neighborhood}` : "",
    address?.city ? `*Cidade:* ${address.city} - ${address.state}` : "",
    "\n",
    ...message,
    "\n",
    `*🎀 Total: R$ ${total_price} 🎀*`,
  ].join("\n");

  const encodedMessage = encodeURIComponent(formattedMessage);
  const link = `https://api.whatsapp.com/send?phone=${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}&text=${encodedMessage}`;

  window.open(link, "_blank");
}