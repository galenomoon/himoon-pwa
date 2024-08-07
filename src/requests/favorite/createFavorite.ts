import api_client from "@/config/api_client";

export const createFavorite = async (productId: string): Promise<void> => {
  try {
    await api_client.post("/favorites", { productId });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
