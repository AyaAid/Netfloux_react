import React, { useEffect, useState } from 'react'
import { auth} from '../../utils/firebase'
import { User, getAuth, onAuthStateChanged, signOut} from 'firebase/auth';

export default function AuthDetails() {
    const [authUser, setAuthUser] = useState<User | null>(null);
    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user)=>{
            if (user) {
                setAuthUser(user);
            } else {
                setAuthUser(null);
            }
        });
        return ()=>{listen()}
    }, []);

    const auth = getAuth();

    const authOut = () => {
        signOut(auth).then(()=>{
            }).catch((error)=>console.log(error));
            };   
  return (
    <div>
      {authUser ? (
        <>
          <p>{`Signed In as ${authUser.email}`}</p>
          <button onClick={authOut}>Sign Out</button>
        </>
      ) : (
        <p>Signed Out</p>
      )}
    </div>
  );
}

