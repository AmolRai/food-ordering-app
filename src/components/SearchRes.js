import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Shimmer from "../components/Shimmer";
import {
  CDN_URL,
  SEARCH_API_CLICK_API,
  SEARCH_ACTION,
} from "../utils/constants";
import RestaurantCard from "../components/RestaurantCard";
import { addItems, removeItems } from "../utils/cartSlice";
import { useDispatch } from "react-redux";

const SearchRes = () => {
  const { text } = useParams();
  const [distList, setDistList] = useState(null);
  const [restaurantList, setRestaurantList] = useState(null);
  const dispatch = useDispatch();

  const fetchSearchList = async () => {
    const data = await fetch(SEARCH_API_CLICK_API + text + SEARCH_ACTION);
    const json = await data.json();

    if (json.data.cards[1].groupedCard.cardGroupMap.DISH) {
      setDistList(json.data.cards[1].groupedCard.cardGroupMap.DISH.cards);
    } else {
      setRestaurantList(
        json.data.cards[1].groupedCard.cardGroupMap.RESTAURANT.cards[1].card
          .card.restaurants
      );
    }
  };

  const handleAddClick = (e, dish) => {
    e.preventDefault();
    dispatch(addItems(dish));
  };

  useEffect(() => {
    fetchSearchList();
  }, []);

  if (distList === null && restaurantList === null) {
    return <Shimmer />;
  }

  return (
    <div className="flex justify-center items-center mb-10">
      <div className="flex w-[70%] justify-center gap-6 flex-wrap">
        {distList &&
          distList.map((dish) => {
            return (
              dish.card.card.info && (
                <Link
                  key={dish.card.card.info.id}
                  to={"/restaurant/" + dish.card.card.restaurant.info.id}
                >
                  <div className="result-card">
                    <div className="w-[18rem]">
                      <h1 className="text-gray-600">
                        {dish.card.card.restaurant.info.name}
                      </h1>
                      <h1 className="text-gray-500 font-light text-sm mt-1">
                        ⭐️ {dish.card.card.restaurant.info.avgRating}
                        {"   . " +
                          dish.card.card.restaurant.info.sla.deliveryTime}{" "}
                        MINS
                      </h1>
                      <div className="mt-2 text-gray-800">
                        <h1>{dish.card.card.info.name}</h1>
                        <h1>
                          ₹{dish.card.card.restaurant.info.costForTwo / 100}
                        </h1>
                      </div>
                    </div>
                    <div className="relative">
                      <img
                        className="w-28 h-28 object-cover rounded-lg"
                        src={
                          CDN_URL +
                          dish.card.card.restaurant.info.cloudinaryImageId
                        }
                      />
                      <button
                        className="search-add-btn"
                        onClick={(e) => handleAddClick(e, dish)}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </Link>
              )
            );
          })}

        {restaurantList &&
          restaurantList.map((res) => {
            return (
              <Link key={res.info.id} to={"/restaurant/" + res.info.id}>
                <RestaurantCard resData={res} />
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default SearchRes;
