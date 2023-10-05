import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";
import { useContext, useEffect, useState } from "react";
import { RESTAURANT_API } from "../utils/constants";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";

const Body = () => {
  // Whenever state variables update, react triggers reconciliation
  // cycle(re-renders the compoenent)
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");

  const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);

  const { loggedInUser, setUserName } = useContext(UserContext);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const localData = localStorage.getItem("restaurants");

    const jsonData = JSON.parse(localData);

    if (jsonData !== null) {
      setListOfRestaurants(jsonData);
      setFilteredRestaurant(jsonData);
    } else {
      const data = await fetch(RESTAURANT_API);
      const json = await data.json();

      localStorage.setItem(
        "restaurants",
        JSON.stringify(
          json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle
            ?.restaurants
        )
      );

      setListOfRestaurants(
        json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants
      );
      setFilteredRestaurant(
        json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants
      );
    }
  };

  const onlineStatus = useOnlineStatus();
  if (!onlineStatus) {
    return (
      <h1>
        Seems like you're offline!!! Please check your internet connection
      </h1>
    );
  }

  return listOfRestaurants?.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="flex items-center gap-10 m-12">
        <div className="search">
          <input
            type="text"
            placeholder="Search Restaurants"
            className="bg-gray-100 border border-black-500 p-1 rounded-lg pl-3"
            value={searchText}
            onChange={(e) => {
              if (e.target.value === "") {
                setFilteredRestaurant(listOfRestaurants);
              }
              setSearchText(e.target.value);
            }}
          />
          <button
            className="ml-3 bg-gray-100 px-4 py-1 rounded-lg"
            onClick={() => {
              const filteredRestaurant = listOfRestaurants.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );
              setFilteredRestaurant(filteredRestaurant);
            }}
          >
            Search
          </button>
        </div>
        <div className="flex items-center justify-center gap-2">
          <button
            className="bg-gray-100 px-4 py-1 rounded-lg"
            onClick={() => {
              const filteredList = listOfRestaurants.filter(
                (obj) => obj?.info?.avgRating > 4
              );
              // when setListOfRestaurants() function gets called react checks the diff
              // and updates the component or render the component
              setFilteredRestaurant(filteredList);
            }}
          >
            Top Rated Restaurant
          </button>
          <input
            value={loggedInUser}
            className="border border-black p-1 rounded-md"
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-12">
        {filteredRestaurant.map((resObj) => (
          <Link key={resObj?.info?.id} to={"/restaurant/" + resObj?.info?.id}>
            {resObj?.info?.sla?.deliveryTime < 25 ? (
              <RestaurantCardPromoted resData={resObj} />
            ) : (
              <RestaurantCard resData={resObj} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
