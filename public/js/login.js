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
            db.collection('Users').doc(user.uid).get().then(function(doc) {
              if(doc.exists) {
                console.log("data is ", doc.data());
                if(doc.data().role=="customer"){
                  alert("Login successful");
                  window.location="2_home.html";
                }
                else{
                  if(doc.data().role=="admin"){
                    alert("Login successful");
                    window.location="1lib_home.html";
                  }
                  else{
                    alert("Your account is not secure please contact us in help");
                  }
                }
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
            console.log("no user is signed in");
          }
        });
       
    }
    })
    .catch(function(error) {
      const fd12=document.querySelector("#fld12");
      fd12.textContent="*Invalid username or password";
      alert('Invalid username or password!');
      setTimeout(function() {
        window.location="3_login.html";
      },3000);
    });
});
