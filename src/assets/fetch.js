const URL = "https://weatherapi-com.p.rapidapi.com/current.json?q=";

const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": import.meta.env.VITE_RAPID_API_KEY,
    "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
  },
};

export const fetchFromURL = async function (cityName) {
  try {
    const response = await fetch(`${URL}${cityName}`, options);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error:", error);
  }
};
