export const getMain2 = async () => {
  const URL =
    process.env.NEXT_APP_API_URL +
    `/api/main-sections?populate=*&filters[$and][0][id][$eq]=2`;

  const res = await fetch(URL, {
    headers: {
      Authorization: "Bearer " + process.env.NEXT_APP_API_TOKEN,
    },
  });
  return res.json();
};
