export const getCategories = async () => {
  const URL =
    process.env.NEXT_APP_API_URL + "/api/categories?populate=*&sort=id:asc";

  const res = await fetch(URL, {
    headers: {
      Authorization: "Bearer " + process.env.NEXT_APP_API_TOKEN,
    },
  });
  return res.json();
};
