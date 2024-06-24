import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCRG0F8ZOwSrIAdHPJM0XUB5BQ5JQyu4aA",
  authDomain: "e-commerce-react-e781a.firebaseapp.com",
  projectId: "e-commerce-react-e781a",
  storageBucket: "e-commerce-react-e781a.appspot.com",
  messagingSenderId: "561180868789",
  appId: "1:561180868789:web:b2fc9bb59ea9c8f8c6fefc",
  measurementId: "G-41WEGD6PC1"
};

const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app)
const auth =  getAuth(app)

const analytics = getAnalytics(app);

export { fireDB, auth}