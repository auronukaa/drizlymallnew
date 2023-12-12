"use client";

import ProductCard from "@/components/ui/product-card";
import NoResults from "@/components/ui/no-results";

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

  return (
    <div className="px-0 sm:px-6 lg:px-8 pb-24 mt-10">
      <div className="my-5 mx-2">
        <h1 className="text-lg font-medium flex items-center justify-center sm:justify-start">
          Rezultatet:{" "}
          <span className="font-bold text-xl ml-2">{products.data.length}</span>
        </h1>
        <hr className="my-2" />
      </div>
      <div className="flex items-center justify-center relative">
        <div className="w-full flex items-center justify-center gap-x-7 gap-y-7 lg:px-0">
          <div className="space-y-5 sm:space-y-12 w-full">
            {products?.length === 0 && <NoResults />}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4 mx-2 sm:mx-0">
              {products.data.map((item, id) => (
                <ProductCard key={id} data={item} />
              ))}
            </div>
            {/* <InfiniteScroll
              dataLength={data.pages.length}
              next={fetchNextPage}
              hasMore={hasNextPage}
              loader={
                <div className="w-full my-20 flex justify-center">
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
