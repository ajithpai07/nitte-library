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
const auth=firebase.auth();

auth.onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in. 
      console.log(user.uid);

      const mainhead = document.querySelector("#mainhead");

      function render(doc){
          if(doc.id != "Count"){
            const fld1 = document.createElement('div');
            const fld2 = document.createElement('pre');
            const fld3 = document.createElement('pre');
            const fld4 = document.createElement('pre');
            const fld5 = document.createElement('pre');
            const fld6 = document.createElement('pre');
            const fld7 = document.createElement('button');

            fld1.setAttribute('class','query');
            fld2.textContent = "Request ID     : "+doc.id;
            fld3.textContent = "Name           : "+doc.data().name;
            fld4.textContent = "Email          : "+doc.data().email;
            fld5.textContent = "Subject        : "+doc.data().subject;
            fld6.textContent = "Message        : "+doc.data().message;
            fld7.setAttribute('class','delete');
            fld7.textContent = "Delete";

            mainhead.appendChild(fld1);
            fld1.appendChild(fld2);
            fld1.appendChild(fld3);
            fld1.appendChild(fld4);
            fld1.appendChild(fld5);
            fld1.appendChild(fld6);
            fld1.appendChild(fld7);

            fld7.addEventListener('click',(e) => {
                e.stopPropagation();

                db.collection('Feedback').doc(doc.id).delete()
                .then(function() {
                    alert('deleted succeessfully');
                    window.location="1lib_cust_req.html"
                })
            })
          }
      }
      
      db.collection('Feedback').get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            render(doc);
        })
      })
    } else {
      // No user is signed in.
      console.log("not signed-in");
      window.location="3_login.html";
    }
  });