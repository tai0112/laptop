import { get, post, put, del } from "../../src/requests/api";

export const getPayments = async (params) => {
  const response = await get(`/payment`, params);
  return response;
};

export const getGiftById = async (id) => {
  const response = await get(`gifts/${id}`);
  return response;
};

export const deleteGift = async (id) => {
  const response = await del(`gifts/${id}`);
  return response;
};

export const createGift = async (data) => {
  const response = await post("gifts", data);
  return response;
};

export const updateGift = async (id, data) => {
  const response = await put(`gifts/${id}`, data);
  return response;
};
