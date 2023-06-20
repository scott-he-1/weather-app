const url = "https://wft-geo-db.p.rapidapi.com/v1/geo/cities?minPopulation=100000&namePrefix=chicago";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "8d36c47ebdmsh5be2556145e48b0p1ed9abjsn8680fc0cd9f2",
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
};

export const getData = async () => {
  try {
    const response = await fetch(url, options);
    const result = await response.text();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};

getData();
