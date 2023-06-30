"use client";
import { getCities } from "@/services/client";
import { SyntheticEvent, useState } from "react";

export function SearchBar() {
  const [cities, setCities] = useState([]);
  const [isLoadingCities, setIsLoadingCities] = useState(false);
  const [isErrorCities, setIsErrorCities] = useState(false);
  const [timerId, setTimerId] = useState<
    string | number | NodeJS.Timeout | undefined
  >(undefined);

  const handleSearchInput = (e: SyntheticEvent) => {
    const value = (e.target as HTMLInputElement).value;
    setIsLoadingCities(true);
    clearTimeout(timerId);
    const newTimerId = setTimeout(() => {
      if (value.length > 0) {
        getCities(value)
          .then((city) => {
            setCities(city.data);
            console.log(city.data);
          })
          .catch((error) => {
            console.error(error);
            setIsErrorCities(true);
          })
          .finally(() => setIsLoadingCities(false));
      } else {
        setCities([]);
        setIsLoadingCities(false);
      }
    }, 800);
    setTimerId(newTimerId);
  };

  const handleSearchResults = () => {
    if (isLoadingCities) {
      return <div>Loading...</div>;
    }

    if (isErrorCities) {
      return <div>Something went wrong</div>;
    }

    return cities ? (
      cities.map((city: any) => {
        return (
          <div
            key={city.id}
            id={city.id}
            className="p-2 bg-white text-black hover:bg-sky-700"
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
        className="rounded-tr-sm rounded-tl-sm p-2 text-black w-auto"
        spellCheck="false"
        placeholder="City"
      />
      {handleSearchResults()}
    </div>
  );
}
