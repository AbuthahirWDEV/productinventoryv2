import React from "react";

const ProductList = ({ products, onDelete, onEdit }) => {
  // const product = [
  //   {
  //     id: Date.now() + 1,
  //     name: "Laptop",
  //     price: 45000,
  //     category: "Electronics",
  //     inStock: true,
  //   },
  //   {
  //     id: Date.now() + 2,
  //     name: "Smartphone",
  //     price: 25000,
  //     category: "Electronics",
  //     inStock: false,
  //   },
  // ];
  // const combined = [...ProductList, product]

  return (
    <ul style={{ display: "flex" }}>

      {products.length === 0 && <h3>No products available</h3>}
      {products.map((item) => (
        <li
          key={item.id}
          style={{
            border: "1px solid black",
            margin: "8px",
            padding: "6px",
            width: "250px",
            listStyle: "none",
          }}
        >
          <h5>Product name: {item.productName}</h5>
          <span>Price : {item.price}</span>
          <p>category : {item.category}</p>
          <label>InStock</label>
          <input readOnly type="checkbox" checked={item.isStock} />
          <div style={{ display: "flex", justifyContent: "space-evenly " }}>
            <button onClick={() => onEdit(item.id)}>Edit</button>
            <button onClick={() => onDelete(item.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ProductList;
