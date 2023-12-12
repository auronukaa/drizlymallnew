import { Tab } from "@headlessui/react";
import NextImage from "next/image";

const TabPanelImage = ({ image }) => {
  return (
    <>
      {image.attributes.infoimg.data.map((item) => (
        <Tab.Panel key={item.id}>
          <div className="aspect-square relative h-full w-full sm:rounded-lg overflow-hidden">
            {image.attributes.stock === 1 && (
              <div className="absolute inset-0 h-full w-full flex justify-center items-center bg-gray-50 bg-opacity-60 z-50">
                <span className="bg-black rounded-md text-white px-4 py-2 z-50 text-lg">
                  Jashtë Stokut
                </span>
              </div>
            )}

            <NextImage
              fill
              src={process.env.NEXT_PUBLIC_IMAGES_URL + item.attributes.url}
              alt="Image"
              className="object-contain object-center"
            />
          </div>
        </Tab.Panel>
      ))}
    </>
  );
};

export default TabPanelImage;
