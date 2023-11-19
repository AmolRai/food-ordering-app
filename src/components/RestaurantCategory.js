import ItemList from "./ItemList";

const RestaurantCategory = ({ data, showItems, setShowIndex }) => {
  const handleClick = () => {
    setShowIndex();
  };

  return (
    <div>
      {/* Accordian Header */}
      <div
        className="m-3 pt-8 w-6/12 mx-auto flex justify-between cursor-pointer  "
        onClick={handleClick}
      >
        <span className="text-lg font-bold text-[#3E4152]">
          {data.title} ({data.itemCards.length})
        </span>
        <span className="text-2xl">⤵</span>
      </div>
      {/* Accordian Body */}
      {showItems && <ItemList itemCards={data.itemCards} />}
    </div>
  );
};

export default RestaurantCategory;
