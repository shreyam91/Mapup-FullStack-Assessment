// "use client";

// import React, { useEffect, useState } from 'react';

// interface WeatherData {
//   date: string;
//   max_temperature: number;
//   precipitation: number;
//   max_windspeed: number;
//   max_wind_gusts: number;
// }

// export default function Home() {
//   const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchWeatherData = async () => {
//       try {
//         const response = await fetch("http://localhost:8000/api/data/weather", {
//           headers: {
//             Authorization: `Bearer $eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzFkMGY0ZGNiMTUzMWVhY2ZiZTMxMmYiLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE3MzAwMzIzMDYsImV4cCI6MTczMDAzNTkwNn0.NuEo64agVx_Xabt7RBYYwaVbTElrsA6Niw4S9n_uLnI`, // replace with your actual token
//           },
//         });

//         if (!response.ok) {
//           throw new Error("Failed to fetch weather data");
//         }

//         const data = await response.json();
//         setWeatherData(data);
//       } catch (err: any) {
//         setError(err.message);
//       }
//     };

//     fetchWeatherData();
//   }, []);

//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div>
//       <h1>Weather Data</h1>
//       <ul>
//         {weatherData.map((item, index) => (
//           <li key={index}>
//             <p>Date: {item.date}</p>
//             <p>Max Temperature: {item.max_temperature}°C</p>
//             <p>Precipitation: {item.precipitation} mm</p>
//             <p>Max Windspeed: {item.max_windspeed} km/h</p>
//             <p>Max Wind Gusts: {item.max_wind_gusts} km/h</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

"use client";
import { Button } from "@/components/ui/button";


export default function Page() {
  return (
    <main className="bg-gradient-to-r from-blue-300 to-orange-200 h-full min-h-screen">
      <div className="container relative m-0 mx-auto py-10 md:px-10">
        <div className="flex items-center justify-center lg:justify-between">
          <h1 className="text-xl hidden lg:flex font-medium text-gray-950 md:text-2xl">
            PulseDash
          </h1>
        </div>
        <div className="w-full px-4 pt-12 md:px-4 lg:px-8 xl:px-10 2xl:px-0">
          <div className="flex h-full w-full flex-col items-center justify-center">
            <span className="mb-6 cursor-pointer rounded-2xl border border-black px-4 py-1 text-xs text-slate-600 transition duration-300 ease-in-out hover:text-slate-700 sm:text-base text-center">
              Powered by{" "}
              <a className="font-bold" target="_blank" rel="noopener noreferrer" href="https://open-meteo.com/en/docs/historical-weather-api">
                Open Weather{" "}
              </a>
              and{" "}
              <a className="font-bold" target="_blank" rel="noopener noreferrer" href="https://recharts.org/en-US">
                Rechart.js
              </a>
            </span>
            <h1 className="inline-block text-center text-4xl font-medium tracking-tighter text-dark lg:text-7xl">
              A Weather API-Powered{" "}
              <br className="hidden lg:inline-block" />
              Real-time Dashboard
            </h1>
            <h2 className="mt-8 text-center text-xl font-light tracking-tight lg:text-3xl">
              PulseDash seamlessly{" "}
              <span className="font-bold px-1">displays your data</span> and
              <br className="hidden lg:inline-block" />
              <span className="font-bold px-1">helps you analyze</span>
              it in a more interactive way.
            </h2>
            <div className="mt-12 flex flex-col gap-4">
              <Button>Get Started</Button>
            </div>
          </div>
        </div>
      </div>
      <footer className="bottom-0 container mx-auto my-5 flex flex-col items-center justify-between space-y-2 border-t space-x-3 px-3 pt-4 text-center sm:flex-row sm:pt-2 md:text-lg">
        <div>
          Powered by{" "}
          <a href="https://open-meteo.com/en/docs/historical-weather-api" target="_blank" rel="noopener noreferrer" className="pr-1 font-bold transition hover:text-black/50">
            Open Weather
          </a>
          and
          <a href="https://recharts.org/en-US" target="_blank" rel="noopener noreferrer" className="pl-1 font-bold transition hover:text-black/50">
            Rechart.js
          </a>
        </div>
      </footer>
    </main>
  );
}
