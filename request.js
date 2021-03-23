const key = '42a456b2341ea5ea195bc8c1cc554386';

const requestCity = async (city) => {
    const baseURL = 'http://api.openweathermap.org/data/2.5/weather'
    const query = `?q=${city}&appid=${key}`;

    //make fetch call (promise call)
    const response = await fetch(baseURL + query);

    //promise data
    const data = await response.json();
    return data;

}

const requestCities = async (city) => {
    const baseURL = 'http://api.openweathermap.org/data/2.5/find'
    const query = `?q=${city}&appid=${key}`;

    //make fetch call (promise call)
    const response = await fetch(baseURL + query);

    //promise data
    const data = await response.json();
    console.log("data", data.list.map((el) => el.name ))
    return data;
}