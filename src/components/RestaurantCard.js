import { CDN_URL } from "../utils/constants";

const RestaurantCard = ({ resData }) => {
  const resInfo = resData?.card?.card.info;
  const { name, cuisines, costForTwo, avgRating, cloudinaryImageId } = resInfo;
  const { deliveryTime } = resInfo?.sla;

  return (
    <div className="restro-card">
      <img
        className="restro-logo"
        alt="restro-logo"
        src={CDN_URL + cloudinaryImageId}
      />
      <h3>{name}</h3>
      <h4>{cuisines.join(", ")}</h4>
      <h4>{costForTwo}</h4>
      <h4>{avgRating} stars</h4>
      <h4>{deliveryTime} Mins</h4>
    </div>
  );
};

export default RestaurantCard;
