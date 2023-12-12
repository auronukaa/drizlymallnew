import { getProductsCat1 } from "@/actions/get-products-cat1";
import { getProductsCat2 } from "@/actions/get-products-cat2";
import Billboard from "@/components/billboard";
import ProductList from "@/components/product-list";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { ArrowUpLeft, BadgeCheck, PackagePlus, Truck } from "lucide-react";
import Link from "next/link";

export const revalidate = 0;

const HomePage = async () => {
  const products = await getProductsCat1();
  const products2 = await getProductsCat2();

  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Billboard />
      </div>
      <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8 mb-8">
        <ProductList title="Produktet më të reja" items={products2} />
      </div>
      <div className="flex items-center flex-col w-full py-14 sm:py-32">
        <div className="flex flex-col sm:flex-row items-center w-full gap-y-2 justify-between px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl sm:text-3xl font-semibold text-center sm:text-left">
            Ne ofrojmë
            <br />
            përvojat më të mira për klientin
          </h1>
          <p className="text-neutral-500 text-sm border-t-2 sm:border-t-0 sm:border-l-4 border-gray-500 h-full sm:flex items-center pl-3 pt-2 sm:pt-0 text-center sm:text-left hidden">
            Ne sigurojmë që klientët tanë të kenë përvojat më të mira në
            Drizlymall
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-16 text-center sm:text-left place-items-center w-full px-4 sm:px-6 lg:px-8 mt-14 sm:mt-20 mb-16">
          <div className="flex flex-col items-center sm:items-start">
            <div className="flex items-center justify-center sm:justify-start w-full mb-5">
              <BadgeCheck
                size={55}
                className="p-2 text-orange-700 text-center bg-orange-100 border-2 border-orange-300 rounded-md"
              />
            </div>
            <h1 className="text-xl font-semibold">Garancion kënaqësie</h1>
            <p className="text-base text-neutral-500 mt-2 max-w-[87%] sm:max-w-[95%]">
              Në rast pakënaqësie ne ofrojmë : ndrrim falas ose kthimin e parave
            </p>
          </div>

          <div className="flex flex-col items-center sm:items-start">
            <div className="flex items-center justify-center sm:justify-start w-full mb-5">
              <PackagePlus
                size={55}
                className="p-2 text-orange-700 text-center bg-orange-100 border-2 border-orange-300 rounded-md"
              />
            </div>
            <h1 className="text-xl font-semibold">Produkte të reja çdo ditë</h1>
            <p className="text-base text-neutral-500 mt-2 max-w-[90%] sm:max-w-[95%]">
              Ne sigurojmë në përditësimin e produkteve të reja çdo ditë
            </p>
          </div>

          <div className="flex flex-col items-center sm:items-start">
            <div className="flex items-center justify-center sm:justify-start w-full mb-5">
              <Truck
                size={55}
                className="p-2 text-orange-700 text-center bg-orange-100 border-2 border-orange-300 rounded-md"
              />
            </div>
            <h1 className="text-xl font-semibold">
              Transport i Shpejtë dhe i Sigurt
            </h1>
            <p className="text-base text-neutral-500 mt-2 max-w-[90%] sm:max-w-[95%]">
              Ne ofrojmë transport të shpejtë dhe të sigurt për klientët tanë
              besnikë
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8 mb-8">
        <ProductList title="Produktet më të shitura" items={products} />

        <Link
          href="/produktet"
          className="w-full flex items-center justify-center"
        >
          <Button className="!text-sm sm:!text-base">
            <ArrowUpLeft size={22} className="mr-1" /> Të gjitha produktet
          </Button>
        </Link>
      </div>
    </Container>
  );
};

export default HomePage;
