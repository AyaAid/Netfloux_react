import { useState } from "react";
import { auth } from "../../utils/firebase";
import { reauthenticateWithCredential, EmailAuthProvider , updatePassword } from "firebase/auth";





export default function ModifyPassword(){

    const user = auth.currentUser;
    const [newpassword, setPassword] = useState("");
    const modifyIng = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (!user) {
            console.log("User is null");
            return;
        }
        reauthenticateWithCredential(user, EmailAuthProvider.credential(user.email!, newpassword))
            .then(() => {
                updatePassword(user, newpassword).then(() => {
                    console.log("Password updated!");
                });
            })
            .catch((error: any) => {
                console.log(error);
            });
    }

    return (
        <div>
          <form onSubmit={modifyIng}>
            <h1>Modify Password</h1>
            <input
              type="password"
              placeholder="Entre ton nouveau mot de passe"
              value={newpassword}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Update Password</button>
          </form>
        </div>
      );
}

