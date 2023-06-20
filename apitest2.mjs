const apiKey = "9e2df23bf04bf06a287cc4792bce2be1";
const getData = async () => {
  await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=${apiKey}`
  )
    .then((res) => res.json())
    .then((data) => console.log(data));
};

getData();
