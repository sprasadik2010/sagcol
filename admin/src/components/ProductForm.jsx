import { useState, useEffect } from "react";
import { uploadProductImage } from "../api/productApi";

export default function ProductForm({ onSave, product }) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: 0,
    imagefile: null,
    isactive: true,
  });

  useEffect(() => {
    if (product) {
      setForm({
        ...product,
        imagefile: null, // don't prefill file input
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file" && files.length > 0) {
      const file = files[0];

      // Validate file type
      const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
      if (!allowedTypes.includes(file.type)) {
        alert("Invalid file type. Please upload JPG, PNG, WEBP, or GIF.");
        e.target.value = ""; // reset file input
        return;
      }

      // Valid file
      setForm((prev) => ({ ...prev, imagefile: file }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let imagepath = "";

    // Image is required for new product only
    if (!product && !form.imagefile) {
      alert("Please select an image.");
      setLoading(false);
      return;
    }

    // Upload image if selected
    if (form.imagefile) {
      try {
        const result = await uploadProductImage(form.imagefile);
        imagepath = result.drive_url;
      } catch (err) {
        alert("Image upload failed: " + err.message);
        setLoading(false);
        return;
      }
    } else if (product) {
      imagepath = product.imagepath; // retain existing image during update
    }

    const productData = {
      name: form.name,
      description: form.description,
      price: parseFloat(form.price),
      stock: parseInt(form.stock),
      isactive: form.isactive,
      imagepath: imagepath,
    };

    await onSave(productData);

    setForm({
      name: "",
      description: "",
      price: "",
      stock: 0,
      imagefile: null,
      isactive: true,
    });

    document.getElementById("fileInput").value = "";
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 border rounded shadow"
      encType="multipart/form-data"
    >
      <input
        name="name"
        className="border p-2 w-full"
        placeholder="Product Name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        className="border p-2 w-full"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      />
      <input
        name="price"
        type="number"
        className="border p-2 w-full"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
      />
      <input
        name="stock"
        type="number"
        className="border p-2 w-full"
        placeholder="Stock"
        value={form.stock}
        onChange={handleChange}
      />
      <input
        id="fileInput"
        name="imagefile"
        type="file"
        accept="image/*"
        className="border p-2 w-full"
        onChange={handleChange}
      />
      <label className="flex items-center space-x-2">
        <input
          name="isactive"
          type="checkbox"
          checked={form.isactive}
          onChange={handleChange}
        />
        <span>Active</span>
      </label>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center justify-center"
        type="submit"
        disabled={loading}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin h-5 w-5 mr-2 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
              ></path>
            </svg>
            Processing...
          </>
        ) : product ? "Update Product" : "Add Product"}
      </button>
    </form>
  );
}
