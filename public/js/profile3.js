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
      const fd1=document.querySelector("#fd1");
      const fd2=document.querySelector("#fd2");
      const fd4=document.querySelector("#fd4");
      const fd5=document.querySelector("#fd5");
      const fd6=document.querySelector("#fd6");
      const fd7=document.querySelector("#fd7");
      const fd8=document.querySelector("#fd8");
      const fd9=document.querySelector("#fd9");
      const fd10=document.querySelector("#fd10");    

      function render(doc){

        fd1.value=doc.data().name;
        fd2.value=doc.data().Dob;
        fd4.value=doc.data().p1;
        fd5.value=doc.data().p2;
        fd6.value=doc.data().p3;
        fd7.value=doc.data().dno;
        fd8.value=doc.data().strtname;
        fd9.value=doc.data().City;
        fd10.value=doc.data().pcode;
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

        const update=document.querySelector("#update");
        
        update.addEventListener('submit',(e) => {
            e.preventDefault();

            const fd1=update['fd1'].value;
            const fd2=update['fd2'].value;
            const fd4=update['fd4'].value;
            const fd5=update['fd5'].value;
            const fd6=update['fd6'].value;
            const fd7=update['fd7'].value;
            const fd8=update['fd8'].value;
            const fd9=update['fd9'].value;
            const fd10=update['fd10'].value;
            

            db.collection("Users").doc(user.uid).update({
                name: fd1,
                Dob: fd2,
                p1: fd4,
                p2: fd5,
                p3: fd6,
                dno:fd7,
                strtname:fd8,
                City:fd9,
                pcode:fd10
              });
              const fd12=document.querySelector("#fd12");
              fd12.textContent="Updated Successfully";
              setTimeout(function() {
                fd12.textContent="";
              }, 3000);


        })
        

          // Move to a new location or you can do something else
          
  
   
    } 
    else {
      // No user is signed in.
      console.log("not present");
      window.location="3_login.html";
    }
  });