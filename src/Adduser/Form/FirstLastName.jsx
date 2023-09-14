import  { useState } from 'react';

const FirstLastName = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (firstName.length < 5 || lastName.length < 5) {
      alert('Both First Name and Last Name must be at least 5 characters long.');
    } else {
      // Perform form submission or further processing here
      alert('Form submitted successfully!');
    }
  };

  return (
    <div>
      <h1>Registration Form</h1>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={firstName}
          onChange={handleFirstNameChange}
          required
        />
        <br />
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={lastName}
          onChange={handleLastNameChange}
          required
        />
        <br />
        
    </div>
  );
};

export default FirstLastName;
