import { CDN_URL } from "../utils/constants";
import { addItems, removeItems } from "../utils/cartSlice";
import { useDispatch } from "react-redux";

const ItemList = ({ itemCards, flag }) => {
  const dispatch = useDispatch();

  const handleAddItem = (item) => {
    // dispatching the action
    dispatch(addItems(item));
  };

  const handleRemoveItem = (index) => {
    dispatch(removeItems(index));
  };

  return (
    <div>
      {itemCards.map((card, index) => {
        return (
          <div
            key={index}
            className="border-b-[1px] w-6/12 mx-auto text-left m-6 flex justify-between gap-2 pb-3 "
          >
            <div className="flex flex-col gap-[6.5px] w-[36rem]">
              <p className="text-gray-500">
                {card?.card?.info?.isVeg ? "Veg" : "Non-Veg"}
              </p>
              <p className="font-semibold opacity-80">
                {card?.card?.info?.name || card?.card?.card?.info?.name}
              </p>
              <p>
                ₹
                {(card?.card?.info?.price && card?.card?.info?.price / 100) ||
                  (card?.card?.info?.defaultPrice &&
                    card?.card?.info?.defaultPrice / 100)}
                {card?.card?.card?.info?.price / 100}
              </p>
              <p className="mb-2 text-gray-400 text-sm">
                {card?.card?.info?.description ||
                  card?.card?.card?.info?.description}
              </p>
            </div>
            <div>
              {!flag && (
                <button
                  onClick={() => handleAddItem(card)}
                  className="absolute my-20 mx-2 bg-white rounded-sm shadow-lg px-8 py-1 text-green-500 border border-gray-200"
                >
                  Add
                </button>
              )}
              {flag && (
                <div className="relative">
                  <button
                    onClick={() => handleRemoveItem(index)}
                    className="remove-btn"
                  >
                    Remove
                  </button>
                </div>
              )}
              <img
                src={
                  (card?.card?.info?.imageId &&
                    CDN_URL + card?.card?.info?.imageId) ||
                  CDN_URL + card?.card?.card?.info?.imageId
                }
                className="w-28 h-28 object-cover rounded"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ItemList;
