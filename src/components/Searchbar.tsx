"use client";
import { SyntheticEvent, useState } from "react";

export function SearchBar() {
  const [searchInput, setSearchInput] = useState<string>();
  const [cities, setCities] = useState<any>([]);
  const [timerId, setTimerId] = useState<
    string | number | NodeJS.Timeout | undefined
  >(undefined);

  const handleSearch = (e: SyntheticEvent) => {
    const value = (e.target as HTMLInputElement).value;
    setSearchInput(value);

    const debounceTime = 600;

    clearTimeout(timerId);
    const newTimerId = setTimeout(() => {
      console.log("loaded!");
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
    </div>
  );
}
