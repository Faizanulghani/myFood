import { useState } from "react";
import { useCart, useDispatchCart } from "./contextReducer";

const Card = ({ filteredItems, options }) => {
  let disptach = useDispatchCart();
  let data = useCart();
  let priceOptions = Object.keys(options);
  let [qty, setQty] = useState(1);
  let [size, setSize] = useState(Object.keys(options)[0]);
  let price = qty * parseInt(options[size]);
  let handleAddtoCart = async () => {
    let food = [];
    for (const item of data) {
      if (item.id == filteredItems._id) {
        food = item;
        break;
      }
    }
    if (food !== []) {
      if (food.size == size) {
        await disptach({
          type: "UPDATE",
          id: filteredItems._id,
          price: price,
          qty: qty,
        });
        return;
      } else if (food.size != size) {
        await disptach({
          type: "ADD",
          id: filteredItems._id,
          name: filteredItems.name,
          price: price,
          qty: qty,
          size: size,
        });
        return
      }
    }
  };

  return (
    <div
      className="card mt-4 shadow rounded-4 overflow-hidden border-0"
      style={{ width: "18rem", maxHeight: "580px" }}
    >
      {/* 🖼️ Image */}
      <img
        src={filteredItems.img}
        className="card-img-top"
        alt="Item"
        style={{ objectFit: "cover", height: "180px" }}
      />

      {/* 📄 Content */}
      <div className="card-body d-flex flex-column justify-content-between p-3">
        <div>
          <h5 className="card-title fw-semibold">{filteredItems.name}</h5>
          <p className="card-text text-secondary small">
            {filteredItems.description}
          </p>
        </div>

        {/* 🔽 Controls */}
        <div className="mt-3">
          <div className="d-flex justify-content-between mb-3 gap-2">
            <select
              className="form-select form-select-sm text-white bg-success border-0 shadow-sm w-48"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
            >
              {Array.from({ length: 6 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  Qty: {i + 1}
                </option>
              ))}
            </select>

            <select
              className="form-select form-select-sm text-white bg-success border-0 shadow-sm w-48"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            >
              {priceOptions.map((data) => {
                return <option key={data}>{data}</option>;
              })}
            </select>
          </div>

          {/* 💰 Price */}
          <div className="d-flex justify-content-between">
            <button
              className="btn btn-success justify-center"
              onClick={handleAddtoCart}
            >
              Add to Cart
            </button>
            <span className="text-primary fs-5 fw-bold">₹ {price}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
