import api_client from "@/config/api_client";

export const deleteAddress = async (id: string): Promise<void> => {
  try {
    if (!id) return
    const { data } = await api_client.delete("/addresses/" + id);
    return data
  } catch (error) {
    console.error(error);
  }
};
