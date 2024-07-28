import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Filter = ({ onSearch, onRegionChange }) => (
  <div className="flex flex-col md:flex-row items-center justify-between p-4 bg-white shadow-md rounded-md">
    <div className="relative w-full md:w-1/2 mb-4 md:mb-0">
      <input
        type="text"
        placeholder="Search for a country..."
        className="w-full p-2 pl-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
    <div className="w-full md:w-1/4">
      <select
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => onRegionChange(e.target.value)}
      >
        <option value="">Filter by Region</option>
        <option value="Africa">Africa</option>
        <option value="America">America</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
    </div>
  </div>
);

Filter.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onRegionChange: PropTypes.func.isRequired,
};

const Countriess = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [region, setRegion] = useState('');

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
        setFilteredCountries(data);
      })
      .catch((error) => {
        console.error('Error fetching the countries data:', error);
      });
  }, []);

  useEffect(() => {
    let filtered = countries;

    if (searchTerm) {
      filtered = filtered.filter((country) =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (region) {
      filtered = filtered.filter((country) => country.region === region);
    }

    setFilteredCountries(filtered);
  }, [searchTerm, region, countries]);

  return (
    <div className="p-4">
      <Filter
        onSearch={setSearchTerm}
        onRegionChange={setRegion}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {filteredCountries.map((country) => (
          <div key={country.cca3} className="bg-white p-4 shadow-md rounded-md">
            <img
              src={country.flags.svg}
              alt={`${country.name.common} flag`}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h2 className="text-xl font-bold mb-2">{country.name.common}</h2>
            <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
            <p><strong>Region:</strong> {country.region}</p>
            <p><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Countriess;
