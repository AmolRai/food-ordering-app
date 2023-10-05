import { useContext } from "react";
import { CDN_URL } from "../utils/constants";
import UserContext from "../utils/UserContext";

const RestaurantCard = ({ resData }) => {
  const resInfo = resData?.info;
  const { name, cuisines, costForTwo, avgRating, cloudinaryImageId } = resInfo;
  const { deliveryTime } = resInfo?.sla;

  const { loggedInUser } = useContext(UserContext);

  return (
    <div className="w-[300px] bg-gray-200 rounded-lg p-4">
      <img
        className="w-50 rounded-lg mb-2"
        alt="restro-logo"
        src={CDN_URL + cloudinaryImageId}
      />
      <h3 className="font-bold text-lg">{name}</h3>
      <h4>{cuisines.join(", ")}</h4>
      <h4>{costForTwo}</h4>
      <h4>{avgRating} stars</h4>
      <h4>{deliveryTime} Mins</h4>
      <h4>{loggedInUser}</h4>
    </div>
  );
};

export default RestaurantCard;

export const withPromotedLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <div>
        <label className="absolute m-2 p-2 bg-black text-white rounded-lg">
          Promoted
        </label>
        <RestaurantCard {...props} />
      </div>
    );
  };
};
