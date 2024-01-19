import axios, { AxiosHeaders } from "axios";

export const createBlog = async (blog, adminToken) => {
  return await axios.post(
    "http://localhost:4000/api/blog",
    {
      blog: blog,
    },
    {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    }
  );
};

export const getAllBlogs = async () => {
  return await axios.get("http://localhost:4000/api/blogs");
};

export const removeBlog = async (slug, adminToken) => {
  return await axios.delete("http://localhost:4000/api/blog/" + slug, {
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
  });
};

export const getBlog = async (slug) => {
  return await axios.get("http://localhost:4000/api/blog/" + slug);
};

export const updateBlog = async (slug, blog, adminToken) => {
  return await axios.put("http://localhost:4000/api/blog/" + slug, blog, {
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
  });
};

export const relatedBlogs = async (categoryId) => {
  return await axios.get(
    "http://localhost:4000/api/blogs-related/" + categoryId
  );
};

export const commentBlog = async (author, website, text, blog) => {
  return await axios.put("http://localhost:4000/api/blog/comment/" + blog, {
    author,
    website,
    text,
  });
};

export const replyBlog = async (
  toAuthor,
  websiteFrom,
  fromAuthor,
  text,
  blog
) => {
  return await axios.put("http://localhost:4000/api/blog/reply/" + blog, {
    toAuthor,
    websiteFrom,
    fromAuthor,
    text,
  });
};

export const filterBlogs = async (query) => {
  return await axios.post("http://localhost:4000/api/blogs/filter", query);
};
