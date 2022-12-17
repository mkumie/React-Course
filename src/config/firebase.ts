// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCT7W8DzKPBLLz-fsJcL4Blxlu2zWUfNZM",
  authDomain: "react-course-5dc61.firebaseapp.com",
  projectId: "react-course-5dc61",
  storageBucket: "react-course-5dc61.appspot.com",
  messagingSenderId: "1085681661666",
  appId: "1:1085681661666:web:2a8fe55dcc2945f5fe50bb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app)