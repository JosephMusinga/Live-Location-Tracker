import React, { useState, useEffect } from 'react';
import { ref, onValue} from 'firebase/database';
import { database } from '../Firebase'

function Alerts() {
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        // Fetch the alert records from the database
        const alertsRef = ref(database, 'alerts');

        const unsubscribe = onValue(alertsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
              const alertList = Object.values(data);
              setAlerts(alertList);
            }
          });
          
          return () => {
            // Clean up event listener when component unmounts
            unsubscribe();
          };
        }, []);

    return (
        <div>
      <h2>Alerts</h2>
      <table>
        <tbody>
          {alerts.map((alert, index) => (
            <tr key={index}>
              <td>{alert}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    );
}

export default Alerts;