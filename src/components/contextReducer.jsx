import { createContext, useContext, useReducer } from "react";

const CartStateContext = createContext();
const CartDispatchContext = createContext();

let reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          price: action.price,
          qty: action.qty,
          size: action.size,
        },
      ];
    case "REMOVE":
      let newArr = [...state];
      newArr.splice(action.index, 1);
      return newArr;

    case "UPDATE":
      let arr = [...state];
      arr.find((food, index) => {
        arr[index] = {
          ...food,
          qty: parseInt(action.qty) + food.qty,
          price: action.price + food.price,
        };
        return food;
      });
      return arr;

    case "DROP":
      let dropArr = [];
      return dropArr;

    default:
      console.log("Error in reducer");
  }
};

export const CartProvider = ({ children }) => {
  const [state, disptach] = useReducer(reducer, []);
  return (
    <CartDispatchContext.Provider value={disptach}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
