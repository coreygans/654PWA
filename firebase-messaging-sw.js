// // Give the service worker access to Firebase Messaging.
// // Note that you can only use Firebase Messaging here. Other Firebase libraries
// // are not available in the service worker.
// importScripts('https://www.gstatic.com/firebasejs/9.3.0/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/9.3.0/firebase-messaging.js');

// // Initialize the Firebase app in the service worker by passing in
// // your app's Firebase config object.
// // https://firebase.google.com/docs/web/setup#config-object
// firebase.initializeApp({
//     apiKey: "AIzaSyDPU9BzYR8FbMYQH-xWlkhW2uaFHhM5uRc",
//     authDomain: "finance-tracker-12069.firebaseapp.com",
//     projectId: "finance-tracker-12069",
//     storageBucket: "finance-tracker-12069.appspot.com",
//     messagingSenderId: "717459811296",
//     appId: "1:717459811296:web:b405fe2e9d4f030fd05985",
// });



// // Retrieve an instance of Firebase Messaging so that it can handle background
// // messages.
// const messaging = firebase.messaging();

// // Handle incoming messages. Called when:
// // - a message is received while the app has focus
// // - the user clicks on an app notification created by a service worker
// //   `messaging.onBackgroundMessage` handler.
// messaging.onMessage((payload) => {
//     console.log('Message received. ', payload);
//     // ...
//   });