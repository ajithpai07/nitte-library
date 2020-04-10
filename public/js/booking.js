var firebaseConfig = {
  apiKey: "AIzaSyBMadVVKRl84lbQ-UlHc4ynkMdjmSBEcAc",
  authDomain: "nitte-library.firebaseapp.com",
  databaseURL: "https://nitte-library.firebaseio.com",
  projectId: "nitte-library",
  storageBucket: "nitte-library.appspot.com",
  messagingSenderId: "481374096861",
  appId: "1:481374096861:web:6714dbe0762969f8eb3a34",
  measurementId: "G-EGE2DG4WD6"
};

firebase.initializeApp(firebaseConfig);

const db=firebase.firestore();
const auth=firebase.auth();

auth.onAuthStateChanged(function(user) {
    if (user) {
      const fld1=document.querySelector("#fld1");
      
      function render(doc){
        const fd1= document.createElement('span');

        fd1.textContent=doc.data().name;

        fld1.appendChild(fd1);
      }
      db.collection('Users').doc(user.uid).get().then(function(doc) {
        if(doc.exists) {
          console.log("data is ", doc.data());
          render(doc);
        }
        else {
          console.log("no document");
        }
      })
        .catch(function(error) {
          console.log("error"+error);
        });
    } else {
      // No user is signed in.
      console.log("not present");
      window.location="3_login.html";
    }
  });