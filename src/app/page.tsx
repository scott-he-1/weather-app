"use client";
import { SearchBar } from "@/components/Searchbar";
import { useState } from "react";
import moment from "moment";
import { WeatherCard } from "@/components/WeatherCard";

export default function Home() {
  const [searchedCity, setSearchedCity] = useState<any>();
  const [isLoadingCity, setIsLoadingCity] = useState(false);
  const [isErrorLoadingCity, setIsErrorLoadingCity] = useState(false);

  const dailyData = [0, 7, 15, 31, 39];

  return (
    <div>
      <SearchBar
        setSearchedCity={setSearchedCity}
        setIsLoadingCity={setIsLoadingCity}
        setIsErrorLoadingCity={setIsErrorLoadingCity}
      />
      {searchedCity ? (
        <div>
          <div>{searchedCity.city.name}</div>
          {dailyData.map((index) => {
            return (
              <WeatherCard
                key={index}
                description={searchedCity.list[index].weather[0].description}
                day={moment(searchedCity.list[index].dt_txt).format("dddd")}
                time={moment(searchedCity.list[index].dt_txt).format(
                  "MMMM Do YYYY, h:mm:ss a"
                )}
                temp={searchedCity.list[index].main.temp}
                icon={searchedCity.list[index].weather[0].icon}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
