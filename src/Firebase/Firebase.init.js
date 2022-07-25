import { initializeApp } from "firebase/app";
import firebaseConfig from "./Firebase.config";


const firebaseconfigarationInitilization = () => {
    initializeApp(firebaseConfig);
};

export default firebaseconfigarationInitilization;