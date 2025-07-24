export default function ProductList({ products, onEdit, onDelete }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      {products.map((product) => (
        <div key={product.id} className="border p-4 rounded shadow">
          {product.imagepath && (
            // <img src={`https://drive.google.com/uc?export=view&id=${product.imagepath}`} alt="" className="w-full h-40 object-cover mb-2" />
            <iframe
              src={`https://drive.google.com/file/d/${product.imagepath}/preview`}
              width="100%"
              height="480"
              allow="autoplay"
            />
          )}
          <h3 className="text-lg font-bold">{product.name}</h3>
          <p className="text-gray-700 text-sm">{product.description}</p>
          <p className="text-gray-800 font-medium">₹{product.price}</p>
          <p className="text-sm">Stock: {product.stock}</p>
          <p className={`text-sm ${product.isactive ? "text-green-600" : "text-red-600"}`}>
            {product.isactive ? "Active" : "Inactive"}
          </p>
          <div className="flex gap-2 mt-3">
            <button
              onClick={() => onEdit(product)}
              className="px-3 py-1 bg-yellow-400 text-white rounded"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(product.id)}
              className="px-3 py-1 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
