import { useState, useEffect } from 'react';

const Address = (props) => {
  const [userAddress, setUserAddress] = useState('');
  const [isValidAddress, setIsValidAddress] = useState(true);
  const [suggestedAddresses, setSuggestedAddresses] = useState([]);
console.log(userAddress);
  useEffect(() => {
    if (userAddress.trim() !== '') {
      // Perform address validation when the user input changes
      validateAddress(userAddress);
    }
  }, [userAddress]);

  const validateAddress = (address) => {
    console.log(address);
    const apiUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          // Address is valid
          setIsValidAddress(true);
          setSuggestedAddresses(data);
        } else {
          // Address is not valid
          setIsValidAddress(false);
          setSuggestedAddresses([]);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleInputChange = (e) => {
    const newAddress = e.target.value;
    setUserAddress(newAddress)
    // Call the callback function to pass the address value to the parent
    props.onAddressChange(newAddress);
  };

  return (
    <div>
      <label htmlFor="address">Address:</label>
      <input
        type="text"
        id="address"
        name="address"
        onChange={handleInputChange}
        placeholder="Enter your address"
      />
      {!isValidAddress && <p className="text-red-500">Invalid address. Please enter a valid address.</p>}
      {suggestedAddresses.length > 0 && (
        <ul>
          {suggestedAddresses.map((address) => (
            <li key={address.place_id}>{address.display_name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Address;
