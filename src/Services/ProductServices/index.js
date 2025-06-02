import { get, post, put, del } from "../../requests/api";

export const getProducts = async (params = {}) => {
  const response = await get("/products", params);
  return response;
};

export const getProductById = async (id) => {
  const response = await get(`products/${id}`);
  return response;
};

export const deleteProduct = async (id) => {
  const response = await del(`products/${id}`);
  return response;
};

export const createProduct = async (data) => {
  const response = await post("products", data);
  return response;
};

export const updateProduct = async (id, data) => {
  const response = await put(`products/${id}`, data);
  return response;
};
