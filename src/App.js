import React, { lazy, Suspense, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import RestaurantsMenu from "./components/RestaurantsMenu";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Shimmer from "./components/Shimmer";
import UserContext from "./utils/UserContext";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Cart from "./components/Cart";
import Search from "./components/Search";
import SearchRes from "./components/SearchRes";

const Grocery = lazy(() => import("./components/Grocery"));

const App = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Make an API call and send username and password
  }, []);

  const showAlert = () => {
    {
      alert(
        `Important Note:\n\n This website uses a CORS workaround for demonstration purposes. Please install the 'Allow CORS: Access-Control-Allow-Origin' extension for Chrome. \n\n You can download it from the Chrome Web Store. Please refer to the project repository's README.md or visit About me page.`
      );
    }
  };

  return (
    <Provider store={appStore}>
      <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
        <div className="app">
          {showAlert()}
          <Header />
          <Outlet />
        </div>
      </UserContext.Provider>
    </Provider>
  );
};

const appRoutes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/searchList/:text",
        element: <SearchRes />,
      },
      {
        path: "/grocery",
        element: (
          <Suspense fallback={<Shimmer />}>
            <Grocery />
          </Suspense>
        ),
      },
      {
        path: "/restaurant/:resId",
        element: <RestaurantsMenu />,
      },
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRoutes} />);
