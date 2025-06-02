export const formatVNDWithoutSymbol = (value) => {
  return new Intl.NumberFormat('vi-VN').format(value);
};