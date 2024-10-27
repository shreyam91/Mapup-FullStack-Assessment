const fetchWeatherData = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/weather`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token if needed
      },
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
  
    const data = await response.json();
    return data;
  };
  
  export default fetchWeatherData;
  