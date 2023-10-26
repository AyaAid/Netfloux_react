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

async function likes(id?: string) {
  const user = auth.currentUser?.uid;

  if (!id || !user) {
    return;
  }

  const likesCollection = collection(db, "likes");

  const querySnapshot = await getDocs(
    query(
      likesCollection,
      where("filmId", "==", id),
      where("user", "==", user)
    )
  );
  const queryDislike = await getDocs(
    query(collection(db, "dislikes"), where("filmId", "==", id), where("user", "==", user))
  );

  if (querySnapshot.size === 0) {
    try {
      if (queryDislike.size > 0) {
        await deleteDoc(queryDislike.docs[0].ref);
        console.log("Dislike supprimé");
      } 
      await addDoc(likesCollection, {
        filmId: id,
        user: user,
      });
      console.log("Like ajouté");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  } else {
    try {
      await deleteDoc(querySnapshot.docs[0].ref);
      console.log("Like supprimé");
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  }
}

async function dislikes(id?: string) {
  const user = auth.currentUser?.uid;

  if (!id || !user) {
    return;
  }

  const dislikesCollection = collection(db, "dislikes");

  const querySnapshot = await getDocs(
    query(dislikesCollection, where("filmId", "==", id), where("user", "==", user))
  );
  const queryLike = await getDocs(
    query(collection(db, "likes"), where("filmId", "==", id), where("user", "==", user))
  );

  if (querySnapshot.size === 0) {
    try {
      if (queryLike.size > 0){
        await deleteDoc(queryLike.docs[0].ref);
        console.log("Like supprimé");
      } 
      await addDoc(dislikesCollection, {
        filmId: id,
        user: user,
      });
      console.log("Dislike ajouté");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  } else {
    try {
      await deleteDoc(querySnapshot.docs[0].ref);
      console.log("Dislike supprimé");
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  }
}

async function addComment(id?: string, comment?: string) {
  const user = auth.currentUser?.uid;
  if (!id || !user) {
    return;
  }
  const commentsCollection = collection(db, "comments");

    try {
      await addDoc(commentsCollection, {
        filmId: id,
        user: user,
        comment: comment,
      });
      console.log("Commentaire ajouté");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }

  async function getComment(id?: string) {
    const user = auth.currentUser?.uid;
    if (!id || !user) {
      console.log("id",id)
      console.log("user",user)
      return;
    }
    const commentsCollection = collection(db, "comments");

    const querySnapshot = await getDocs(
      query(
        commentsCollection,
        where("filmId", "==", id)
      )
    );
    console.log("query function", querySnapshot)
      return querySnapshot
}

export {auth, db, provider, addFollowed, likes, dislikes, addComment, getComment};