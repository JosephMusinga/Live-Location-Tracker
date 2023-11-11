// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue,onChildAdded } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMLUnBZycQCjuMjU0X2GmlovbIqx581io",
  authDomain: "live-location-tracker-b470c.firebaseapp.com",
  databaseURL: "https://live-location-tracker-b470c-default-rtdb.firebaseio.com",
  projectId: "live-location-tracker-b470c",
  storageBucket: "live-location-tracker-b470c.appspot.com",
  messagingSenderId: "228563690755",
  appId: "1:228563690755:web:8137933ad7973525373536"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;

export const database = getDatabase(app)

export const getCoordinatesFromDatabase = (databaseRef) => {
  const coordinatesRef = ref(database, databaseRef)
  
  return new Promise((resolve, reject) => {
    onValue(coordinatesRef, (snapshot) => {
      const coordinatesArray = Object.values(snapshot.val())
      resolve(coordinatesArray)
    }, {
      onlyOnce: true
    })
  })
}

export const getAlertFromDatabase = () => {
    const alertRef = ref(database, 'alerts');
  
    return new Promise((resolve, reject) => {
      const initialDataFetched = new Set();
      onChildAdded(alertRef, (snapshot) => {
        const alertKey = snapshot.key;
        const alertValue = snapshot.val();
  
        // Check if the entry has already been fetched
        if (!initialDataFetched.has(alertKey)) {
          initialDataFetched.add(alertKey);
          const alertMessage = `${alertKey}: ${JSON.stringify(alertValue)}`;
          alert(alertMessage);
        }
      });
  
      // Clear the set when the initial data fetching is complete
      setTimeout(() => {
        initialDataFetched.clear();
      }, 1000);
    });
  };

  