import React from "react";
import ItemList from "./ItemList";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../utils/cartSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  // Always subscribe to the selected portion of the store, don't ever
  // subscribe to the whole store, it will be a performance issues
  // like this: useHistory((store) => store)
  const navigate = useNavigate();
  const cartItems = useSelector((store) => store.cart.items);

  const dispatch = useDispatch();

  const handleClearCart = () => {
    // clear cart
    dispatch(clearCart());
  };

  const handleSeeRes = () => {
    navigate("/");
  };

  return (
    <div
      className="cart"
      style={{ marginTop: cartItems?.length === 0 ? "10rem" : "3rem" }}
    >
      {cartItems.length > 0 && (
        <button
          className="p-2 rounded m-2 bg-black text-white mt-3"
          onClick={handleClearCart}
        >
          Clear Cart
        </button>
      )}
      {cartItems?.length === 0 && (
        <div className="empty-cart">
          <iframe src="https://lottie.host/?file=b56df633-ffe9-4ab8-b74f-4d6656395269/zR5EXD8pxy.json"></iframe>
          <h1 className="text-2xl font-medium text-[#535665] mt-8">
            Your cart is empty
          </h1>
          <h1 className="font-light text-sm text-[#535665] mt-2">
            You can go to home page to view more restaurants
          </h1>
          <button className="see-res-btn font-normal" onClick={handleSeeRes}>
            SEE RESTAURANTS NEAR YOU
          </button>
        </div>
      )}
      <ItemList itemCards={cartItems} flag={true} />
    </div>
  );
};

export default Cart;
