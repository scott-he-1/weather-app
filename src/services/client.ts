const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "8d36c47ebdmsh5be2556145e48b0p1ed9abjsn8680fc0cd9f2",
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
};

export const getSelectCities = async (input: string) => {
  const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?minPopulation=100000&namePrefix=${input.trim()}`;
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const apiKey = "9e2df23bf04bf06a287cc4792bce2be1";
export const getData = async ({ lat, lon }: { lat: string; lon: string }) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
  ).then((res) => res.json());
};
