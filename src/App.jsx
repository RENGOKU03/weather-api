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
      if (result) setTemp(result);
    });
  }, [search]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const searchTerm = searchTab.current.value.trim();
    if (!searchTerm) return setShowModal(true);
    setSearch(searchTerm);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-600 p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-3xl p-6 shadow-2xl text-white"
        >
          <form
            className="flex items-center gap-3 mb-6"
            onSubmit={handleSearchSubmit}
          >
            <motion.input
              type="text"
              ref={searchTab}
              placeholder="Search location..."
              whileFocus={{ scale: 1.02 }}
              className="flex-1 p-3 rounded-full text-gray-800 text-lg focus:outline-none"
            />
            <motion.button
              type="submit"
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              className="bg-white rounded-full p-3 hover:bg-gray-100 transition"
            >
              <FaSearch size={20} className="text-gray-700" />
            </motion.button>
          </form>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex flex-col items-center gap-4 text-center"
          >
            <motion.img
              src={temp?.current?.condition?.icon || "./icon.svg"}
              alt="Weather Icon"
              className="h-24"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
            />
            <h1 className="text-5xl font-bold">
              {temp?.current?.temp_c ?? "--"}°C
            </h1>
            <p className="text-3xl font-light">
              {temp?.location?.name ?? "Unknown Location"}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-10 flex justify-around text-center text-lg"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="flex flex-col items-center gap-2"
            >
              <LuWaves size={32} />
              <p>{temp?.current?.humidity ?? "--"}%</p>
              <span className="text-sm text-white/70">Humidity</span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="flex flex-col items-center gap-2"
            >
              <FaWind size={32} />
              <p>{temp?.current?.wind_kph ?? "--"} km/h</p>
              <span className="text-sm text-white/70">Wind Speed</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl p-6 text-center w-80 shadow-lg"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Empty Search!
              </h2>
              <p className="text-gray-600 mb-6">
                Please enter a location before searching.
              </p>
              <button
                onClick={() => setShowModal(false)}
                className="bg-indigo-600 text-white px-5 py-2 rounded-full hover:bg-indigo-700 transition"
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
