import React, { useEffect, useState } from 'react'
import { auth} from '../../utils/firebase'
import { User, onAuthStateChanged} from 'firebase/auth';

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

    const signOut = () => {
        auth.signOut().then(()=>{
            console.log('Signed out');
            }).catch((error)=>console.log(error));
            };   
  return (
    <div>
      {authUser ? (
        <>
          <p>{`Signed In as ${authUser.email}`}</p>
          <button onClick={signOut}>Sign Out</button>
        </>
      ) : (
        <p>Signed Out</p>
      )}
    </div>
  );
}

