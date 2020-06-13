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
      let sum=0;
      let bkingcnt;
      let walletamt;
      const tamt = document.querySelector("#totall");

      function render(doc){
        if(doc.id!="Random" && doc.data().usrid==user.uid){
        const fld1 = document.createElement('tr');      
        const fld2 = document.createElement('td');
        const fld3 = document.createElement('td');
        const fld4 = document.createElement('td');
        const fld5 = document.createElement('td');
        const fld6 = document.createElement('button');
        const fld7 = document.createElement('td');
        const fld8 = document.createElement('button');

        db.collection('Books').doc(doc.data().bookid).get().then(function(docu) {
            fld2.textContent=docu.id;
            fld3.textContent=docu.data().bname;
            fld4.textContent=docu.data().bprice;
            fld6.textContent="Delete";
            fld8.textContent="Checkout"
            sum=sum+Number(100);
            fld6.style.cursor="pointer";
            fld8.style.cursor="pointer";
        })
        .then(function() {
            tabbody.appendChild(fld1);
            fld1.appendChild(fld2);
            fld1.appendChild(fld3);
            fld1.appendChild(fld4);
            fld1.appendChild(fld5);
            fld5.appendChild(fld6);
            fld1.appendChild(fld7);
            fld7.appendChild(fld8);
            const str1=" Total price = ₹ ";
            const str2=sum;
            const xD = str1.concat(str2);
            tamt.textContent = xD;
        })
        
        fld6.addEventListener('click',(e) => {
            db.collection('Books').doc(doc.data().bookid).update({
                bavial: 1
            })
            .then(function() {
                db.collection('Cart').doc(doc.id).delete().then(function() {
                    window.location="6_cart.html";
                })
            })
        })
        
        fld8.addEventListener('click', (e) => {
          e.stopPropagation();

          db.collection('Users').doc(user.uid).get().then(function(docm) {
            walletamt=docm.data().wallet;
          })
          .then(function() {
            if(walletamt>=0){
              db.collection('Bookings').doc('Count').get().then(function(docu) {
                bkingcnt=docu.data().count+1;
              })
              .then(function() {
                const stri1="Booking";
                const stri2=bkingcnt;
                const xD1 = stri1.concat(stri2);
                const today = new Date();
                const newdate = new Date();
                newdate.setDate(today.getDate()+15);

                db.collection('Bookings').doc(xD1).set({
                  usrid: user.uid,
                  bookid: doc.data().bookid,
                  issuedon: today,
                  duedate: newdate,
                  bprice: doc.data().bprice,
                  return: 0
                })
                .then(function() {
                  db.collection('Cart').doc(doc.id).delete()
                  .then(function() {
                    db.collection('Bookings').doc('Count').update({
                      count: bkingcnt
                    })
                    .then(function() {
                      alert('Checkedout successfully!!');
                      window.location="6_cart.html";
                    })
                  })
                }) 
              })
            }
            else{
              alert('Please clear your dues and book again');
              window.location="5_wallet.html";
            }
         })
          
        })

        }
      }
  
      db.collection('Cart').get().then((snapshot) => {
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