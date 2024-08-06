export const formatCEP = (value = "") => {
  return value.replace(/^(\d{5})(\d{3})?$/, "$1-$2");
};
