importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyCMLUnBZycQCjuMjU0X2GmlovbIqx581io",
    authDomain: "live-location-tracker-b470c.firebaseapp.com",
    projectId: "live-location-tracker-b470c",
    storageBucket: "live-location-tracker-b470c.appspot.com",
    messagingSenderId: "228563690755",
    appId: "1:228563690755:web:c3e3034a811a680f373536",

    databaseURL: "https://live-location-tracker-b470c-default-rtdb.firebaseio.com/"

};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    console.log('Received background message ', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
    };

    self.registration.showNotification(notificationTitle,
        notificationOptions);
});