import { axiosInstance } from "./api";

const postAPI = async (endpoint, body) => {
  try {
    const response = await axiosInstance.post(endpoint, body);
    if (response.data) {
      return response.data;
    } else {
      throw new Error("function postAPI error.");
    }
  } catch (err) {
    return err;
  }
};

const getAPI = async (endpoint) => {
  try {
    const response = await axiosInstance.get(endpoint);

    if (response.data) {
      return response.data;
    } else {
      throw new Error("function getAPI error.");
    }
  } catch (err) {
    return err;
  }
};

const putAPI = async (endpoint, body) => {
  // ;
  try {
    const response = await axiosInstance.put(endpoint, body);

    if (response.data) {
      return response.data;
    } else {
      throw new Error("function putAPI error.");
    }
  } catch (err) {
    return err;
  }
};
const delAPI = async (endpoint, body = {}) => {
  // ;
  try {
    const response = await axiosInstance.delete(endpoint, body);

    if (response.data) {
      return response.data;
    } else {
      throw new Error("function delAPI error.");
    }
  } catch (err) {
    return err;
  }
};

export { getAPI, postAPI, putAPI, delAPI };
