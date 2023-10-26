import {initializeApp} from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {addDoc, collection, deleteDoc, getDocs, getFirestore, query, where} from "@firebase/firestore"

const firebaseConfig = initializeApp({
    apiKey: `${process.env.REACT_APP_API_KEY}`,
    authDomain: `${process.env.REACT_APP_AUTH_DOMAIN}`,
    projectId: `${process.env.REACT_APP_PROJECT_ID}`,
    storageBucket: `${process.env.REACT_APP_STORAGE_BUCKET}`,
    messagingSenderId: `${process.env.REACT_APP_MESSAGING_SENDER_ID}`,
    appId: `${process.env.REACT_APP_APP_ID}`,
    measurementId: `${process.env.REACT_APP_MEASUREMENT_ID}`,
});

const auth = getAuth(firebaseConfig);
const db = getFirestore(firebaseConfig);
const provider = new GoogleAuthProvider();

async function addFollowed(id?: string) {
    const user = auth.currentUser?.uid;

    if (!id || !user) {
        return;
    }

    const followedCollection = collection(db, "followed");

    const querySnapshot = await getDocs(query(followedCollection, where("filmId", "==", id), where("user", "==", user)));

    if (querySnapshot.size === 0) {
        try {
            await addDoc(followedCollection, {
                filmId: id,
                user: user,
            });
            console.log("Film ajouté aux suivis");
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    } else {
        try {
            await deleteDoc(querySnapshot.docs[0].ref);
            console.log("Film supprimé des suivis");
        } catch (error) {
            console.error("Error deleting document: ", error);
        }
    }
}

export {auth, db, provider, addFollowed};