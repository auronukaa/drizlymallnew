"use server"

export const getProduct = async ({ params }) => {
  const URL =
    process.env.NEXT_APP_API_URL +
    `/api/products?populate=*&filters[$and][0][uid][$eq]=${params.produktetId}`;

  const res = await fetch(URL, {
    headers: {
      Authorization: "Bearer " + process.env.NEXT_APP_API_TOKEN,
    },
  });

  return res.json();
};
