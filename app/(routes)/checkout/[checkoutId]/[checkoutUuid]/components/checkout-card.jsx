"use client";

import Currency from "@/components/ui/currency";
import Image from "next/image";

const CheckoutCard = ({ data }) => {
  return (
    <div className="flex items-center py-6 px-4 sm:px-7">
      <div className="relative h-20 w-20 rounded-md overflow-hidden sm:h-32 sm:w-32">
        <Image
          fill
          src={
            process.env.NEXT_PUBLIC_IMAGES_URL +
            data.attributes.image.data.attributes.url
          }
          alt=""
          className="object-contain object-center"
        />
      </div>
      <div className="relative ml-4 flex flex-1 flex-col justify-start sm:p-5 sm:ml-6">
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 gap-y-4 sm:pr-0">
          <div className="flex flex-col gap-y-6">
            <p className="text-lg sm:text-xl md:text-2xl font-semibold text-black">
              {data.attributes.title}
            </p>
            <p className="opacity-50 hidden sm:flex max-w-[90%]">
              {data.attributes.description.substr(0, 100)} ...
            </p>
          </div>
          <div className="flex flex-col sm:items-end text-xs sm:text-sm mt-3 sm:mt-0">
            {data?.type && (
              <p className=" sm:border-l sm:border-gray-300 sm:pl-3 text-gray-500">
                {data?.type}
              </p>
            )}
            {data?.type && <hr className="block sm:hidden my-2 w-[50%]" />}
            <p className="text-gray-500 mb-3 sm:mb-0 sm:mt-14 text-xs sm:text-sm">
              Sasia : {data?.quantity}
            </p>
            <div className="flex items-center justify-end pt-2">
              <Currency
                value={data?.attributes?.priceDiscount * data.quantity}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutCard;
