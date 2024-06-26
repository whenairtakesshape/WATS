// css styles import
import "./css/searchbar.scss";

// libraries import 
import { useContext, useRef, useState } from 'react';
import react from 'react';
import { SearchInfoContext } from "../contexts/SearchInfoContext";
import { CitiesCountriesPropsInterface } from "../model/interfaces";
import { City, Country } from "../model/DataHandler";
import { DataContext } from "../contexts/DataContext";

interface SearchBarProps {
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

function SearchBar(props: SearchBarProps) {
  const { searchInfo, setSearchInfo } = useContext(SearchInfoContext);
  const { data, setData } = useContext(DataContext);
  const [ searchText, setSearchText ] = useState("");

  const searchInput = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearchInfo({ ...searchInfo, term: searchText });
      props.setCurrentPage(1);
    }
  }

  const clearSearchInput = () => {
    if (searchInput.current) {
      searchInput.current.value = "";
      setSearchInfo({ ...searchInfo, term: "" });
    }
  };

  /**
   * filterEmpty is an array of Country or City that has been filtered to exclude empty strings 
   * in the props states (countries or cities)
   */
  // const filterEmpty: Array<Country | City> = countries.filter((city: City | Country) => {
  //   return city != "";
  // });
  /**
   * searchFiltered is an array of Country or City that is dynamically filered as searchInfo.term state changes. 
   * searchInfo.term changes according to user input. 
   */
  // const searchFiltered = filterEmpty.filter((city) =>
  //   city?.toLowerCase().includes(searchInfo.term.toLowerCase())
  // );

  return (
    <div className="searchbar-container">

      <div>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <g clipPath="url(#clip0_1201_2623)">
            <path d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z" fill="#1E4359" />
          </g>
          <defs>
            <clipPath id="clip0_1201_2623">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>

      <input ref={searchInput} type="text" placeholder="Search" 
        onChange={(event) => {
          setSearchText(event.target.value);
        }} 
        onKeyDown={handleKeyDown}
      />
      {/* {<button onClick={() => setSearchInfo({ ...searchInfo, byCity: true })}>by city</button>} */}
      {/* {searchFiltered.map((city, key) => {
        return (<text>{city}...</text>);
      })} */}


      <div className="clear-search-input" onClick={clearSearchInput} >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <g clipPath="url(#clip0_1201_2627)">
            <path d="M12 2C6.47 2 2 6.47 2 12C2 17.53 6.47 22 12 22C17.53 22 22 17.53 22 12C22 6.47 17.53 2 12 2ZM17 15.59L15.59 17L12 13.41L8.41 17L7 15.59L10.59 12L7 8.41L8.41 7L12 10.59L15.59 7L17 8.41L13.41 12L17 15.59Z" fill="#1E4359" />
          </g>
          <defs>
            <clipPath id="clip0_1201_2627">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>

      {<button onClick={() => {
        setSearchInfo({ ...searchInfo, term: searchText });
        props.setCurrentPage(1);
      }}>Search</button>}

    </div>

  );
}

export default SearchBar;
