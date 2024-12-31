// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBl5OFssavusVyq6obQk6lzpeGhTOKPjVg",
    authDomain: "timemaster-fdd5b.firebaseapp.com",
    projectId: "timemaster-fdd5b",
    storageBucket: "timemaster-fdd5b.firebasestorage.app",
    messagingSenderId: "536960942402",
    appId: "1:536960942402:web:e8f3393df514b48650c8db",
    measurementId: "G-XQR4XYFESB"
};

// אתחול Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

// פונקציה לרישום משתמש חדש
function registerUser(email, password) {
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("משתמש נרשם בהצלחה: ", user);
        })
        .catch((error) => {
            console.error("שגיאה בהרשמה: ", error.message);
        });
}

// פונקציה להתחברות למערכת
function loginUser(email, password) {
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("המשתמש התחבר בהצלחה: ", user);
        })
        .catch((error) => {
            console.error("שגיאה בהתחברות: ", error.message);
        });
}

// פונקציה לצאת מהמערכת
function logoutUser() {
    auth.signOut().then(() => {
        console.log("המשתמש יצא בהצלחה");
    }).catch((error) => {
        console.error("שגיאה ביציאה: ", error.message);
    });
}

// פונקציה להוספת תור למסד נתונים
function addAppointment(name, service, date, time) {
    db.collection("appointments").add({
        name: name,
        service: service,
        date: date,
        time: time
    })
    .then((docRef) => {
        console.log("התור נוסף בהצלחה: ", docRef.id);
    })
    .catch((error) => {
        console.error("שגיאה בהוספת התור: ", error.message);
    });
}

// פונקציה לקרוא את כל התורים מהמסד נתונים
function getAppointments() {
    db.collection("appointments").get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
            });
        })
        .catch((error) => {
            console.error("שגיאה בקריאת התורים: ", error.message);
        });
}

// פונקציה לעדכן תור קיים
function updateAppointment(appointmentId, newDetails) {
    const appointmentRef = db.collection("appointments").doc(appointmentId);
    appointmentRef.update(newDetails)
        .then(() => {
            console.log("התור עודכן בהצלחה");
        })
        .catch((error) => {
            console.error("שגיאה בעדכון התור: ", error.message);
        });
}

// פונקציה למחוק תור
function deleteAppointment(appointmentId) {
    const appointmentRef = db.collection("appointments").doc(appointmentId);
    appointmentRef.delete()
        .then(() => {
            console.log("התור נמחק בהצלחה");
        })
        .catch((error) => {
            console.error("שגיאה בהסרת התור: ", error.message);
        });
}

// פונקציה לקבלת פרטי המשתמש הנוכחי
function getCurrentUser() {
    const user = auth.currentUser;
    if (user) {
        console.log("המשתמש המחובר: ", user);
    } else {
        console.log("לא מחובר");
    }
}
{
  "hosting": {
    "public": "public",  // תיקיית הקבצים המוצגים באתר
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "/**",    // כל הבקשות
        "destination": "/index.html" // להפנות ל-index.html
      }
    ]
  }
}

// חיבור עם Firebase Analytics (אם יש צורך)
firebase.analytics();
