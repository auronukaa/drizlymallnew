import Image from "next/image";

const SwiperImages = ({ image }) => {
  return (
    <div className="aspect-square cursor-pointer rounded-md">
      <Image
        fill
        src={process.env.NEXT_PUBLIC_IMAGES_URL + image?.attributes?.url}
        alt=""
        className="object-contain object-center"
      />
    </div>
  );
};

export default SwiperImages;
