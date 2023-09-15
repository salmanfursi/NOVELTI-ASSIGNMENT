import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css'; // Import the CSS for styling

import { useEffect, useState } from 'react';
import { Country, State } from 'country-state-city';
import Select from 'react-select';

// import zipcode from 'zipcode';
import axios from 'axios'; // You may need to install axios


const Adduser = () => {

  // Country selection state
  const [selectedCountry, setSelectedCountry] = useState(null);
  const countries = Country.getAllCountries();
  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
  };
  // State selection state
  const [selectedCity, setSelectedCity] = useState(null);
  const allStates = State.getAllStates();

  const filteredStates = allStates.filter((state) => state.countryCode === selectedCountry?.value);
  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption);
  };
  //phone number state
  const [phoneNumber, setPhoneNumber] = useState('');
  //zipCode state
  const [zipCode, setZipCode] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [location, setLocation] = useState(null);

  // Separate state variables for selected country and state names
  const [selectedCountryName, setSelectedCountryName] = useState('');
  const [selectedStateName, setSelectedStateName] = useState('');

  // phone number handler
  const handlePhoneNumberChange = (value) => {
    // setPhoneNumber(value);
    const phoneNumberString = String(value);
    setPhoneNumber(phoneNumberString);
  };




  //zip code handler
  const handleZipCodeChange = (e) => {
    const newZipCode = e.target.value;

    // Check if the newZipCode is a number or empty before setting it
    if (!isNaN(newZipCode) || newZipCode === '') {
      setZipCode(newZipCode);
      setLocation(null);

      // Make an API request to validate the ZIP code using Zippopotam
      axios
        .get(`https://api.zippopotam.us/us/${newZipCode}`)
        .then((response) => {
          const isValid = response.status === 200;
          setIsValid(isValid);
          if (isValid) {
            // Fetch additional location data if needed
            setLocation(response.data.places[0]); // Assuming you want to display the first matching place
          }
        })
        .catch((error) => {
          // Handle API request errors here
          console.error(error);
        });
    }
  };



  // Check if the value is a number
  //};


  // form submit handler all will be submit
  const handleSubmitForm = (e) => {
    e.preventDefault();
    //phone number logics
    if (isValidPhoneNumber(phoneNumber)) {
      // Valid phone number
      console.log('Valid phone number:', phoneNumber);
    } else {
      // Invalid phone number
      alert('Invalid phone number:', phoneNumber);
    }
    //zip code logic



    //submission logic
    const form = e.target;
    const countryName = selectedCountryName;
    const stateName = selectedStateName;
    const phone = phoneNumber;
    const zip = zipCode
    const user = { countryName, stateName, phone, zip }
    console.log(user);
  };

  // Update selected country and state names when options change
  useEffect(() => {
    if (selectedCountry) {
      setSelectedCountryName(selectedCountry.label);
    } else {
      setSelectedCountryName('');
    }
    if (selectedCity) {
      setSelectedStateName(selectedCity.label);
    } else {
      setSelectedStateName('');
    }
  }, [selectedCountry, selectedCity]);

  return (
    <form onSubmit={handleSubmitForm}>
      {/* Country Selection div */}
      <div className="form-control">
        <label htmlFor="country">Country:</label>
        <Select
          id="country"
          name="country"
          value={selectedCountry}
          onChange={handleCountryChange}
          options={countries.map((country) => ({
            label: country.name,
            value: country.isoCode,
          }))}
          placeholder="Select a Country"
          isSearchable={true}
        />
      </div>

      {/* State Selection div */}
      <div className="form-control">
        <label htmlFor="state">State:</label>
        {selectedCountry && (
          <Select
            id="state"
            name="state"
            value={selectedCity}
            onChange={handleCityChange}
            options={filteredStates.map((state) => ({
              label: state.name,
              value: state.id,
            }))}
            placeholder="Select a City"
            isSearchable={true}
          />
        )}
      </div>
      {/* phone number div */}
      <div className="form-control">
        <label htmlFor="phone">Phone Number:</label>
        <PhoneInput
          id="phone"
          name="phone"
          placeholder="Enter phone number"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          defaultCountry="US" // Set the default country code (e.g., 'US' for United States)
        />
      </div>
      {/* zip code div */}
      <div className="form-control">
        <label htmlFor="zipCode">Zip Code:</label>
        <input
          type="text"
          id="zipCode"
          name="zipCode"
          value={zipCode}
          onChange={handleZipCodeChange}
          placeholder="Enter US zip code only"
          // Add a key based on the ZIP code
        />
      </div>
      {/* zip validation */}
      {location?.state ? (
        <div>
          {location?.state && <p className='text-green-700 font-bold'>Valid ZIP code Location: {location.city}, {location.state}</p>}
        </div>
      ) : (
        <p className='text-red-500 font-bold'>Invalid ZIP code. Please use a valid US ZIP code (5 digits).</p>
      )}



      {/* Submit Button */}
      <button className='btn w-full btn-warning' type="submit">Submit</button>
    </form>
  );
};

export default Adduser;
