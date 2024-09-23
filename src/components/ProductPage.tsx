import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Product {
  images: string[];
  title: string;
  description: string;
  price: number;
  rating: string;
}

function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (id) {
      axios
        .get<Product>(`https://dummyjson.com/products/${id}`)
        .then((res) => {
          setProduct(res.data);
        })
        .catch((e) => console.error("Error fetching Product", e));
    }
  }, [id]);

  if (!product) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="p-5 w-[60%]">
      <button
        onClick={() => navigate(-1)}
        className="mb-5 px-4 py-2 bg-black text-white rounded"
      >
        Back
      </button>

      <img
        src={product.images[0]}
        alt={product.title}
        className="w-[50%] h-auto m-5"
      />

      <h1 className="text-2xl mb-4 font-bold">{product.title}</h1>
      <p className="mb-4 text-grey-700 w-[70%]">{product.description}</p>
      <div className="flex">
        <p>Price: ${product.price}</p>
        <p className="ml-10">Rating: {product.rating}</p>l-10
      </div>
    </div>
  );
}

export default ProductPage;
