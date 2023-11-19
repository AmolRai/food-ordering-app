import { useContext } from "react";
import { CDN_URL } from "../utils/constants";
import UserContext from "../utils/UserContext";

const RestaurantCard = ({ resData }) => {
  const resInfo = resData?.info;
  const { name, cuisines, costForTwo, avgRating, cloudinaryImageId } = resInfo;
  const { deliveryTime } = resInfo?.sla;

  const { loggedInUser } = useContext(UserContext);

  return (
    <div className="w-[300px]">
      <img
        className="res-img"
        alt="restro-logo"
        src={CDN_URL + cloudinaryImageId}
      />
      <h3 className="font-medium text-xl mt-2">{name}</h3>
      {/* <h4>{costForTwo}</h4> */}
      <div className="flex items-center gap-1 font-medium">
        <img
          className="w-5"
          src="https://cdn-icons-png.flaticon.com/128/3334/3334338.png"
        />
        <h4>{avgRating}</h4>
        <h4>• {deliveryTime} mins</h4>
      </div>
      <h4 className="text-gray-500">{cuisines.join(", ")}</h4>
      {/* <h4>{loggedInUser}</h4> */}
    </div>
  );
};

export default RestaurantCard;

export const withPromotedLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <div>
        <label className="ad absolute m-2 p-2 text-gray-600 bg-gray-100 rounded-lg">
          Ad
        </label>
        <RestaurantCard {...props} />
      </div>
    );
  };
};
