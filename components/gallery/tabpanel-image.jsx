import { Tab } from "@headlessui/react";
import NextImage from "next/image";

const TabPanelImage = ({ image }) => {
  return (
    <>
      {image.attributes.infoimg.data.map((item) => (
        <Tab.Panel key={item.id}>
          <div className="aspect-square relative h-full w-full sm:rounded-lg overflow-hidden">
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
