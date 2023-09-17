import RestaurantCard from "./RestaurantCard";
import { useState } from "react";
import mockData from "../utils/mockData";

const Body = () => {
  // useState returns the arr of size 2 and we are destructing to get
  // the array item1 and array item2
  const [listOfRestaurants, setListOfRestaurants] = useState(mockData);

  return (
    <div className="body">
      <div className="filter">
        <button
          className="filter-btn"
          onClick={() => {
            const filteredList = listOfRestaurants.filter(
              (obj) => obj?.card?.card.info.avgRating > 4
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
        {listOfRestaurants.map((resObj) => (
          <RestaurantCard key={resObj.card?.card.info.id} resData={resObj} />
        ))}
      </div>
    </div>
  );
};

export default Body;
