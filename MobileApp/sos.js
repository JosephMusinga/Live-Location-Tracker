import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js'
import { getDatabase, ref, push, update, onValue } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js'


const appSettings = {
     databaseURL: "https://live-location-tracker-b470c-default-rtdb.firebaseio.com"

}

const app = initializeApp(appSettings)
const database = getDatabase(app)

//get reference value from input
var searchParams = new URLSearchParams(window.location.search);
var name = searchParams.get('inputValue').toString();
console.log(typeof (name))

const coordinatesInDB = ref(database, name)
const alertsInDB = ref(database, 'alerts')


const sosButtonEl = document.getElementById('alertBtn')

let lat
let long

let referenceNotFoundError = false;
let successfulAlert = false;

sosButtonEl.addEventListener('click', function () {
  onValue(alertsInDB, (snapshot) =>{
    update(alertsInDB, {
      alert : `${name} needs attention `+ [getDate()]
    })
  })
})

//get currrent position coordinates
function getPosition(position) {
    lat = position.coords.latitude
    long = position.coords.longitude

    console.log("Coordinates are Lat: " + lat + " ,Long: " + long)
    
  onValue(coordinatesInDB, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      //send coordinates to DB
      update(coordinatesInDB, {
        "latitude": lat,
        "longitude": long,
      })
      if(!successfulAlert){
        alert("You are now being tracked, keep your location turned on");
        successfulAlert = true;
      }
    } else {
      if (!referenceNotFoundError) {
        alert("Reference not found in the database. Please provide the correct access code!");
        referenceNotFoundError = true;
      }
    }
  });
}

function getCoordinates() {
    navigator.geolocation.getCurrentPosition(getPosition)
}

function coordinatesUpdateInterval(myFunction) {
    setInterval(myFunction, 8 * 1000);
}

coordinatesUpdateInterval(getCoordinates);

function getDate(){
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()
  const day = today.getDate()
  const hour = today.getHours()
  const minute = today.getMinutes()
  const seconds = today.getSeconds()

  const fullDateAndTime = `${day}-${month}-${year} time :${hour}:${minute}:${seconds}`

  return fullDateAndTime
}