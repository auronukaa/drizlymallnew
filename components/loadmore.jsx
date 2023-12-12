"use client";

import { getProducts } from "@/actions/get-products";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import ProductCard from "./ui/product-card";

let page = 2;

function LoadMore() {
  const { ref, inView } = useInView();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (inView) {
      getProducts(page).then((res) => {
        setData([...data, ...res.data]);
        page++;
      });
    }
  }, [inView, data]);

  return (
    <>
      {data.map((item, id) => (
        <ProductCard key={id} data={item} />
      ))}
      <section className="flex justify-center items-center w-full mb-28">
        <div ref={ref}>
          <Image
            src="./spinner.svg"
            alt="spinner"
            width={56}
            height={56}
            className="object-contain"
          />
        </div>
      </section>
    </>
  );
}

export default LoadMore;
