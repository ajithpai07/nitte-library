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
  
        const tabbody = document.querySelector("#tabbody");
        var kycf=document.querySelector("#kycf");
        var kycb=document.querySelector("#kycb");
        var propic=document.querySelector("#propic");
        var docid="";
  
        function render(doc){
          if(doc.data().return == 0){
            const fld1 = document.createElement('tr');      
            const fld2 = document.createElement('td');
            const fld3 = document.createElement('td');
            const fld4 = document.createElement('td');
            const fld5 = document.createElement('td');
            const fld6 = document.createElement('td');
            const fld7 = document.createElement('td');
            const fld8 = document.createElement('br');

            var d = new Date();
            var date = d.getDate();
            var month = d.getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12.
            var year = d.getFullYear();
            var dateStr = date + "/" + month + "/" + year;
  
            fld2.textContent = doc.id;
            fld3.textContent = doc.data().issuedon.toDate().getDate()+"/"+Number(Number(doc.data().issuedon.toDate().getMonth())+Number(1))+"/"+doc.data().issuedon.toDate(). getFullYear();
            fld4.textContent = doc.data().duedate.toDate().getDate()+"/"+Number(Number(doc.data().duedate.toDate().getMonth())+Number(1))+"/"+doc.data().duedate.toDate(). getFullYear();
            db.collection('Users').doc(doc.data().usrid).get().then(function(docu) {
                fld5.textContent = docu.data().name;
                fld6.textContent = docu.data().email;
            })
            fld7.textContent = dateStr;

            tabbody.appendChild(fld1);
            fld1.appendChild(fld2);
            fld1.appendChild(fld3);
            fld1.appendChild(fld4);
            fld1.appendChild(fld7);
            fld1.appendChild(fld5);
            fld1.appendChild(fld6);
            tabbody.appendChild(fld8);
          }
        }
  
        db.collection('Bookings').get().then((snapshot) => {
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