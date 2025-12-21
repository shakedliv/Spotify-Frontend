import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import { logout } from "../store/actions/user.actions";
import { SpotifyLogo } from "../assets/svg/SpotifyLogo.jsx";
import { HomeIcon } from "../assets/svg/HomeIcon.jsx";

import { SearchBar } from "./SearchBar";
export function AppHeader() {
  const user = useSelector((storeState) => storeState.userModule.user);
  const navigate = useNavigate();
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const avatarRef = useRef();
  async function onLogout() {
    try {
      await logout();
      setIsLogoutOpen(false);
      navigate("/");
      showSuccessMsg("Bye now");
    } catch (err) {
      showErrorMsg("Cannot logout");
    }
  }
  useEffect(() => {
    function handleClickOutside(ev) {
      if (avatarRef.current && !avatarRef.current.contains(ev.target)) {
        setIsLogoutOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const userInitial = user?.fullname?.charAt(0).toUpperCase();
  return (
    <header className="app-header full">
      <nav>
        <div className="nav-left">
          <SpotifyLogo />
        </div>

        <div className="nav-center">
          <button
            className="home-btn"
            aria-label="Home"
            onClick={() => navigate("/")}
          >
            <HomeIcon />
          </button>
          <SearchBar />
        </div>
        <div className="nav-right">
          {user && (
            <div className="user-popover" ref={avatarRef}>
              <button
                className="user-avatar-outer"
                onClick={() => setIsLogoutOpen(!isLogoutOpen)}
              >
                <div className="user-avatar-inner">{userInitial}</div>
              </button>

              {isLogoutOpen && (
                <div className="logout-popover">
                  <button className="logout-btn" onClick={onLogout}>
                    Log out
                  </button>
                  <button
                    className="cancel-btn"
                    onClick={() => setIsLogoutOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          )}
          {!user && (
            <NavLink to="login" className="login-link login-pill">
              Log in
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  );
}
