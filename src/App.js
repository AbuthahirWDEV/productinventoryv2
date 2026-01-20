import { useEffect, useState } from "react";
import AddProducts from "./components/AddProducts";
import ProductList from "./components/ProductList";
import SearchBar from "./components/SearchBar";

function App() {
  const [products, setProducts] = useState([]);
  const [editValue, setEditValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  function handleAddProducts(newProduct) {
    if (editValue) {
      setProducts((prev) =>
        prev.map((prod) => (prod.id === newProduct.id ? newProduct : prod)),
      );
      setEditValue("")
      return
    }

    setProducts(prev => [...prev, newProduct])
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
  );


  return (
    <div className="App">
      <AddProducts
        onAddProduct={handleAddProducts}
        editValue={editValue}
      />
      <SearchBar searchQuery={searchQuery} onSearchQuery={setSearchQuery} />
      <ProductList
        products={allProducts}
        onDelete={handleDeleteProduct}
        onEdit={handleEditProduct}
      />
    </div>
  );
}

export default App;
