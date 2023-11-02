// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMLUnBZycQCjuMjU0X2GmlovbIqx581io",
  authDomain: "live-location-tracker-b470c.firebaseapp.com",
  projectId: "live-location-tracker-b470c",
  storageBucket: "live-location-tracker-b470c.appspot.com",
  messagingSenderId: "228563690755",
  appId: "1:228563690755:web:c3e3034a811a680f373536"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;