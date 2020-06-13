// Your web app's Firebase configuration
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
const ref = firebase.storage().ref();

const signupForm=document.querySelector("#Register");

signupForm.addEventListener('submit',(e) =>{
  e.preventDefault();

  const name=signupForm['name'].value;
  const Dob=signupForm['Dob'].value;
  const email=signupForm['email'].value;
  const phno=signupForm['phno'].value;
  const password=signupForm['password'].value;
  const dno=signupForm['dno'].value;
  const strtname=signupForm['strtname'].value;
  const City=signupForm['City'].value;
  const pcode=signupForm['pcode'].value;
  const p1=signupForm['p1'].value;
  const p2=signupForm['p2'].value;
  const p3=signupForm['p3'].value;
  const KYCtype=signupForm['KYCtype'].value;
  const Kycid=signupForm['Kycid'].value;
  let url1;
  
  auth.createUserWithEmailAndPassword(email, password).then(cred =>{
    //signing user in
    firebase.auth().signInWithEmailAndPassword(email, password).then(function(user){
      if(user){
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            // User is signed in.
            const userId=user.uid;

            const file=document.querySelector("#Kycimg").files[0];
            
            const p_name=new Date()+'-'+file.name;

            const metadata ={
              contentType:file.type
            }

            const task=ref.child(p_name).put(file,metadata);

            task.then(snapshot => snapshot.ref.getDownloadURL()).then(url => { url1 = url}).then(function() {remverr()});
            function remverr(){
            db.collection('Users').doc(userId).set({
              name: name,
              Dob: Dob,
              email: email,
              phno: phno,
              password: password,
              dno: dno,
              strtname: strtname,
              City: City,
              pcode: pcode,
              p1: p1,
              p2: p2,
              p3: p3,
              KYCtype: KYCtype,
              Kycid: Kycid,
              Kycstatus: "UPending",
              proimg: url1,
              wallet:0,
              role: "customer",
              saved: 0
            }).then(function() {remverr2();});
            
          }
            function remverr2(){
              alert("Successfully created your account!");
              window.location="9_clogin.html";
            }
          }
          else{
            //no user signed in
          }
        });
        
      }
    })
    .catch(function(error){
      console.log(error.message);
    });
  })
  .catch(function(error){
    console.log(error.message);
  });
});