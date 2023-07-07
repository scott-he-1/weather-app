"use client";
import { getData, getSelectCities } from "@/services/client";
import { Dispatch, SetStateAction, SyntheticEvent, useState } from "react";

export function SearchBar({
  setSearchedCity,
}: {
  setSearchedCity: Dispatch<SetStateAction<undefined>>;
}) {
  const [searchInputValue, setSearchInputValue] = useState("");
  const [citySuggestions, setCitySuggestions] = useState([]);
  const [isLoadingCities, setIsLoadingCities] = useState(false);
  const [isErrorCities, setIsErrorCities] = useState(false);
  const [timerId, setTimerId] = useState<
    string | number | NodeJS.Timeout | undefined
  >(undefined);

  const handleSearchInput = (e: SyntheticEvent) => {
    const value = (e.target as HTMLInputElement).value;
    setSearchInputValue(value);
    setIsLoadingCities(true);
    clearTimeout(timerId);
    const newTimerId = setTimeout(() => {
      if (value.length > 0) {
        getSelectCities(value)
          .then((city) => {
            setCitySuggestions(city.data);
            console.log(city.data);
          })
          .catch((error) => {
            console.error(error);
            setIsErrorCities(true);
          })
          .finally(() => {
            setIsLoadingCities(false);
            setSearchInputValue("");
          });
      } else {
        setCitySuggestions([]);
        setIsLoadingCities(false);
      }
    }, 800);
    setTimerId(newTimerId);
  };

  const handleCitySelect = (e: SyntheticEvent) => {
    const lat = (e.target as HTMLDivElement).getAttribute("data-lat");
    const lon = (e.target as HTMLDivElement).getAttribute("data-lon");
    if (lat && lon) {
      getData({ lat, lon }).then(setSearchedCity).then();
    }
  };

  const searchResults = () => {
    if (isLoadingCities) {
      return <div>Loading...</div>;
    }

    if (isErrorCities) {
      return <div>Something went wrong</div>;
    }

    return citySuggestions ? (
      citySuggestions.map((city: any) => {
        return (
          <div
            key={city.id}
            id={city.id}
            className="p-2 bg-white text-black hover:bg-sky-700 cursor-pointer"
            data-lat={city.latitude}
            data-lon={city.longitude}
            onClick={handleCitySelect}
          >
            {city.name}, {city.regionCode}, {city.country}
          </div>
        );
      })
    ) : (
      <div>No Results</div>
    );
  };

  return (
    <div className="max-w-screen-lg">
      <input
        type="text"
        onChange={handleSearchInput}
        className="rounded-tr-sm rounded-tl-sm p-2 text-black w-auto focus:outline-0"
        spellCheck="false"
        placeholder="City"
        value={searchInputValue}
      />
      {searchResults()}
    </div>
  );
}
