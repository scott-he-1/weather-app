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
    <div className="text-center flex flex-col items-center justify-items-center border-2 w-80 p-5 gap-3">
      <div className="text-lg font-bold">{day}</div>
      <div className="text-gray-500">{time}</div>
      <div className="text-4xl font-bold">{parseInt(temp).toFixed(0)}°F</div>
      <img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt="icon"
        className="w-20 h-20 mt-2"
      />
      <div className="text-gray-500">{description}</div>
    </div>
  );
};
