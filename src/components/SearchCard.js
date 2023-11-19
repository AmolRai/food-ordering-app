import { CDN_URL } from "../utils/constants";
import { Link } from "react-router-dom";

const SearchCard = ({ data }) => {
  const { cloudinaryId, text, type } = data;

  return (
    <Link to={"/searchList/" + text}>
      <div className="search-card">
        <img src={CDN_URL + cloudinaryId} />
        <div className="search-content">
          <h3>{text}</h3>
          <h3 className="type">{type}</h3>
        </div>
      </div>
    </Link>
  );
};

export default SearchCard;
