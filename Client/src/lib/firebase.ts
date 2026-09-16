import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBY21Aq6BwXmqOJotZ3hJWhQYHzwTmv_rU",
    authDomain: "pawdium-e4710.firebaseapp.com",
    projectId: "pawdium-e4710",
    storageBucket: "pawdium-e4710.firebasestorage.app",
    messagingSenderId: "194547359402",
    appId: "1:194547359402:web:7100eb9801abbe873e7ad3",
    measurementId: "G-M4FSXXMEJC"
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);