var firebaseConfig = {
    apiKey: "AIzaSyBMadVVKRl84lbQ-UlHc4ynkMdjmSBEcAc",
    authDomain: "nitte-library.firebaseapp.com",
    databaseURL: "https://nitte-library.firebaseio.com",
    projectId: "nitte-library",
    storageBucket: "nitte-library.appspot.com",
    messagingSenderId: "481374096861",
    appId: "1:481374096861:web:ab0839a2356a5141eb3a34",
    measurementId: "G-Z0TSG9RJEB"
  };

firebase.initializeApp(firebaseConfig);

const db=firebase.firestore();

var fbid;
var num;

const support = document.querySelector("#support");

support.addEventListener('submit',(e) => {
    e.preventDefault();

    db.collection('Feedback').doc('Count').get().then(function(doc) {
        fbid="Feedback"+Number(Number(doc.data().count)+Number(1))
        num=Number(doc.data().count)
    })
    .then(function() {
       const fld1 = document.querySelector("#fld1");     
       const fld2 = document.querySelector("#fld2"); 
       const fld3 = document.querySelector("#fld3"); 
       const fld4 = document.querySelector("#fld4"); 
       
       db.collection('Feedback').doc(fbid).set({
            name: fld1.value,
            email: fld2.value,
            subject: fld3.value,
            message: fld4.value
       })
       .then(function() {
           db.collection('Feedback').doc('Count').update({
               count: Number(Number(num)+Number(1))
           })
           .then(function() {
               alert('Recorded your message!!')
               window.location="cs.html";
           })
       })

    })
})