import { jwtDecode } from "jwt-decode";

export const getDataUserLocalStorage = () => {
  const user = localStorage.getItem("user");
  return JSON.parse(user);
};

export const getJWTLocalStorage = () => {
  const jwt = localStorage.getItem("jwt");
  return jwt;
};

export const removeDataUserLocalStorage = () => {
  localStorage.clear();
};

export const addDataUserLocalStorage = (response) => {
  localStorage.setItem("jwt", response.jwtToken);
  localStorage.setItem("user", JSON.stringify(response.user));
};

export const getRoleFromJWT = () => {
  const decode = getJWTLocalStorage() ? jwtDecode(getJWTLocalStorage()): "";
  if (decode !== "") {
    const role =
      decode["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    return role;
  }
  return "";
};
