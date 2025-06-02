import { get, post, put } from "../../requests/api";

export const loginAPI = async (params = {}) => {
  const response = await post("/user/login", params);
  return response;
};

export const registerAPI = async (params = {}) => {
  const response = await post("user/register", params);
  return response;
};

export const updateUserAPI = async (params = {}) => {
  const response = await put("/user/update", params);
  return response;
};
