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
//logout 
const logout=document.querySelector('#logout');
logout.addEventListener('click', (e)=>{
    e.preventDefault();
    auth.signOut().then(() =>{
        console.log('user is signed out');
        alert('You are now logged out');
        window.location="3_login.html";
    })
    .catch(function(error){
        alert('unable to log out');
    });;
});