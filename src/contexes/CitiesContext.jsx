import PropTypes from "prop-types";
import { createContext, useEffect, useState, useContext } from "react";

const CitiesContext = createContext();
function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});
  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);

        const res = await fetch("http://localhost:9000/cities");
        const data = await res.json();
        setCities(data);
      } catch {
        alert("There was an error loading data...");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    setIsLoading(true);
    const res = await fetch(`http://localhost:9000/cities/${id}`);
    const data = await res.json();
    setCurrentCity(data);
    setIsLoading(false);
  }
  async function createCity(newCity) {
    setIsLoading(true);
    const res = await fetch(`http://localhost:9000/cities`, {
      method: "Post",
      body: JSON.stringify(newCity),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setCurrentCity(data);
    setIsLoading(false);
    setCities((cities) => [...cities, data]);
  }
  async function deleteCity(id) {
    setIsLoading(true);
    await fetch(`http://localhost:9000/cities/${id}`, {
      method: "DElETE",
    });

    setIsLoading(false);
    setCities((cities) => cities.filter((city) => city.id !== id));
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function UseCities() {
  const context = useContext(CitiesContext);
  return context;
}

export { CitiesProvider, UseCities };

CitiesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
