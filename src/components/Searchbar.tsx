"use client";
import { getData, getSelectCities } from "@/services/client";
import { Dispatch, SetStateAction, SyntheticEvent, useState } from "react";

export function SearchBar({
  setSearchedCity,
  setIsLoadingCity,
  setIsErrorLoadingCity,
}: {
  setSearchedCity: Dispatch<SetStateAction<undefined>>;
  setIsLoadingCity: Dispatch<SetStateAction<boolean>>;
  setIsErrorLoadingCity: Dispatch<SetStateAction<boolean>>;
}) {
  const [searchInputValue, setSearchInputValue] = useState("");
  const [citySuggestions, setCitySuggestions] = useState([]);
  const [isLoadingCities, setIsLoadingCitySuggestions] = useState(false);
  const [isErrorCities, setIsErrorLoadingCitySuggestions] = useState(false);
  const [timerId, setTimerId] = useState<
    string | number | NodeJS.Timeout | undefined
  >(undefined);

  const handleSearchInput = (e: SyntheticEvent) => {
    const value = (e.target as HTMLInputElement).value;
    setSearchInputValue(value);
    setIsLoadingCitySuggestions(true);
    clearTimeout(timerId);
    const newTimerId = setTimeout(() => {
      if (value.length > 0) {
        getSelectCities(value)
          .then((city) => {
            setCitySuggestions(city.data);
          })
          .catch((error) => {
            console.error(error);
            setIsErrorLoadingCitySuggestions(true);
          })
          .finally(() => {
            setIsLoadingCitySuggestions(false);
          });
      } else {
        setCitySuggestions([]);
        setIsLoadingCitySuggestions(false);
      }
    }, 800);
    setTimerId(newTimerId);
  };

  const handleCitySelect = (e: SyntheticEvent) => {
    const lat = (e.target as HTMLDivElement).getAttribute("data-lat");
    const lon = (e.target as HTMLDivElement).getAttribute("data-lon");
    if (lat && lon) {
      setIsLoadingCity(true);
      getData({ lat, lon })
        .then((data) => {
          console.log(data);
          setSearchedCity(data);
          setSearchInputValue("");
          setCitySuggestions([]);
        })
        .catch((error) => {
          console.error(error);
          setIsErrorLoadingCity(true);
        })
        .finally(() => setIsLoadingCity(false));
    }
  };

  const searchResults = () => {
    if (isLoadingCities) {
      return <div className="bg-white text-black p-2">Loading...</div>;
    }

    if (isErrorCities) {
      return <div className="bg-white text-black">Error Loading, please try again</div>;
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
      <div className="absolute">{searchResults()}</div>
    </div>
  );
}
