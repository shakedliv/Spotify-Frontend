import { Link, NavLink, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { logout } from "../store/actions/user.actions"
import { SearchBar } from "./SearchBar"

import HomeIcon from "@mui/icons-material/Home"

export function AppHeader() {
  const user = useSelector((storeState) => storeState.userModule.user)
  const navigate = useNavigate()

  async function onLogout() {
    try {
      await logout()
      navigate("/")
      showSuccessMsg("Bye now")
    } catch (err) {
      showErrorMsg("Cannot logout")
    }
  }

  const userInitial = user?.fullname?.charAt(0).toUpperCase()

  return (
    <header className="app-header full">
      <nav>
        <div className="nav-left">
          {/* <NavLink to="/" className="logo">
            E2E Demo
          </NavLink> */}


          {/*
          <NavLink to="chat">Chat</NavLink>
          <NavLink to="review">Review</NavLink>
          {user?.isAdmin && <NavLink to="/admin">Admin</NavLink>}
          */}
        </div>

        <div className="nav-center">
          <button className="home-btn" aria-label="Home">
            <HomeIcon onClick={() => navigate("/")} />
          </button>
          <SearchBar />
        </div>

        <div className="nav-right">
          {user && (
            <>
              <div className="user-avatar-outer">
                <div className="user-avatar-inner">{userInitial}</div>
              </div>
              <button onClick={onLogout}>Logout</button>

              {user.isAdmin && <NavLink to="/admin">Admin</NavLink>}

              {/*
              <Link to={`user/${user._id}`}>{user.fullname}</Link>
              */}
            </>
          )}

          {!user && (
            <NavLink to="login" className="login-link">
              Login
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  )
}
