import { useState } from "react";
import AddProducts from "./components/AddProducts";
import ProductList from "./components/ProductList";
import SearchBar from "./components/SearchBar";
import FilterByCategory from "./components/FilterByCategory";
import SortProduct from "./components/SortProduct";

function App() {
  const [products, setProducts] = useState([]);
  const [editValue, setEditValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [sort, setSort] = useState("None");

  const opt = ["Electornics", "Clothing", "Grocery", "others"];
  const sortingOptions = [
    "None",
    "Price: Low → High",
    "Price: High → Low",
    "Name: A → Z",
    "Name: Z → A",
  ];

  function handleAddProducts(newProduct) {
    if (editValue) {
      setProducts((prev) =>
        prev.map((prod) => (prod.id === newProduct.id ? newProduct : prod)),
      );
      setEditValue("");
      return;
    }

    setProducts((prev) => [...prev, newProduct]);
  }

  function handleDeleteProduct(id) {
    setProducts(products.filter((product) => product.id !== id));
  }

  function handleEditProduct(id) {
    setEditValue(products.find((editVal) => editVal.id === id));
  }

  const allProducts = products
    .filter((product) =>
      product.productName.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .filter((product) =>
      filterCategory === "All" ? true : product.category === filterCategory,
    )
    .sort((a, b) => {
      if (sort === "Price: Low → High") return a.price - b.price;
      if (sort === "Price: High → Low") return b.price - a.price;
      return 0;
    });

  return (
    <div className="App">
      <AddProducts
        categoryOptions={opt}
        onAddProduct={handleAddProducts}
        editValue={editValue}
      />
      <SearchBar searchQuery={searchQuery} onSearchQuery={setSearchQuery} />
      <FilterByCategory categoryOptions={opt} onFilter={setFilterCategory} />
      <SortProduct sortOptions={sortingOptions} onSort={setSort} />
      <ProductList
        products={allProducts}
        onDelete={handleDeleteProduct}
        onEdit={handleEditProduct}
      />
    </div>
  );
}

export default App;
