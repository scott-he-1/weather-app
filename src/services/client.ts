const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "8d36c47ebdmsh5be2556145e48b0p1ed9abjsn8680fc0cd9f2",
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
};

export const getCities = async (input: string) => {
  const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?minPopulation=100000&namePrefix=${input}`;
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
