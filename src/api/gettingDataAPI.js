const API_KEY = "ed553df5f3304a0ca3d202131211708"

export default async function requestCityInformation(inputValue)  {
  const requestInfo = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${inputValue}&days=4&aqi=no&alerts=no&lang=ru`);
  return await requestInfo.json()
}