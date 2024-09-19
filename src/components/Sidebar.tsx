import { useEffect, useState } from "react";

interface Product {
  category: string;
}

interface FetchResponse {
  products: Product[];
}

const Sidebar = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [keywords, setKeywords] = useState([
    "apple",
    "watch",
    "Fashion",
    "pets",
    "cleaning",
    "clothes",
  ]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data: FetchResponse = await response.json();
        const uniqueCategories = Array.from(
          new Set(data.products.map((x) => x.category))
        );

        setCategories(uniqueCategories);
      } catch (err) {
        console.error("Error fetching product", err);
      }
    };

    fetchCategories();
  });

  return (
    <div className="w-64 p-5 h-screen">
      <h1 className="text-2xl font-bold mb-10 mt-4">React Store</h1>

      <section>
        <input
          type="text"
          className="border-2 rounded px-2 sm:mb-0"
          placeholder="Search Product"
        />
      </section>
    </div>
  );
};

export default Sidebar;
