import axios from "axios";

export const getComments = async (blog) => {
  return await axios.get(`http://localhost:4000/api/comments/${blog}`);
};
