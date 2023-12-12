import NoResults from "./ui/no-results";
import ProductCard from "./ui/product-card";

const ProductList = ({ items, title }) => {
  return (
    <div className="space-y-5 sm:space-y-12">
      <h3 className="font-semibold text-xl sm:text-3xl text-center sm:text-left">
        {title}
      </h3>
      {items?.length === 0 && <NoResults />}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-0">
        {items?.data?.map((item) => (
          <ProductCard key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
