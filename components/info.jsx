"use client";

import { Minus, Plus, ShoppingBag } from "lucide-react";

import { v4 as uuidv4 } from "uuid";
import Currency from "./currency";
import { useEffect, useState } from "react";
import useCart from "@/hooks/use-cart";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useCheckout } from "@/hooks/use-checkout";
import { Button } from "./ui/button";

const Info = ({ data }) => {
  const subCat = data?.attributes?.sub_categories?.data[0]?.attributes?.title;
  const [type, setType] = useState(subCat);
  const [qty, setQty] = useState(1);
  const useDisable = 1;

  const cart = useCart();
  const checkout = useCheckout();
  const router = useRouter();
  const uuid = uuidv4();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const onAddToCart = () => {
    cart.addToCart(data, qty, type);
  };

  const onCheckout = () => {
    checkout.removeCheckout();
    checkout.checkoutItem(data, qty, type);
    router.push(`/checkout/${data.attributes.uid}/${uuid}`);
  };
  return (
    <>
      <div className="flex flex-col sm:p-10 rounded-md sm:bg-gray-50">
        <div className="flex justify-between items-center sm:hidden fixed w-full h-[65px] z-50 bottom-0 left-0 bg-white border-t border-gray-200">
          <div className="flex justify-between w-full items-center px-4 py-2 gap-x-4">
            <button
              onClick={onCheckout}
              className="flex rounded-sm border-2 border-orange-600 bg-orange-600 border-transparent px-5 z-1 py-3 disabled:cursor-not-allowed disabled:opacity-50 text-white font-semibold
          hover:opacity-75 transition w-[80%] justify-center text-sm sm:w-auto items-center gap-x-2 "
            >
              Blej menjëherë
            </button>
            <button
              className="flex text-sm items-center gap-x-2 bg-gray-100 w-fit justify-center sm:w-auto rounded-sm px-5 py-3 disabled:cursor-not-allowed disabled:opacity-50 text-black font-semibold
          hover:opacity-75 hover:bg-black hover:text-white transition"
              onClick={onAddToCart}
            >
              <ShoppingBag size={25} opacity={1} />
            </button>
          </div>
        </div>
        {/* titulli */}
        <h1 className="text-2xl font-medium sm:pb-3 text-gray-900">
          {data?.attributes?.title}
        </h1>
        <div className="mt-3 items-end justify-between">
          {/* qmimi */}
          <div className="text-2xl text-gray-900">
            <Currency
              value={
                data?.attributes?.Discount
                  ? data?.attributes?.priceDiscount
                  : data?.attributes?.price
              }
              price={data.attributes.price}
              discount={data.attributes.discountPercentage}
            />
          </div>
        </div>
        {type && (
          <div className="flex items-center my-5 sm:my-7">
            <h1 className="text-gray-800 mr-2 text-sm">Lloji</h1>
            <hr className="w-full" />
          </div>
        )}
        {/* subCats */}
        <div className="grid grid-cols-1">
          {type && (
            <div className="flex flex-col gap-y-6 my-5 sm:my-2">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-2">
                {data?.attributes?.sub_categories?.data.map((item) => (
                  <Button
                    key={item?.id}
                    className={cn(
                      "rounded-md !text-sm text-gray-800 p-2 bg-white border border-gray-300",
                      type === item?.attributes?.title && "text-white bg-black"
                    )}
                    onClick={() => setType(item?.attributes?.title)}
                  >
                    {item?.attributes?.title}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center my-3 sm:my-5">
          <h1 className="text-gray-800 mr-2 text-sm">Sasia</h1>
          <hr className="w-full" />
        </div>

        <p className="mt-3 mb-2 text-xs text-neutral-700">
          Disponueshmëria e produktit :{" "}
          <span className="font-bold text-xs text-black">
            {data?.attributes?.stock}
          </span>
        </p>

        <div className="flex items-center w-full justify-center sm:justify-start mb-5">
          <button
            className="bg-transparent border border-gray-300 border-r-0 h-10 w-full flex items-center sm:w-fit px-4 rounded-tl-md rounded-bl-md"
            type="button"
            onClick={() => setQty(qty - 1)}
          >
            <Minus size={20} className="w-full" />
          </button>
          <input
            disabled={useDisable}
            className="bg-transparent border-y border-gray-300 h-10 text-center w-full sm:w-[10%] text-2xl"
            value={
              qty > data?.attributes?.stock
                ? setQty(qty - 1)
                : qty < 1
                ? setQty(1)
                : qty
            }
          />

          <button
            className="bg-transparent border border-gray-300 h-10 w-full border-l-0  flex items-center sm:w-fit px-4 rounded-tr-md rounded-br-md"
            type="button"
            onClick={() => setQty(qty + 1)}
          >
            <Plus size={20} className="w-full" />
          </button>
        </div>

        <div className="hidden sm:flex items-center my-3 sm:my-5">
          <h1 className="text-gray-800 mr-2 text-sm">Pagesa</h1>
          <hr className="w-full" />
        </div>

        <div className="flex items-center justify-center gap-2 w-full pt-2 sm:pt-4 pb-2">
          <div className="w-3 h-3 bg-orange-500 rounded-full" />
          <p className="w-full text-sm font-medium">
            Koha e arritjes së produktit: 24H - 72H
          </p>
        </div>
        <div className="mt-3 hidden sm:flex flex-col sm:flex-row items-center gap-x-3 gap-y-6">
          <button
            onClick={onCheckout}
            className="flex rounded-sm border-2 border-orange-600 bg-orange-600 border-transparent px-5 z-1 py-3 disabled:cursor-not-allowed disabled:opacity-50 text-white font-semibold
          hover:bg-orange-700 transition w-full justify-center text-lg sm:w-full items-center gap-x-2 "
          >
            Blej menjëherë
          </button>
          <button
            className="flex text-lg items-center gap-x-2 bg-transparent border-2 w-full border-black justify-center sm:w-full rounded-sm px-5 py-3 disabled:cursor-not-allowed disabled:opacity-50 text-black font-semibold
           hover:bg-black hover:text-white transition"
            onClick={onAddToCart}
          >
            Shto në shportë
            <ShoppingBag size={23} />
          </button>
        </div>

        <div className="flex sm:hidden items-center pt-7">
          <h1 className="text-gray-800 mr-2 text-sm">Përshkrimi</h1>
          <hr className="w-full" />
        </div>

        <div className="mt-10 flex items-center gap-x-3">
          <p className="whitespace-pre-wrap">{data?.attributes?.description}</p>
        </div>
      </div>
    </>
  );
};

export default Info;
