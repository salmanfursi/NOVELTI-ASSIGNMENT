import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css'; // Import the CSS for styling



import { useEffect, useState } from 'react';
import { Country, State } from 'country-state-city';
import Select from 'react-select';


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
  //zip code state
  const [zipCode, setZipCode] = useState('');

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
    const value = e.target.value;

    // Check if the value is a number
    if (!isNaN(value) || value === '') {
      setZipCode(value);
    }
  };


  // form submit handler all will be submit
  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (isValidPhoneNumber(phoneNumber)) {
      // Valid phone number
      console.log('Valid phone number:', phoneNumber);
    } else {
      // Invalid phone number
      alert('Invalid phone number:', phoneNumber);
    }

    const form = e.target;
    const countryName = selectedCountryName;
    const stateName = selectedStateName;
    const phone = phoneNumber;
    const zipcode =zipCode
    // const user ={countryName, stateName, phone,zipcode}
    console.log(countryName, stateName, phone,zipcode);
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
          placeholder="Enter Zip Code"
        />
      </div>






      {/* Submit Button */}
      <button className='btn w-full btn-warning' type="submit">Submit</button>
    </form>
  );
};

export default Adduser;
