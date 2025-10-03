import { logout } from "../utils";
import { logoutUser } from "../features/auth";
import { useDispatch } from "react-redux";


export default function MyProfile() {
  
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      localStorage.removeItem("session_id");
      localStorage.removeItem("request_token");
      dispatch(logoutUser());
    }
  };

  return (
    <div className="p-8">
      <div className='bg-[#6A9C89]'>
        <h2>My Profile</h2>
        <button onClick={handleLogout}>LogOut</button>
      </div>
    </div>
  )
}
