import axios from "axios";

export const createCategory = async (adminToken, name) => {
  return await axios.post(
    "http://localhost:4000/api/category",
    { name },
    {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    }
  );
};

export const getAllCategories = async () => {
  return await axios.get("http://localhost:4000/api/categories");
};

export const getCategory = async (slug, adminToken) => {
  return await axios.get(
    "http://localhost:4000/api/category/" + slug,

    {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    }
  );
};

export const updateCategory = async (name, slug, adminToken) => {
  return await axios.put(
    "http://localhost:4000/api/category/" + slug,
    { name: name },
    {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    }
  );
};

export const removeCategory = async (slug, adminToken) => {
  return await axios.delete(
    "http://localhost:4000/api/category/" + slug,

    {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    }
  );
};
