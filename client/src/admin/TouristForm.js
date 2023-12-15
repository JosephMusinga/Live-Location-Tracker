import React, { useState } from "react";
import { database } from "../Firebase";
import { ref, push, update } from "firebase/database";
import { NavLink } from 'react-router-dom';
import { query, orderByKey, equalTo, get } from "firebase/database";


const TouristForm = () => {


  const [touristData, setTouristData] = useState({
    TouristCode: "",
    Name: "",
    Sex: "",
    Country: "",
    PassportNumber: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Validate the input fields
    const validationRules = {
      TouristCode: /^\d+$/,
      Name: /^[a-zA-Z\s]*$/,
      Sex: /^\w*$/,
      Country: /^[a-zA-Z\s]*$/,
      PassportNumber: /^\d+$/,
    };
  
    for (const field in touristData) {
      if (touristData[field] === "" || !validationRules[field].test(touristData[field])) {
        alert(`Invalid or empty ${field}`);
        return; // Prevent form submission if any field is invalid or empty
      }
    }
  
    for (const field in touristData) {
      if (!validationRules[field].test(touristData[field])) {
        alert(`Invalid ${field}`);
        return; // Prevent form submission if any field is invalid
      }
    }
  
    const defaultCoordinates = { latitude: 11, longitude: 11 };
    const liveCoordinatesRef = ref(database, "live_coordinates");
  
    // Check if the touristCode already exists in the live_coordinates object
    const touristCode = touristData.TouristCode;
    const liveCoordinatesQuery = query(liveCoordinatesRef, orderByKey(), equalTo(touristCode));
  
    get(liveCoordinatesQuery)
      .then((snapshot) => {
        if (snapshot.exists()) {
          // Tourist with the same touristCode already exists
          alert("A user with the same tourist code already exists");
        } else {
          // Tourist with the same touristCode doesn't exist, proceed to create the record
          // Set the object directly under the "live_coordinates" reference
          update(liveCoordinatesRef, {
            [touristCode]: defaultCoordinates,
          });
  
          // Push the touristData object to the "tourist records" database reference
          push(ref(database, "tourist records"), touristData)
            .then(() => {
              alert("Tourist record created successfully");
              // Reset the form after successful submission
              setTouristData({
                TouristCode: "",
                Name: "",
                Sex: "",
                Country: "",
                PassportNumber: "",
              });
            })
            .catch((error) => {
              console.error("Error creating tourist record: ", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error checking tourist code: ", error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTouristData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form__element">
        <label>
          Tourist Code:
          <input
            type="text"
            name="TouristCode"
            value={touristData.TouristCode}
            onChange={handleChange}
          />
        </label>
      </div>

      <br />
      <div className="form__element">
        <label>
          Name:
          <input
            type="text"
            name="Name"
            value={touristData.Name}
            onChange={handleChange}
          />
        </label>
      </div>

      <br />

      <div className="form__element">
        <label>
          Sex:
          <input
            type="text"
            name="Sex"
            value={touristData.Sex}
            onChange={handleChange}
          />
        </label>
      </div>

      <br />

      <div className="form__element">
        <label>
          Country:
          <input
            type="text"
            name="Country"
            value={touristData.Country}
            onChange={handleChange}
          />
        </label>
      </div>

      <br />

      <div className="form__element">
        <label>
          Passport Number:
          <input
            type="text"
            name="PassportNumber"
            value={touristData.PassportNumber}
            onChange={handleChange}
          />
        </label>
      </div>

      <br />
      <button type="submit">Submit</button>
      
    </form>
  );
};

export default TouristForm;