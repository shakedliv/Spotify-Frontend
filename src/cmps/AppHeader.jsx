import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import { logout } from "../store/actions/user.actions";
import { SearchBar } from "./SearchBar";

export function AppHeader() {
  const user = useSelector((storeState) => storeState.userModule.user);
  const navigate = useNavigate();

  async function onLogout() {
    try {
      await logout();
      navigate("/");
      showSuccessMsg("Bye now");
    } catch (err) {
      showErrorMsg("Cannot logout");
    }
  }

  return (
    <header className="app-header full">
      <nav>
        {/* LEFT */}
        <div className="nav-left">
          <NavLink to="/" className="logo">
            E2E Demo
          </NavLink>
          <NavLink to="about">About</NavLink>
          <NavLink to="station">Stations</NavLink>
          <NavLink to="chat">Chat</NavLink>
          <NavLink to="review">Review</NavLink>
          {user?.isAdmin && <NavLink to="/admin">Admin</NavLink>}
        </div>

        {/* CENTER */}
        <div className="nav-center">
          <SearchBar />
        </div>

        {/* RIGHT */}
        <div className="nav-right">
          {!user && (
            <NavLink to="login" className="login-link">
              Login
            </NavLink>
          )}

          {user && (
            <div className="user-info">
              <Link to={`user/${user._id}`}>{user.fullname}</Link>
              <button onClick={onLogout}>logout</button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
