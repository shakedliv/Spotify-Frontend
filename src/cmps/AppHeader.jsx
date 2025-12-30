import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";

import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import { logout } from "../store/actions/user.actions";

import { SpotifyLogo } from "../assets/svg/SpotifyLogo.jsx";
import { HomeIcon } from "../assets/svg/HomeIcon.jsx";
import { HomeIconActive } from "../assets/svg/HomeIconActive.jsx";
import { SearchBar } from "./SearchBar";

export function AppHeader() {
  const user = useSelector((storeState) => storeState.userModule.user);
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const hasSearchQuery = !!searchParams.get("q");
  const isHome = location.pathname === "/" && !hasSearchQuery;

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const avatarRef = useRef(null);

  async function onLogout() {
    try {
      await logout();
      setIsUserMenuOpen(false);
      navigate("/");
      showSuccessMsg("Logged out successfully");
    } catch (err) {
      showErrorMsg("Cannot logout");
    }
  }

  useEffect(() => {
    function handleClickOutside(ev) {
      if (avatarRef.current && !avatarRef.current.contains(ev.target)) {
        setIsUserMenuOpen(false);
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
          <button
            className="logo-btn"
            onClick={() => navigate("/")}
            aria-label="Go to home"
          >
            <SpotifyLogo />
          </button>{" "}
        </div>

        <div className="nav-center">
          <div className="nav-center-inner">
            <button
              className="home-btn"
              aria-label="Home"
              onClick={() => navigate("/")}
            >
              {isHome ? <HomeIconActive /> : <HomeIcon />}
            </button>

            <SearchBar />
          </div>
        </div>

        <div className="nav-right">
          {user && (
            <div className="user-popover" ref={avatarRef}>
              <button
                className="user-avatar-outer"
                onClick={() => setIsUserMenuOpen((prev) => !prev)}
              >
                <div className="user-avatar-inner">{userInitial}</div>
              </button>

              {isUserMenuOpen && (
                <div className="logout-popover">
                  <button className="logout-btn" onClick={onLogout}>
                    Log out
                  </button>

                  <button
                    className="cancel-btn"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          )}

          {!user && (
            <>
              <NavLink to="/login/signup" className="signup-link">
                Sign up
              </NavLink>

              <NavLink to="/login" className="login-link login-pill">
                Log in
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
