import { useState } from 'react';
import { Country, State, City } from 'country-state-city';

const Adduser = () => {
  // Initialize state variables
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  console.log(State.getStatesOfCountry());

  // console.log(selectedCountry);

  // Get a list of all states
  const allStates = State.getAllStates();

  const filteredStates = allStates.filter((state) => state.countryCode === selectedCountry);






  // Get a list of all countries
  const countries = Country.getAllCountries();

  // Get a list of cities for the selected country
  // const countryCities = selectedCountry
  //   ? State.getStatesOfCountry(selectedCountry)

  //   : [];

  // Handle country selection
  const handleCountryChange = (e) => {
    const countryCode = e.target.value;
    setSelectedCountry(countryCode);
    // setSelectedCountry(e.target.value);

    // Clear the selected city when the country changes
    setSelectedCity('');
  };

  // Handle city selection
  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  return (
    <div>
      <label>Select a Country:</label>
      <select value={selectedCountry} onChange={handleCountryChange}>
        <option value="">Select</option>
        {countries.map((country) => (
          <option key={country.id} value={country.isoCode}>
            {country.name}
          </option>
        ))}
      </select>

      {selectedCountry && (
        <div>
          <label>Select a City:</label>
          <select value={selectedCity} onChange={handleCityChange}>
            <option value="">Select</option>
            {/* {countryCities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))} */}


            {filteredStates.map((state) => (
              <option key={state.id} value={state.id}>
                <h1>{state.name}</h1>
              </option>
            ))}



          </select>
        </div>
      )}
    </div>
  );
}

export default Adduser;
