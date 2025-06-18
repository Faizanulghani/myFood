import { Container, Table, Button } from "react-bootstrap";
import { useCart, useDispatchCart } from "../contextReducer";
import { Trash } from "react-bootstrap-icons"; 

const Carts = () => {
  const data = useCart();
  const dispatch = useDispatchCart();

  if (data.length === 0) {
    return (
      <div style={{ backgroundColor: "#222222", minHeight: "100vh" }}>
        <div className="m-5 w-100 text-center fs-3 text-light">
          The Cart is Empty!
        </div>
      </div>
    );
  }

  let totalPrice = data.reduce((total, food) => total + food.qty * food.price, 0);


  let handleCheckOut = async ()=>{
    let userEmail = localStorage.getItem("userEmail")
    let response = await fetch('http://localhost:3000/api/orderData', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body:JSON.stringify({
        order_data:data,
        email:userEmail,
        order_date:new Date().toDateString()
      })
    });
    if(response.status === 200){
      dispatch({type:"DROP"})
    }

  }

  return (
    <div style={{ backgroundColor: "#222222", minHeight: "100vh", padding: "2rem 0" }}>
      <Container>
        <h2 className="mb-4 text-light">Your Cart</h2>
        <Table striped bordered hover responsive variant="dark" className="text-light">
          <thead>
            <tr style={{ backgroundColor: "rgb(21, 115, 71)", color: "#fff" }}>
              <th>Sr No</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.qty}</td>
                <td>₹{item.qty * item.price}</td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => dispatch({ type: "REMOVE", index })}
                  >
                    <Trash />
                  </Button>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan="4" className="text-end fw-bold">
                Total
              </td>
              <td className="fw-bold text-success">₹{totalPrice}</td>
            </tr>
          </tbody>
        </Table>

        <div className="text-end mt-4">
          <Button
            variant="success"
            onClick={handleCheckOut}
            style={{
              backgroundColor: "rgb(21, 115, 71)",
              borderColor: "rgb(21, 115, 71)",
              padding: "0.6rem 1.5rem",
              fontWeight: "bold",
            }}
          >
            Proceed to Checkout
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default Carts;
