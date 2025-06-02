import { get, post, put, del } from "../../requests/api"

export const getProductDetails = async (params = {}) => {
  const response = await get("/productDetails", params);
  return response;
}

export const getProductDetailByProductId = async (productId) => {
  const response = await get(`productDetails/product/${productId}`);
  return response;
}

export const getProductDetailById = async (id) => {
  const response = await get(`ProductDetails/${id}`);
  return response;
}

export const deleteProductDetail = async (id) => {
  const response = await del(`ProductDetails/${id}`);
  return response;
}

export const createProdcutDetail = async (data) => {
  const response = await post("ProductDetails", data);
  return response;
}

export const updateProductDetail = async (id, data) => {
  console.log("data:", data);
  const response = await put(`ProductDetails/${id}`, data);
  return response;
}