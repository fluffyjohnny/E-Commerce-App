import { useEffect, useState } from "react";
import { useFilter } from "./FilterContext";
import { Tally3 } from "lucide-react";
import axios from "axios";

function MainContent() {
  const { searchQuery, selectedCategory, minPrice, maxPrice, keyword } =
    useFilter();
  const [products, setProducts] = useState<any[]>([]);
  const [filter, setFilter] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const itemsPerPage = 12;

  useEffect(() => {
    let url = `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${
      (currentPage - 1) * itemsPerPage
    }`;
    if (keyword) {
      url = `https://dummyjson.com/products/search?q=${keyword}`;
    }

    axios
      .get(url)
      .then((res) => setProducts(res.data.products))
      .catch((e) => console.log("Error fetching products", e));
  }, [currentPage, keyword]);

  const getFilterProducts = () => {
    let filteredProducts = products;

    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= minPrice
      );
    }

    if (maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price <= maxPrice
      );
    }

    if (searchQuery) {
      filteredProducts = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    switch (filter) {
      case "expensive":
        return filteredProducts.sort((a, b) => (b.price = a.price));
      case "cheap":
        return filteredProducts.sort((a, b) => (a.price = b.price));
      case "popular":
        return filteredProducts.sort((a, b) => (b.rating = a.rating));
      default:
        return filteredProducts;
    }
  };

  return (
    <section className="xl:w-[55rem] lg:w-[55rem] sm:w-[40rem] xs:w-[20rem] p-5">
      <div className="mb-5">
        <div className="flex flex-col sm:flex-row justify-between item-center">
          <div className="relative mb-5 mt-5">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="border px-4 py-2 rounded-full flex items-center"
            >
              <Tally3 className="mr-2" />

              {filter === "All"
                ? "Filter"
                : filter.charAt(0).toLowerCase() + filter.slice(1)}
            </button>

            {dropdownOpen && (
              <div className="absolute bg-white border border-grey-300 rounded mt-2 w-full sm:w-40">
                <button
                  onClick={() => setFilter("cheap")}
                  className="block px-4 py-2 w-full text-left hover:bg-grey-200"
                >
                  Cheap
                </button>
                <button
                  onClick={() => setFilter("expensive")}
                  className="block px-4 py-2 w-full text-left hover:bg-grey-200"
                >
                  Expensive
                </button>
                <button
                  onClick={() => setFilter("popular")}
                  className="block px-4 py-2 w-full text-left hover:bg-grey-200"
                >
                  Popular
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {/* Bookcard */}
        </div>
      </div>
    </section>
  );
}

export default MainContent;
