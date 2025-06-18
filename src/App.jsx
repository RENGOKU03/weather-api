import "./App.css";
import { FaSearch } from "react-icons/fa";
import { LuWaves } from "react-icons/lu";
import { FaWind } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchFromURL } from "./assets/fetch";

function App() {
  const [temp, setTemp] = useState(null);
  const [search, setSearch] = useState("Paris");
  const [showModal, setShowModal] = useState(false);
  const searchTab = useRef();

  useEffect(() => {
    fetchFromURL(search).then((result) => {
      if (result) {
        setTemp(result);
      } else {
        setShowModal(true); // ✅ Show modal if city not found or error
      }
    });
  }, [search]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const searchTerm = searchTab.current.value.trim();
    if (!searchTerm) {
      setShowModal(true); // ✅ use modal, not alert
      return;
    }
    setSearch(searchTerm);
  };

  return (
    <>
      {/* Main UI */}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-600 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-2xl text-white"
        >
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center gap-3 mb-6"
          >
            <input
              ref={searchTab}
              type="text"
              placeholder="Search city..."
              className="flex-1 p-3 rounded-full text-gray-900 text-lg focus:outline-none"
            />
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              className="bg-white rounded-full p-3 hover:bg-gray-200"
            >
              <FaSearch className="text-gray-700" />
            </motion.button>
          </form>

          <div className="flex flex-col items-center gap-4 text-center">
            <motion.img
              src={temp?.current?.condition?.icon || "./icon.svg"}
              alt="Weather Icon"
              className="h-24"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 6 }}
            />
            <h1 className="text-5xl font-bold">
              {temp?.current?.temp_c ?? "--"}°C
            </h1>
            <p className="text-2xl">{temp?.location?.name ?? "Unknown"}</p>
          </div>

          <div className="mt-10 flex justify-around text-center text-lg">
            <div className="flex flex-col items-center gap-2">
              <LuWaves size={32} />
              <p>{temp?.current?.humidity ?? "--"}%</p>
              <span className="text-sm text-white/70">Humidity</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <FaWind size={32} />
              <p>{temp?.current?.wind_kph ?? "--"} km/h</p>
              <span className="text-sm text-white/70">Wind Speed</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-blue-400 to-indigo-500 text-white p-6 rounded-2xl shadow-xl text-center w-80"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <h2 className="text-2xl font-bold mb-3">🌤️ Oops!</h2>
              <p className="text-lg mb-6">Please enter a location to search.</p>
              <button
                onClick={() => setShowModal(false)}
                className="bg-white text-indigo-600 font-semibold px-5 py-2 rounded-full hover:bg-gray-100"
              >
                OK
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
