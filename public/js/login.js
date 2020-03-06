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
    // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  const db=firebase.firestore();
  const auth=firebase.auth();
  
  const loginForm=document.querySelector("#login"); 

loginForm.addEventListener('submit',(e) =>{
  e.preventDefault();
    const email=loginForm['email'].value;
    const password=loginForm['password'].value;

    auth.signInWithEmailAndPassword(email,password).then(function(user){
      if(user){
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            // User is signed in. 
            alert("login successful");
            window.location="2_home.html";
          } else {
            // No user is signed in.
          }
        });
       
    }
    })
    .catch(function(error) {
      alert("Username or Password entered is invalid");
      window.location="3_login.html";
    });
});
