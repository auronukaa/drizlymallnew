"use client";

import { useEffect, useState } from "react";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "EUR",
});

const Currency = ({ value, price, discount }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="font-semibold flex items-center w-full">
      <div className="text-xl sm:text-3xl font-bold">
        {formatter.format(Number(value))}
      </div>
      {price && (
        <div className="text-sm sm:text-xl flex items-center font-normal justify-between w-full text-neutral-500 ml-2 sm:ml-3">
          <div className="line-through">{formatter.format(Number(price))}</div>
          {discount && (
            <span className="text-xs sm:text-sm rounded-md text-white no-underline ml-2 bg-orange-600 font-semibold py-1 px-2 sm:px-2">
              -{discount}%
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default Currency;
