import { useDispatch } from "react-redux";
import { CDN_URL } from "../utils/constants";
import { addItems } from "../utils/cartSlice";

const ItemList = ({ itemCards }) => {
  const dispatch = useDispatch();

  const handleAddItems = () => {
    dispatch(addItems("pizza"));
  };

  return (
    <div>
      {itemCards.map((card) => {
        return (
          <div
            key={card.card.info.id}
            className="border-b-[1px] w-6/12 mx-auto text-left m-6 flex justify-between gap-2 pb-3 "
          >
            <div className="flex flex-col gap-[6.5px]">
              <p className="text-gray-500">
                {card.card.info.isVeg ? "Veg" : "Non-Veg"}
              </p>
              <p className="font-semibold opacity-80">{card.card.info.name}</p>
              <p>
                ₹
                {card.card.info.price / 100 ||
                  card.card.info.defaultPrice / 100}
              </p>
              <p className="mb-2 text-gray-400 text-sm">
                {card.card.info.description}
              </p>
            </div>
            <div>
              <button
                className="absolute my-20 mx-2 bg-white rounded-sm shadow-lg px-8 py-1 text-green-500 border border-gray-200"
                onClick={handleAddItems}
              >
                Add
              </button>
              <img
                src={card.card.info.imageId && CDN_URL + card.card.info.imageId}
                className="w-28"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ItemList;
