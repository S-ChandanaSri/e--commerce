
import { initializeApp } from "firebase/app";
import {getAuth,RecaptchaVerifier} from "firebase/auth"




const firebaseConfig = {
  apiKey: "AIzaSyA_Fmo9X8pkuXzL4zXw4eGoKl7W2tI4yvo",
  authDomain: "otp-project-a1692.firebaseapp.com",
  projectId: "otp-project-a1692",
  storageBucket: "otp-project-a1692.appspot.com",
  messagingSenderId: "1016831782978",
  appId: "1:1016831782978:web:082bbca1cabce2f20ffddb",
  measurementId: "G-JHWPPKGWLL"
};


const app = initializeApp(firebaseConfig);

export const auth=getAuth(app)


export { app as firebase,RecaptchaVerifier };