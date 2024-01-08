import { Tab } from "@headlessui/react";
import NextImage from "next/image";

const TabPanelImage = ({ image }) => {
  return (
    <>
      {image.attributes.infoimg.data.map((item) => (
        <Tab.Panel key={item.id}>
          <div className="relative w-full h-full overflow-hidden aspect-square sm:rounded-lg">
            {image.attributes.stock === 1 && (
              <div className="absolute inset-0 z-50 flex items-center justify-center w-full h-full bg-gray-50 bg-opacity-60">
                <span className="z-50 px-4 py-2 text-base text-white bg-black rounded-md">
                  E SHITUR!
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
