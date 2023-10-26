import { useState } from "react";
import { auth } from "../../utils/firebase";
import { updateEmail } from "firebase/auth";





export default function ModifyEmail(){

    const user = auth.currentUser;
    const [newemail, setEmail] = useState("");
    const modifyIng = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (!user) {
            console.log("User is null");
            return;
        }
        try {
          updateEmail(user, newemail).then(() => {
            console.log("Email updated!");
          });
        }
        catch(error){
          console.log(error)
        }
    }

    return (
        <div>
          <form onSubmit={modifyIng}>
            <h1>Modify Email</h1>
            <input
              type="email"
              placeholder="Entre ton nouveau email"
              value={newemail}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Update Email</button>
          </form>
        </div>
      );
}

