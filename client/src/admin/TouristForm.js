import React, { useState } from "react";
import { database } from "../Firebase";
import { ref, push } from "firebase/database";

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

    // Push the touristData object to the "tourist records" reference in the database
    push(ref(database, "tourist records"), touristData)
      .then(() => {
        console.log("Tourist record created successfully");
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