import React, { useEffect, useState } from "react";

const AddProducts = ({onAddProduct , editValue , categoryOptions}) => {
  

  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Electornics");
  const [isStock, setIsStock] = useState(false);


  useEffect(()=>{
    console.log(editValue)
    if(!editValue) return

    console.log(editValue)
    setProductName(editValue.productName)
    setPrice(editValue.price)
    setCategory(editValue.category)
    setIsStock(editValue.isStock)
  },[editValue])


  function setDefault(){
    setProductName("")
    setPrice("")
    setCategory("Electronics")
    setIsStock(false)
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newItem = {
      id:editValue ? editValue.id : Date.now(),
      productName,
      price,
      category,
      isStock
    }
    // console.log(newItem);
    onAddProduct(newItem)
    // setEditValue("")
    setDefault()
  }
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Product name
        <input
          type="text"
          placeholder="Enter ..."
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
      </label>
      <label>
        Price
        <input
          type="number"
          placeholder="Enter ..."
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </label>
      <label>
        Category
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categoryOptions.map((option , index) => (
            <option key={index}>{option}</option>
          ))}
        </select>
      </label>
      <label>
        Stock
        <input
          type="checkbox"
          checked={isStock}
          onChange={(e) => setIsStock(e.target.checked)}
        />
      </label>

      <button>Add Product</button>
    </form>
  );
};

export default AddProducts;
