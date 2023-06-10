import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyCWflSK3VLYgREK8NZJ4Nl8sZfk6VNWxPU",
	authDomain: "ppcprogramform.firebaseapp.com",
	projectId: "ppcprogramform",
	storageBucket: "ppcprogramform.appspot.com",
	messagingSenderId: "114841806757",
	appId: "1:114841806757:web:494980f6dcf9b59de26a4c",
};

export const app = firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
