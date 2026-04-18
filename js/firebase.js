import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAuth }        from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { getFirestore }   from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
 
const firebaseConfig = {
  apiKey:            "TUMCHA_API_KEY_ITHE_TAKA",
  authDomain:        "TUMCHA_PROJECT_ID.firebaseapp.com",
  projectId:         "TUMCHA_PROJECT_ID",
  storageBucket:     "TUMCHA_PROJECT_ID.appspot.com",
  messagingSenderId: "TUMCHA_MESSAGING_SENDER_ID",
  appId:             "TUMCHA_APP_ID"
};
 
const app = initializeApp(firebaseConfig);
 
export const auth = getAuth(app);
export const db   = getFirestore(app);
 