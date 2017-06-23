importScripts('https://www.gstatic.com/firebasejs/4.1.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.1.2/firebase-messaging.js');
var config = {
    apiKey: "AIzaSyCVP--nIngflDoXV5qBKSPzzSyy712tpDA",
    authDomain: "drm-pwa-hkt.firebaseapp.com",
    databaseURL: "https://drm-pwa-hkt.firebaseio.com",
    projectId: "drm-pwa-hkt",
    storageBucket: "drm-pwa-hkt.appspot.com",
    messagingSenderId: "640169615174"
};
firebase.initializeApp(config);
const messaging = firebase.messaging();



messaging.setBackgroundMessageHandler(function(payload) {
  //console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  return self.registration.showNotification(notificationTitle,
      notificationOptions);
});
