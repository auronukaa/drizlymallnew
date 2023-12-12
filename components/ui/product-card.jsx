"use client";

import Image from "next/image";
import Currency from "./currency";
import { useRouter } from "next/navigation";

const ProductCard = ({ data }) => {
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    router.push(`/produktet/${data?.attributes.uid}`, undefined, {
      scroll: true,
    });
  };

  return (
    <div
      className="bg-white z-5 group cursor-pointer rounded-md border p-3 space-y-4 hover:shadow-md"
      onClick={(e) => handleClick(e)}
    >
      <div className="aspect-square rounded-md relative">
        <div className="absolute top-0 -right-1 z-20">
          <span className="text-xs sm:text-sm rounded-md  h-fit w-fit text-white font-semibold no-underline ml-2 bg-orange-600 py-1 px-1 sm:px-2">
            -{data.attributes.discountPercentage}%
          </span>
        </div>
        {data?.attributes?.stock === 1 && (
          <div className="absolute flex items-center justify-center w-full h-full z-10 font-semibold bg-soldout">
            <span className="bg-black rounded-md px-4 py-2 uppercase text-sm text-white">
              Jashtë Stokut
            </span>
          </div>
        )}
        <Image
          src={
            process.env.NEXT_PUBLIC_IMAGES_URL +
            data?.attributes?.image?.data?.attributes?.url
          }
          fill
          alt="Image"
          className="aspect-square object-contain rounded-md p-2 sm:p-0"
          sizes="1080px"
        />
      </div>
      <div className="flex flex-col gap-y-4 justify-between">
        <div className="h-[32px] sm:h-[45px]">
          <p className="font-medium text-sm sm:text-base mb-1 w-full">
            {data?.attributes?.title}
          </p>
        </div>
        <div className="flex items-center justify-end h-full sm:mb-1">
          <Currency
            value={
              data?.attributes?.Discount
                ? data?.attributes?.priceDiscount
                : data?.attributes?.price
            }
            price={data?.attributes?.price}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
