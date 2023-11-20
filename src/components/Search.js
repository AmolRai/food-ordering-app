import { useEffect, useState, useCallback } from "react";
import { SEARCH_API, PRE_SEARCH_API, CDN_URL } from "../utils/constants";
import SearchCard from "./SearchCard";

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [preSearchResult, setPreSearchResult] = useState([]);

  const fetchPreSearchData = async () => {
    const data = await fetch(PRE_SEARCH_API);
    const json = await data.json();
    setPreSearchResult(
      json.data.cards[1].card.card.gridElements.infoWithStyle.info
    );
  };

  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  const fetchData = async (text) => {
    const data = await fetch(SEARCH_API + text);
    const json = await data.json();
    setSearchResult(json?.data?.suggestions);
  };

  const debouncedFetchData = useCallback(
    debounce((text) => fetchData(text), 1000),
    []
  );

  const handleSearchChange = (e) => {
    const newText = e.target.value;
    setSearchText(newText);
    debouncedFetchData(newText);
  };

  useEffect(() => {}, [debouncedFetchData]);

  useEffect(() => {
    fetchPreSearchData();
  }, []);

  return (
    <div className="search">
      <div className="relative">
        <input
          className="search-field"
          placeholder="Search for restaurants and food"
          type="text"
          value={searchText}
          onChange={handleSearchChange}
        />
        <img
          className="search-icon"
          src="https://cdn-icons-png.flaticon.com/128/10828/10828778.png"
        />
      </div>
      <h1 className="pop-cuisines">Popular Cuisines</h1>
      <div className="carousel-container !w-[56%]">
        <div className="flex">
          {preSearchResult.map((res) => {
            return (
              <img
                className="w-[5rem]"
                key={res.id}
                src={CDN_URL + res.imageId}
              />
            );
          })}
        </div>
      </div>
      <div className="search-list">
        {searchResult?.map((item, index) => {
          return <SearchCard key={index} data={item} />;
        })}
      </div>
    </div>
  );
};

export default Search;
