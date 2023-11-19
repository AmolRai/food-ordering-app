import { useContext, useState } from "react";
import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

const Header = () => {
  const [btnName, setBtnName] = useState("Login");

  const onlineStatus = useOnlineStatus();
  const { loggedInUser } = useContext(UserContext);

  // Subscribing to the store using a Selector
  // This store inside useSelector give us access to whole
  // store but we only need our cart store items
  const cartItems = useSelector((store) => store.cart.items);

  return (
    <div className="flex justify-between items-center p-4 shadow-lg mb-8">
      <div className="logo-container">
        <img className="w-12 ml-20" src={LOGO_URL} />
        <h1 className="text-medium text-lg">Order Food</h1>
      </div>
      <div className="nav-items">
        <ul className="flex">
          {/* <li>Online Status: {onlineStatus ? "🟢" : "🔴"}</li> */}
          <li>
            <Link to="/" className="header-nav">
              <img src="https://cdn-icons-png.flaticon.com/128/2549/2549900.png" />
              Home
            </Link>
          </li>
          <li>
            <Link to="/search" className="header-nav">
              <img src="https://cdn-icons-png.flaticon.com/128/54/54481.png" />
              Search
            </Link>
          </li>
          <li>
            <Link to="/about" className="header-nav">
              <img src="https://cdn-icons-png.flaticon.com/128/665/665049.png" />
              About Me
            </Link>
          </li>
          {/* <li>
            <Link to="/contact">Contact Us</Link>
          </li> */}
          <li>
            <Link to="/cart" className="header-nav">
              <img src="https://cdn-icons-png.flaticon.com/128/1170/1170678.png" />
              {cartItems.length} Cart
            </Link>
          </li>
          {/* <li>
            <Link to="/grocery">Grocery</Link>
          </li> */}
          {/* <li className="font-bold">{loggedInUser}</li> */}
          {/* <button
            className="login"
            onClick={() => {
              btnName === "Login" ? setBtnName("Logout") : setBtnName("Login");
            }}
          >
            {btnName}
          </button> */}
        </ul>
      </div>
    </div>
  );
};

export default Header;
