/* eslint-disable import/prefer-default-export */
import axios from "axios";

export const postSquares = (data) => {
  return axios.post(`${import.meta.env.VITE_BASE_URL}`, data);
};
