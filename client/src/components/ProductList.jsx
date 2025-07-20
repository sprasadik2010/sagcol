import ProductItem from "./ProductItem";

export default function ProductList() {
  const images = import.meta.glob('../assets/products/*.{jpg,jpeg,png,svg}', {
    eager: true,
    import: 'default'
  });
  const products = Object.values(images);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 p-4">
      {products.map((src, index) => (
        <ProductItem
          key={index}
          id={index}
          src={src}
          name={`Product ${index + 1}`}
          price={999 + index * 100}
          priceSale={index % 2 === 0 ? 799 + index * 50 : null}
          status={index % 2 === 0 ? 'sold out' : ''}
          // colors={['#ff69b4', '#800080', '#ffd700'].slice(0, (index % 3) + 1)}
        />
      ))}
    </div>
  );
}
