"use client";

import ProductCard from "@/components/ui/product-card";
import NoResults from "@/components/ui/no-results";

import { React, useEffect, useState } from "react";
import MeiliSearch from "meilisearch";
import Filter from "./filter";

const AllProducts = ({ products }) => {
  // const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
  //   queryKey: ["products"],
  //   queryFn: getProducts,
  //   getNextPageParam: (lastPage) => {
  //     // if (
  //     //   lastPage.meta.pagination.page === lastPage.meta.pagination.pageCount
  //     // ) {
  //     //   return false;
  //     // }
  //     // return lastPage.meta.pagination.page + 1;
  //   },
  // });

  // const products = data?.pages.reduce((acc, page) => {
  //   return [...acc, ...page.data];
  // }, []);

  // const [collection, setCollection] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const client = new MeiliSearch({
  //       host: "https://meiliapisearch.drizlymall.com",
  //       apiKey: "d8f9e21d-a4a3-4f30-b246-90e7c9ec54a4",
  //     });
  //     const index = await client.getIndex("product");
  //     const movies = await index.search("*");
  //     setCollection(movies);
  //   };
  //   fetchData();
  // }, []);

  return (
    <div className="px-0 pb-24 mt-10 sm:px-6 lg:px-8">
      {/* <div className="hidden lg:flex">
        <Filter />
      </div> */}
      {/* <div className="mx-2 my-5">
          <h1 className="flex items-center justify-center text-lg font-medium sm:justify-start">
            Rezultatet:{" "}
            <span className="ml-2 text-xl font-bold">
              {products.data.length}
            </span>
          </h1>
          <hr className="my-2" />
        </div> */}
      <div className="mx-2 mb-7">
        <h1 className="flex items-center justify-center text-base font-medium sm:text-xl">
          Rezultatet:{" "}
          <span className="ml-2 text-base font-bold sm:text-xl">
            {products.data.length}
          </span>
        </h1>
        <hr className="my-2" />
      </div>
      <div className="relative flex flex-col items-center justify-center">
        <div className="flex items-center justify-center w-full gap-x-7 gap-y-7 lg:px-0">
          <div className="w-full space-y-5 sm:space-y-12">
            {products?.length === 0 && <NoResults />}
            <div className="grid grid-cols-2 gap-2 mx-2 md:grid-cols-3 lg:grid-cols-5 sm:gap-4 sm:mx-0">
              {products.data.map((item, id) => (
                <ProductCard key={id} data={item} />
              ))}
            </div>
            {/* <InfiniteScroll
              dataLength={data.pages.length}
              next={fetchNextPage}
              hasMore={hasNextPage}
              loader={
                <div className="flex justify-center w-full my-20">
                  <Image src={Loader} alt="Loader GIF" className="w-[150px]" />
                </div>
              }
            >
            </InfiniteScroll> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
