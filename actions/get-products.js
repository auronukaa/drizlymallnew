"use server";

export const getProducts = async () => {
  const URL =
    process.env.NEXT_APP_API_URL +
    `/api/products?populate=*&pagination[page]=1&pagination[pageSize]=70&sort=createdAt:desc`;

  const res = await fetch(URL, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_APP_API_TOKEN}`,
    },
  });

  return res.json();
};
