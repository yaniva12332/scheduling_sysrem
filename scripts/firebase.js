// Initialize Firebase
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID"
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

// חיבור עם Firebase Analytics (אם יש צורך)
firebase.analytics();
