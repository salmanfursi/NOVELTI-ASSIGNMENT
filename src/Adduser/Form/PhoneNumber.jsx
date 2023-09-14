import { useState } from 'react';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css'; // Import the CSS for styling



const PhoneNumber=()=> {
   const [phoneNumber, setPhoneNumber] = useState('');

   const handlePhoneNumberChange = (e,value) => {
      setPhoneNumber(value);
   };
   
   const handleSubmit = (e) => {
      e.preventDefault();

      console.log((e.target.numer.value))
      if (isValidPhoneNumber(phoneNumber)) {
        alert('Valid phone number: ' + phoneNumber);
        // Add your code for further processing here
      } else {
        alert('Invalid phone number: ' + phoneNumber);
      }

    };

  return (
   <div>
   <h1>Mobile Input with Country Code Picker</h1>
   <form onSubmit={handleSubmit}>
     <div className="form-control">
       <label>Mobile:</label>
       <PhoneInput
         placeholder="Enter mobile number"
         value={phoneNumber}
         name='number'
         onChange={handlePhoneNumberChange}
         defaultCountry="US" // Set the default country code
       />
     </div>
     <button type="submit">Submit</button>
   </form>
 </div>
  );
}

export default PhoneNumber;
