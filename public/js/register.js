// Your web app's Firebase configuration
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

const signupForm=document.querySelector("#Register");

signupForm.addEventListener('submit',(e) =>{
  e.preventDefault();

  const name=signupForm['name'].value;
  const Dob=signupForm['Dob'].value;
  const email=signupForm['email'].value;
  const phno=signupForm['phno'].value;
  const password=signupForm['password'].value;
  const KYCtype=signupForm['KYCtype'].value;
  const Kycid=signupForm['Kycid'].value;
  const Kycimg=signupForm['Kycimg'].value;

  db.collection('Users').add({
    
    name: name,
    Dob: Dob,
    email: email,
    phno: phno,
    password: password,
    KYCtype: KYCtype,
    Kycid: Kycid
  });
  
  auth.createUserWithEmailAndPassword(email, password).then(cred =>{
    console.log(cred.user.uid);
  });
  
  window.location="8_clogin.html"
});