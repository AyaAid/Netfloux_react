import ModifyEmail from "../components/Profil/ModifyEmail";
import ModifyPassword from "../components/Profil/ModifyPassword";
import Navbar from "../components/navbar/Navbar";
function Modify() {
  return (
    <div>
        <Navbar />
        <ModifyEmail />
        <ModifyPassword />
    </div>
  );
}

export default Modify;
