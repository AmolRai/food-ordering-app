import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";
import { useContext, useEffect, useState, useRef } from "react";
import { CDN_URL, RESTAURANT_API } from "../utils/constants";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import Footer from "./Footer";

const Body = () => {
  // Whenever state variables update, react triggers reconciliation
  // cycle(re-renders the compoenent)
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [carouselCard, setCarouselCard] = useState([]);
  const [mindCollection, setMindCollection] = useState([]);
  const [topBrandsCollection, setTopBrandCollection] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterBtnClick, setFilterBtnClick] = useState(false);
  const [searchBtnClick, setSearchBtnClick] = useState(false);
  const [fastDelClick, setFastDelClick] = useState(false);

  const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);

  const { loggedInUser, setUserName } = useContext(UserContext);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(RESTAURANT_API);
    const json = await data.json();

    setCarouselCard(
      json.data.cards[0].card.card.gridElements.infoWithStyle.info
    );

    setMindCollection(
      json.data.cards[0].card.card.gridElements.infoWithStyle.info
    );

    setTopBrandCollection(json.data.cards[1].card.card);

    setListOfRestaurants(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilteredRestaurant(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };

  const getFilteredRestaurant = () => {
    if (filterBtnClick === true) {
      const filteredList = listOfRestaurants.filter(
        (obj) => obj?.info?.avgRating > 4
      );
      // when setListOfRestaurants() function gets called react checks the diff
      // and updates the component or render the component
      setFilteredRestaurant(filteredList);
    } else {
      setFilteredRestaurant(listOfRestaurants);
    }
  };

  useEffect(() => {
    getFilteredRestaurant();
  }, [filterBtnClick]);

  const handleFastDelivery = () => {
    if (fastDelClick) {
      const sortedRestaurants = [...listOfRestaurants]?.sort((a, b) => {
        const deliveryTimeA = a?.info?.sla?.deliveryTime;
        const deliveryTimeB = b?.info?.sla?.deliveryTime;
        return deliveryTimeA - deliveryTimeB;
      });
      setFilteredRestaurant(sortedRestaurants);
    } else {
      setFilteredRestaurant(listOfRestaurants);
    }
  };

  useEffect(() => {
    handleFastDelivery();
  }, [fastDelClick]);

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
      <h1 className="font-bold text-2xl m-2 ml-[6.5rem]">
        Best Offers for you
      </h1>
      <div className="carousel-container">
        <div className="carousel">
          {carouselCard?.map((card) => {
            return (
              <div key={card?.id}>
                <img src={CDN_URL + card?.imageId} alt={card?.id} />
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <h1 className="font-bold text-2xl m-2 ml-[6.5rem] mt-4">
          What's on your mind?
        </h1>
        <div className="carousel-container">
          <div className="carousel">
            {mindCollection?.map((card) => {
              return (
                <div key={card?.id}>
                  <img className="mind-img" src={CDN_URL + card?.imageId} />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div>
        <h1 className="font-bold text-2xl m-2 ml-[6.5rem] mt-4">
          {topBrandsCollection?.header?.title}
        </h1>
        <div className="carousel-container">
          <div className="carousel">
            {topBrandsCollection?.gridElements?.infoWithStyle?.restaurants?.map(
              (card) => {
                return (
                  <div key={card?.info?.id}>
                    <Link to={"/restaurant/" + card?.info?.id}>
                      <img
                        key={card.info.id}
                        className="chain-img"
                        src={CDN_URL + card?.info?.cloudinaryImageId}
                      />
                    </Link>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-10 m-12">
        <div className="body-search">
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
            className="custom-btn"
            style={{
              backgroundColor: searchBtnClick && "#F0F0F5",
              border: searchBtnClick && "1px solid gray",
            }}
            onClick={() => {
              const filteredRestaurant = listOfRestaurants?.filter((res) =>
                res?.info?.name
                  ?.toLowerCase()
                  ?.includes(searchText?.toLowerCase())
              );
              setSearchBtnClick(!searchBtnClick);
              setFilteredRestaurant(filteredRestaurant);
            }}
          >
            Search
          </button>
          <button
            style={{
              backgroundColor: filterBtnClick && "#F0F0F5",
              border: filterBtnClick && "1px solid gray",
            }}
            className="custom-btn"
            onClick={() => setFilterBtnClick(!filterBtnClick)}
          >
            Ratings 4.0+
            {filterBtnClick && (
              <img
                width={10}
                style={{ marginLeft: "5px" }}
                src="https://cdn-icons-png.flaticon.com/128/1828/1828778.png"
              />
            )}
          </button>
          <button
            style={{
              backgroundColor: fastDelClick && "#F0F0F5",
              border: fastDelClick && "1px solid gray",
            }}
            onClick={() => setFastDelClick(!fastDelClick)}
            className="custom-btn"
          >
            Fast Delivery
            {fastDelClick && (
              <img
                width={10}
                style={{ marginLeft: "5px" }}
                src="https://cdn-icons-png.flaticon.com/128/1828/1828778.png"
              />
            )}
          </button>
        </div>

        {/* <input
            value={loggedInUser}
            className="border border-black p-1 rounded-md"
            onChange={(e) => setUserName(e.target.value)}
          /> */}
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {filteredRestaurant?.map((resObj) => (
          <Link key={resObj?.info?.id} to={"/restaurant/" + resObj?.info?.id}>
            {resObj?.info?.sla?.deliveryTime < 25 ? (
              <RestaurantCardPromoted resData={resObj} />
            ) : (
              <RestaurantCard resData={resObj} />
            )}
          </Link>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Body;
