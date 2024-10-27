import fetchWeatherData from '@/utils/fetchWeatherData';
import { GetServerSideProps } from 'next';

interface WeatherData {
  date: string;
  max_temperature: number;
  precipitation: number;
  max_windspeed: number;
  max_wind_gusts: number;
}

interface WeatherPageProps {
  weatherData: WeatherData[];
}

const WeatherPage: React.FC<WeatherPageProps> = ({ weatherData }) => {
  return (
    <div>
      <h1>Weather Data</h1>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Max Temperature</th>
            <th>Precipitation</th>
            <th>Max Windspeed</th>
            <th>Max Wind Gusts</th>
          </tr>
        </thead>
        <tbody>
          {weatherData.map((data) => (
            <tr key={data.date}>
              <td>{data.date}</td>
              <td>{data.max_temperature}</td>
              <td>{data.precipitation}</td>
              <td>{data.max_windspeed}</td>
              <td>{data.max_wind_gusts}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const weatherData = await fetchWeatherData();
    return {
      props: {
        weatherData,
      },
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return {
      props: {
        weatherData: [],
      },
    };
  }
};

export default WeatherPage;
