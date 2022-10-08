export const getWeather = async ({ latitude, longitude, timezone }) => {
  try {
    // const {latitude, longitude} = e.target.elements;
    // const latitudeValue = latitude.value
    // const longitudeValue = longitude.value
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?current_weather=true&latitude=${latitude}&longitude=${longitude}&timezone=${timezone}`
    );
    return response.json();
  } catch {
    throw new Error("could not fetch weathers");
  }
};

export default getWeather;
