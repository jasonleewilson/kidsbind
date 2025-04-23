import React, { useEffect, useState } from "react";

const LocalWeather: React.FC = () => {
  const [temperature, setTemperature] = useState<number | null>(null);
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (lat: number, lon: number) => {
    try {
      console.log("Fetching weather for:", lat, lon);
      const pointsRes = await fetch(
        `https://api.weather.gov/points/${lat},${lon}`
      );
      if (!pointsRes.ok) throw new Error("Failed to fetch point data");
      const pointsData = await pointsRes.json();

      const forecastUrl = pointsData.properties?.forecast;
      const locationCity =
        pointsData.properties?.relativeLocation?.properties?.city;
      const locationState =
        pointsData.properties?.relativeLocation?.properties?.state;

      if (!forecastUrl) throw new Error("No forecast URL returned");

      const forecastRes = await fetch(forecastUrl);
      if (!forecastRes.ok) throw new Error("Failed to fetch forecast data");
      const forecastData = await forecastRes.json();

      const temp = forecastData.properties?.periods?.[0]?.temperature;
      if (typeof temp !== "number")
        throw new Error("No temperature data available");

      setCity(locationCity || "");
      setState(locationState || "");
      setTemperature(temp);
    } catch (err: any) {
      console.error("Error:", err);
      setError(err.message || "Unknown error occurred");
    }
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeather(latitude, longitude);
      },
      (geoErr) => {
        console.error("Geolocation error:", geoErr);
        setError("Location permission denied or unavailable.");
      }
    );
  }, []);

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-blue-100 text-gray-800'>
      <div className='bg-white shadow-lg rounded-xl p-6 w-80 text-center'>
        <h1 className='text-xl font-bold mb-2'>Local Temperature</h1>
        {error ? (
          <p className='text-red-500'>{error}</p>
        ) : temperature !== null ? (
          <p className='text-lg'>
            {city}, {state}:{" "}
            <span className='font-semibold'>{temperature}°F</span>
          </p>
        ) : (
          <p className='text-gray-500'>Loading current weather...</p>
        )}
      </div>
    </div>
  );
};

export default LocalWeather;
