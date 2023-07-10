export const WeatherCard = ({
  description,
  day,
  time,
  temp,
  icon,
}: {
  description: string;
  day: string;
  time: string;
  temp: string;
  icon: string;
}) => {
  return (
    <div className="text-center flex flex-col items-center justify-items-center border-2 w-80 p-5">
      <div className="text-lg">{day}</div>
      <div>{time}</div>
      <div>{temp}°F</div>
      <img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt="icon"
      />
      <div>{description}</div>
    </div>
  );
};
