const URL = "https://weatherapi-com.p.rapidapi.com/current.json?q=";

const options = {
  method: "Get",
  headers: {
    "x-rapidapi-key": "b401536d43mshb6685a30561bc96p1a29a0jsn6a5176dfeb20",
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
