import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";

import IconButton from "@/components/ui/icon-button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";

const CartItem = ({ data }) => {
  const cart = useCart();

  const onRemove = () => {
    cart.removeItem(data?.id);
  };

  return (
    <li className="flex py-6 border-b">
      <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
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
        <div className="absolute z-10 right-0 top-0">
          <IconButton onClick={onRemove} icon={<X size={15} />} />
        </div>

        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div className="flex justify-between">
            <p className="text-base font-semibold text-black">
              {data.attributes.title}
            </p>
          </div>
          <div className="flex flex-col text-xs sm:text-sm mt-3 sm:mt-0">
            {data?.type && (
              <p className=" sm:border-l sm:border-gray-300 sm:pl-3 text-gray-500">
                {data?.type}
              </p>
            )}
            {data?.type && <hr className="block sm:hidden my-2 w-[50%]" />}
          </div>
        </div>

        <p className="text-gray-500 mb-3 sm:mb-0 sm:mt-14 text-xs sm:text-sm">
          Sasia : {data?.quantity}
        </p>
        <Currency
          value={data?.attributes?.priceDiscount * data.quantity}
          price={data?.attributes?.price * data.quantity}
        />
      </div>
    </li>
  );
};

export default CartItem;
