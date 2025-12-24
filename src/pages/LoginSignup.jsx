import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";
import { SpotifyLogo } from "../assets/svg/SpotifyLogo.jsx";

export function LoginSignup() {
  const navigate = useNavigate();
  const location = useLocation();

  const isSignup = location.pathname.includes("signup");

  return (
    <section className="auth-layout">
      <div className="auth-logo">
        <button
          className="logo-btn"
          onClick={() => navigate("/")}
          aria-label="Go to home"
        >
          <SpotifyLogo />
        </button>
      </div>

      <div className="auth-content">
        <Outlet />
      </div>

      <div className="auth-footer">
        {isSignup ? (
          <p>
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        ) : (
          <p>
            Don’t have an account? <Link to="/login/signup">Sign up</Link>
          </p>
        )}
      </div>
    </section>
  );
}

// import { Outlet } from 'react-router-dom'
// import { NavLink } from 'react-router-dom'

// export function LoginSignup() {
//     return (
//         <div className="login-page">
//             <nav>
//                 <NavLink to=".">Login</NavLink>
//                 <NavLink to="signup">Signup</NavLink>
//             </nav>
//             <Outlet/>
//         </div>
//     )
// }
