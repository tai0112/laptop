import { get, post, put, del } from "../../requests/api";

export const getManufacture = async (params = {}) => {
  const response = await get("/manufactures", params);
  return response;
};

export const getManufactureById = async (id) => {
  const response = await get(`manufactures/${id}`);
  return response;
};

export const deleteManufacture = async (id) => {
  const response = await del(`manufactures/${id}`);
  return response;
};

export const createManufacture = async (data) => {
  const response = await post("manufactures", data);
  return response;
};

export const updateManufacture = async (id, data) => {
  const response = await put(`manufactures/${id}`, data);
  return response;
};
