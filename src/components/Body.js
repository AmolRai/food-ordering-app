import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react";
import { RESTAURANT_API } from "../utils/constants";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";

const Body = () => {
  // Whenever state variables update, react triggers reconciliation
  // cycle(re-renders the compoenent)

  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");

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

  return listOfRestaurants?.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input
            type="text"
            className="search-box"
            value={searchText}
            onChange={(e) => {
              if (e.target.value === "") {
                setFilteredRestaurant(listOfRestaurants);
              }
              setSearchText(e.target.value);
            }}
          />
          <button
            onClick={() => {
              // Implement Search
              const filteredRestaurant = listOfRestaurants.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );
              setFilteredRestaurant(filteredRestaurant);
            }}
          >
            Search
          </button>
        </div>
        <button
          className="filter-btn"
          onClick={() => {
            const filteredList = listOfRestaurants.filter(
              (obj) => obj?.info?.avgRating > 4
            );
            // when setListOfRestaurants() function gets called react checks the diff
            // and updates the component or render the component
            setListOfRestaurants(filteredList);
          }}
        >
          Top Rated Restaurant
        </button>
      </div>
      <div className="restro-container">
        {filteredRestaurant.map((resObj) => (
          <Link key={resObj?.info?.id} to={"/restaurant/" + resObj?.info?.id}>
            <RestaurantCard resData={resObj} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
