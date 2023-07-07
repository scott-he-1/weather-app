"use client";
import { SearchBar } from "@/components/Searchbar";
import { useState } from "react";

export default function Home() {
  const [searchedCity, setSearchedCity] = useState<any>();
  return (
    <div>
      <SearchBar setSearchedCity={setSearchedCity} />
      {searchedCity ? <div>{searchedCity.city.name}</div> : null}
    </div>
  );
}
