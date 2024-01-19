import axios from "axios";

export const createPodcast = async (podcast, adminToken) => {
  return await axios.post(
    "http://localhost:4000/api/podcast",
    {
      podcast,
    },
    {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    }
  );
};

export const getAllPodcasts = async () => {
  return await axios.get("http://localhost:4000/api/podcasts");
};

export const getPodcast = async (slug, adminToken) => {
  return await axios.get("http://localhost:4000/api/podcast/" + slug, {
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
  });
};

export const updatePodcast = async (slug, podcast, adminToken) =>
  await axios.put(`http://localhost:4000/api/podcast/${slug}`, podcast, {
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
  });

export const removePodcast = async (slug, adminToken) => {
  return await axios.delete("http://localhost:4000/api/podcast/" + slug, {
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
  });
};

export const relatedPodcasts = async (category) => {
  return await axios.get("http://localhost:4000/api/podcasts/" + category);
};
