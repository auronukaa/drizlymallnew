import Container from "@/components/ui/container";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getProducts } from "@/actions/get-products";
import AllProducts from "./components/all-products";
import Billboard from "./components/billboard";

export const revalidate = 0;

export const metadata = {
  title: "Produktet | Drizlymall",
  description: "Produktet e dyqanit online Drizlymall",

  alternates: {
    canonical: `https://drizlymall.com/produktet`,
  },
};

const Products = async () => {
  const products = await getProducts();

  // const queryClient = new QueryClient();
  // await queryClient.prefetchInfiniteQuery({
  //   queryKey: ["products"],
  //   queryFn: getProducts,
  // });

  return (
    <div className="bg-[#fff]">
      <Container>
        <Billboard />
        {/* <HydrationBoundary state={dehydrate(queryClient)}> */}
        <AllProducts products={products} />
        {/* </HydrationBoundary> */}
      </Container>
    </div>
  );
};

export default Products;
