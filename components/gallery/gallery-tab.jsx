import NextImage from "next/image";
import { Tab } from "@headlessui/react";

import { cn } from "@/lib/utils";

const GalleryTab = ({ image }) => {
  return (
    <>
      {image.attributes.infoimg &&
        image?.attributes?.infoimg?.data.map((img) => (
          <Tab
            key={img.id}
            className="relative flex items-center justify-center bg-white rounded-md cursor-pointer aspect-square"
          >
            {({ selected }) => (
              <div>
                <span className="absolute inset-0 z-20 w-full h-full overflow-hidden rounded-md aspect-square">
                  <NextImage
                    fill
                    src={
                      process.env.NEXT_PUBLIC_IMAGES_URL + img?.attributes?.url
                    }
                    alt=""
                    className="object-contain object-center"
                  />
                </span>
                <span
                  className={cn(
                    "absolute inset-0 rounded-md ring-2 ring-offset-2",
                    selected ? "ring-black" : "ring-transparent"
                  )}
                />
              </div>
            )}
          </Tab>
        ))}
    </>
  );
};

export default GalleryTab;
