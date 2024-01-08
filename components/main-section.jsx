import Image from "next/image";

const MainSection = ({ item }) => {
  return (
    <div className="rounded-xl relative aspect-square md:aspect-[2.4/1] overflow-hidden">
      <div className="flex flex-col items-center justify-center w-full h-full text-center gap-y-8">
        <div className="z-10 max-w-xs text-3xl font-semibold sm:text-5xl lg:text-6xl sm:max-w-xl">
          {item?.attributes?.title}
        </div>
      </div>
      <Image
        src={
          process.env.NEXT_APP_API_URL +
          item?.attributes?.image?.data?.attributes?.url
        }
        fill
        alt="Image"
        className="object-cover z-1"
        priority
      />
    </div>
  );
};

export default MainSection;
