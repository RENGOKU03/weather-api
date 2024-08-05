import "./App.css";
import { FaSearch } from "react-icons/fa";
import { LuWaves } from "react-icons/lu";
import { FaWind } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { fetchFromURL } from "./assets/fetch";

function App() {
  const [temp, setTemp] = useState(null);
  const [search, setSearch] = useState("Paris");
  const searchTab = useRef();
  useEffect(() => {
    fetchFromURL(search).then((result) => {
      if (result) {
        setTemp(result);
        return;
      }
    });
  }, [search]);
  console.log(temp);
  const handelSearchSubmit = (e) => {
    e.preventDefault();
    const searchTerm = searchTab.current.value;
    if (searchTerm.length == 0) return alert("Please select a search term");
    setSearch(searchTerm);
  };
  return (
    <>
      <div className="h-screen bg-purple-500 w-full flex justify-center">
        <div className="bg-violet-700 h-[700px] w-[500px] rounded-3xl m-auto text-white/90">
          <div className="flex justify-center gap-7 mt-10">
            <input
              type="text"
              ref={searchTab}
              className="rounded-3xl p-3 text-xl text-gray-700 w-72 focus:outline focus:outline-violet-900"
              placeholder="Search"
            />
            <button
              className="bg-white p-4 rounded-full hover:bg-gray-200"
              onClick={(e) => handelSearchSubmit(e)}
            >
              <FaSearch size="20px" color="gray" className="icon-hover" />
            </button>
          </div>
          <div className="h-[60%] text-white/ flex flex-col items-center pt-16 gap-6">
            <img
              src={temp?.current?.condition?.icon || "./icon.svg"}
              alt="weather-condition-icon"
              className="h-36"
            />
            <p className="text-8xl">{temp?.current?.temp_c || "40%"} °C</p>
            <p className="text-7xl">{temp?.location?.name || undefined}</p>
          </div>
          <div className="flex h-40 text-2xl justify-center gap-20">
            <div className="flex items-center gap-6 ">
              <LuWaves size="40px" />
              <div className="flex flex-col">
                <span>{temp?.current?.humidity || "Nan"}%</span>
                <span>Humidity</span>
              </div>
            </div>
            <div className="flex gap-6 items-center">
              <FaWind size="40px" />
              <div className="flex flex-col">
                <span>{temp?.current?.wind_kph} Km/h</span>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
