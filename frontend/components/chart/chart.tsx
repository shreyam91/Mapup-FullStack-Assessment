
import { useEffect, useState } from 'react';
import MyChart from '../MyChart';

interface DataPoint {
    label: string;
    value: number;
}
const WeatherDashboard = () => {
    const [weatherData, setWeatherData] = useState([]);
// const Home: React.FC = () => {
//     const [data, setData] = useState<DataPoint[]>([]);

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const response = await fetch('/api/data/weather'); // Update with your actual endpoint
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setWeatherData(data); // Store the data in state
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        fetchWeatherData();
    }, []);

    return (
        <div>
            {/* <h1>Data Chart</h1>
            {data.length > 0 ? (
                // <MyChart data={data} />
            ) : (
                <p>Loading data...</p>
            )} */}
            <h1>Weather Data</h1>
            <ul>
                {weatherData.map((item) => (
                    <li key={item._id}>{item.date}: Max Temp: {item.max_tempreature}</li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
