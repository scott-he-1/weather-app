"use client";
import { SearchBar } from "@/components/Searchbar";
import { useState } from "react";
import moment from "moment";
import { WeatherCard } from "@/components/WeatherCard";

export default function Home() {
  const [searchedCity, setSearchedCity] = useState<any>();
  const [isLoadingCity, setIsLoadingCity] = useState(false);
  const [isErrorLoadingCity, setIsErrorLoadingCity] = useState(false);

  const dailyDataSet = [0, 7, 15, 31, 39];

  return (
    <div className="flex flex-col gap-3">
      <SearchBar
        setSearchedCity={setSearchedCity}
        setIsLoadingCity={setIsLoadingCity}
        setIsErrorLoadingCity={setIsErrorLoadingCity}
      />
      {searchedCity ? (
        <div>
          <div className="text-4xl">{searchedCity.city.name}</div>
          <div className="flex tablet:flex-col">
            {dailyDataSet.map((index) => {
              const currentIndex = searchedCity.list[index];
              const newDate = new Date();
              newDate.setTime(currentIndex.dt * 1000);
              return (
                <WeatherCard
                  key={index}
                  description={currentIndex.weather[0].description}
                  day={moment(newDate).format("dddd")}
                  time={moment(newDate).format("MMMM Do, h:mm a")}
                  temp={currentIndex.main.temp}
                  icon={currentIndex.weather[0].icon}
                />
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
