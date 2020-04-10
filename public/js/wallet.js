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
      // User is signed in. 
      console.log(user.uid);

      const fld8=document.querySelector("#fld8");
      const fld2=document.querySelector("#fld2");
      const fld3=document.querySelector("#fld3");
      const fld4=document.querySelector("#fld4");
      const fld5=document.querySelector("#fld5");
      const fld6=document.querySelector("#fld6");       

      function render(doc){
          const fd8= document.createElement('span');            

          fd8.textContent=doc.data().wallet;

          fld2.value=doc.data().cardno;
          fld3.value=doc.data().cardholder;            
          fld4.value=doc.data().expire_m;
          fld5.value=doc.data().expire_y;            
          fld6.value=doc.data().cvc;

          fld8.appendChild(fd8);
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

      const card=document.querySelector("#card");

      card.addEventListener('submit',(e) => {
          e.preventDefault();

          const fd1=parseInt(card['fld1'].value);
          const fd2=card['fld2'].value;
          const fd3=card['fld3'].value;
          const fd4=card['fld4'].value;
          const fd5=card['fld5'].value;
          const fd6=card['fld6'].value;
          
          db.collection('Users').doc(user.uid).get().then(function(doc) {
              if(doc.exists) {
                  const bal=parseInt(doc.data().wallet);
                  const cbal=(fd1+bal);
                  db.collection("Users").doc(user.uid).update({
                      wallet: cbal
                  });
              }
          });

          if(card['fld7'].checked){
              db.collection("Users").doc(user.uid).update({
                  cardno: fd2,
                  cardholder: fd3,
                  expire_m: fd4,
                  expire_y: fd5,
                  cvc: fd6
                });
          }
          card.reset();
          setTimeout(function() {
              location.reload();
            }, 5000);
      });


  } else {
    // No user is signed in.
    console.log("not present");
    window.location="3_login.html";
  }
});