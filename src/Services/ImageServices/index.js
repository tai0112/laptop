import { get, post, del, put } from "../../requests/api";

export const getImages = async (params = {}) => {
  const response = await get("/productDetails", params);
  return response;
};

export const getImagesByProductDetailId = async (productDetailId) => {
  const response = await get(`productImages/images/${productDetailId}`);
  return response;
};

export const getImageById = async (id) => {
  const response = await get(`productImages/${id}`);
  return response;
};

export const deleteImage = async (id) => {
  const response = await del(`productImages/${id}`);
  return response;
};

export const createImage = async (data) => {
  console.log("data", data);
  const response = await post("productImages/upload", data);
  return response;
};

export const updateImage = async (id, data) => {
  const response = await put(`productImages/${id}`, data);
  return response;
};
