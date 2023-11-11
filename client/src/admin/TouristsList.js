import React, { useState, useEffect } from 'react';
import { ref, onValue, off } from 'firebase/database';
import { database } from '../Firebase'

function TouristList() {
  const [touristList, setTouristList] = useState([]);

  useEffect(() => {
    // Fetch the tourist records from the database
    const touristListRef = ref(database, 'tourist records');
    onValue(touristListRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Convert the object of records into an array
        const recordsArray = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value,
        }));
        setTouristList(recordsArray);
      }
    });

    // Cleanup the event listener when the component unmounts
    return () => {
      off(touristListRef);
    };
  }, []);

  return (
    <>
      <h1>Tourist Records</h1>
      {touristList.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Tourist Code</th>
              <th>Name</th>
              <th>Sex</th>
              <th>Country</th>
              <th>Passport Number</th>
            </tr>
          </thead>
          <tbody>
            {touristList.map((record) => (
              <tr key={record.id}>
                <td>{record.TouristCode}</td>
                <td>{record.Name}</td>
                <td>{record.Sex}</td>
                <td>{record.Country}</td>
                <td>{record.PassportNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No tourist records found.</p>
      )}
    </>
  );
}

export default TouristList;