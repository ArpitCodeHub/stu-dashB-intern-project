import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyATaOWfsIqdjzcjwsPGBzmJx5r5IRNHgr0",
  authDomain: "student-dashboard-d28e5.firebaseapp.com",
  projectId: "student-dashboard-d28e5",
  storageBucket: "student-dashboard-d28e5.firebasestorage.app",
  messagingSenderId: "797094990153",
  appId: "1:797094990153:web:278eabf7cdc0e0cc9e8a98"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, signInWithEmailAndPassword, signOut };
export default app;