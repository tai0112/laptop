import { get, post, put, del } from "../../src/requests/api";

export const getCart = async (params = {}) => {
  const response = await get("/cart", params);
  return response;
};

export const getCartDetails = async (cartId) => {
  const response = await get(`cartDetail/GetByCartId/${cartId}`);
  return response;
};

export const deleteProductDetail = async (id) => {
  const response = await del(`ProductDetails/${id}`);
  return response;
};

export const addToCart = async (data) => {
  const response = await post("/cartDetail", data);
  return response;
};

export const payCart = async (data) => {
  const response = await post("/cart/create-payment", data);
  return response;
};

export const confirmPaid = async () => {
  const response = await get("/cart/vnpay-return");
  return response;
};

export const decreaseQuantity = async (data) => {
  const response = await post("/cartDetail/decreaseQuantity", data);
  return response;
};

export const updateProductDetail = async (id, data) => {
  const response = await put(`ProductDetails/${id}`, data);
  return response;
};

export const deleteCartDetail = async (id) => {
  const response = await del(`/cartDetail/${id}`);
  return response;
};
