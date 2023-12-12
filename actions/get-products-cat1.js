"use server";

export const getProductsCat1 = async () => {
  const URL =
    process.env.NEXT_APP_API_URL +
    "/api/products?populate=*&filters[$and][0][home_categories][title][$eq]=Produktet më të shitura&pagination[start]=0&pagination[limit]=4&sort=id:desc";

  const res = await fetch(URL, {
    headers: {
      Authorization: "Bearer " + process.env.NEXT_APP_API_TOKEN,
    },
  });

  return res.json();
};
