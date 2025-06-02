import { get, post, put, del } from "../../requests/api"

export const getCategories = async (params = {}) => {
  const response = await get("/categories", params);
  return response;
}

export const getCategoryById = async (id) => {
  const response = await get(`categories/${id}`);
  return response;
}

export const deleteCategory = async (id) => {
  const response = await del(`categories/${id}`);
  return response;
}

export const createCategory = async (data) => {
  const response = await post("categories", data);
  return response;
}

export const updateCategory = async (id, data) => {
  const response = await put(`categories/${id}`, data);
  return response;
}