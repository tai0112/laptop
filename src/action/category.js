import axios from "axios";

// const API_BASE_URL = process.env.REACT_APP_BASE_URL;

// export const createCategory = async (category) => {
//   const response = await axios.post(`${API_BASE_URL}/api/category`, category);
//   return response.data;
// };

// export const getCategories = async () => {
//   const response = await axios.get(
//     `${process.env.REACT_APP_BASE_URL}/api/category`
//   );
//   return response.data;
// };

// export const deleteCategory = async (categoryId) => {
//   const response = await axios.delete(
//     `${API_BASE_URL}/api/category/${categoryId}`
//   );
//   return response.data;
// };

export const createCategory = (data) => {
  return {
    type: "ADD_CATEGORY",
    payload: data,
  };
};

export const getCategories = () => {
  return {
    type: "GET_CATEGORIES",
  };
};

export const deleteCategory = (categoryId) => {
  return {
    type: "DELETE_CATEGORY",
    payload: categoryId,
  };
};

export const getCategoryById = (categoryId) => {
  return {
    type: "GET_CATEGORY_BY_ID",
    payload: categoryId,
  };
};

export const updateCategory = (categoryId, category) => {
  return {
    type: "UPDATE_CATEGORY",
    payload: { categoryId, category },
  };
};
