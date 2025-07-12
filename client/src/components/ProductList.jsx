import SAGProduct from "./SAGProduct";

export default function ProductList() {
  const images = import.meta.glob('../assets/products/*.{jpg,jpeg,png,svg}', {
    eager: true,
    import: 'default'
  });
  const products = Object.values(images);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 p-4">
      {products.map((src, index) => (
        <SAGProduct key={index} index={index} src={src} />
      ))}
    </div>
  );
}
