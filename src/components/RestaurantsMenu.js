import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import { useState } from "react";

const RestaurantsMenu = () => {
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);

  const [showIndex, setShowIndex] = useState(null);

  if (resInfo === null) return <Shimmer />;

  const { name, cuisines, costForTwoMessage } =
    resInfo?.cards[0]?.card?.card?.info;

  const { message } = resInfo?.cards[0]?.card?.card?.info?.feeDetails;
  const { minDeliveryTime } = resInfo?.cards[0]?.card?.card?.info?.sla;

  const categories =
    resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c?.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

  const handleIndex = (index) => {
    if (index === showIndex) {
      setShowIndex(null);
    } else {
      setShowIndex(index);
    }
  };

  return (
    <div className="text-center">
      <div className="w-6/12 text-left m-auto">
        <h1 className="text-2xl font-bold">{name}</h1>
        <p className="mb-2 mt-1 text-gray-400 text-sm">
          {cuisines?.join(", ")}
        </p>
        <p className="mb-2 mt-1 text-gray-400 text-sm">{message}</p>
        <div className="flex gap-2 mt-4">
          <p className="font-extrabold text-[#3E4152]">
            {minDeliveryTime} MINS
          </p>
          <p className="font-bold text-[#3E4152]">{costForTwoMessage}</p>
        </div>
        <div className="dash-border"></div>
      </div>
      {/* Accordian */}
      <div className="mb-8">
        {categories?.map((res, index) => {
          return (
            <div key={res?.card?.card?.title}>
              <RestaurantCategory
                data={res?.card?.card}
                showItems={index === showIndex ? true : false}
                setShowIndex={() => handleIndex(index)}
              />
              <div className="bg-gray-100 w-6/12 mx-auto h-5"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RestaurantsMenu;
