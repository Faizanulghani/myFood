import { useState, useEffect } from "react";

const MyOrders = () => {
  const [orderData, setOrderData] = useState([]);

  const fetchMyOrder = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/myOrderData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: localStorage.getItem("userEmail"),
        }),
      });

      const data = await response.json();
      if (data.orderData && data.orderData.order_data) {
        setOrderData(data.orderData.order_data);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div className="container">
      <div className="row">
        {orderData.length > 0 &&
          orderData
            .slice(0)
            .reverse()
            .map((orders, groupIdx) => (
              <div key={groupIdx} className="w-100">
                {orders.map((item, i) =>
                  item.Order_date ? (
                    <div key={i} className="m-auto mt-5">
                      <h5 className="text-white">Order Date: {item.Order_date}</h5>
                      <hr />
                    </div>
                  ) : (
                    <div key={i} className="col-12 col-md-6 col-lg-3">
                      <div
                        className="card mt-3"
                        style={{ width: "16rem", maxHeight: "360px" }}
                      >
                       
                        <div className="card-body">
                          <h5 className="card-title">{item.name}</h5>
                          <div className="container w-100 p-0">
                            <span className="m-1">Qty: {item.qty}</span>
                            <span className="m-1">Size: {item.size}</span>
                            <div className="d-inline ms-2 fs-6">
                              ₹{item.price}/-
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            ))}
      </div>
    </div>
  );
};

export default MyOrders;
