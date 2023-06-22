"use client";
import { getCities } from "@/services/client";
import { SyntheticEvent, useState } from "react";

export function SearchBar() {
  const [searchInput, setSearchInput] = useState<string>("");
  const [cities, setCities] = useState<any>([]);
  const [timerId, setTimerId] = useState<
    string | number | NodeJS.Timeout | undefined
  >(undefined);

  const handleSearch = (e: SyntheticEvent) => {
    const value = (e.target as HTMLInputElement).value;
    setSearchInput(value);

    const debounceTime = 300;

    clearTimeout(timerId);
    const newTimerId = setTimeout(() => {
      getCities(searchInput).then((city) => {
        setCities(city.data);
        console.log(city.data);
      });
    }, debounceTime);
    setTimerId(newTimerId);
  };

  return (
    <div>
      <input
        type="text"
        className="rounded p-2 text-black"
        value={searchInput}
        onChange={handleSearch}
      />
      {cities.length > 0
        ? cities.map((city: any) => {
            return <div key={city.id}>{city.name}</div>;
          })
        : null}
    </div>
  );
}
