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
    clearTimeout(timerId);
    const newTimerId = setTimeout(() => {
      if (value.length > 0) {
        setIsLoadingCities(true);
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
      }
    }, 1000);
    setTimerId(newTimerId);
  };

  return (
    <div className="max-w-screen-lg">
      <input
        type="text"
        onChange={handleSearchInput}
        className="rounded-tr-sm rounded-tl-sm p-2 text-black w-fit"
        spellCheck="false"
        placeholder="City"
      />
      {cities
        ? cities.map((city: any) => {
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
        : null}
    </div>
  );
}
