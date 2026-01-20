import { useState } from "react";
import AddProducts from "./components/AddProducts";
import ProductList from "./components/ProductList";

function App() {
  const [products, setProducts] = useState([]);
  // const [isEdit , setIsEdit] = useState(false)
  const [editValue , setEditValue]= useState("")
  function handleAddProducts(newProduct) {
    setProducts((prev) => prev.map((prod) => prod.id === newProduct.id ? newProduct : prod));
    // prev => prev.id !== newProduct.id ? newProduct : prev
    // console.log("from : ",newProduct)
  }

  function handleDeleteProduct(id) {
    console.log(id);
    // console.log(products.filter((deleteId) => deleteId.id !== id))
    setProducts(products.filter((product) => product.id !== id));
  }

  function handleEditProduct(id){
    // console.log(products.find((editVal) => editVal.id === id))
    setEditValue(products.find((editVal) => editVal.id === id))
  }
  return (
    <div className="App">
      <AddProducts onAddProduct={handleAddProducts} editValue={editValue}/>
      <ProductList products={products} onDelete={handleDeleteProduct} onEdit={handleEditProduct}/>
    </div>
  );
}

export default App;
