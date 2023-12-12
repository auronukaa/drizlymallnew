"use client";

import { Tab } from "@headlessui/react";
import GalleryTab from "./gallery-tab";
import TabPanelImage from "./tabpanel-image";

const Gallery = ({ images }) => {
  return (
    <Tab.Group as="div" className="flex flex-col-reverse">
      <div className="mx-auto mt-4 hidden w-full max-w-2xl sm:block lg:max-w-none">
        <Tab.List className="grid grid-cols-6 gap-6">
          {images.data.map((image) => (
            <GalleryTab key={image.id} image={image} />
          ))}
        </Tab.List>
      </div>
      <Tab.Panels className="aspect-square w-full">
        {images.data.map((image) => (
          <TabPanelImage key={image.id} image={image} />
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};

export default Gallery;
