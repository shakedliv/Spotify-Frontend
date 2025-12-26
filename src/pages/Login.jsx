import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../store/actions/user.actions";
import { GoogleIcon } from '../assets/svg/GoogleIcon';
import { FacebookIcon } from '../assets/svg/FacebookIcon';
import { AppleIcon } from '../assets/svg/AppleIcon';
import { GoogleOAuthButton } from "../cmps/GoogleOAuthButton";
import { showErrorMsg } from '../services/event-bus.service';

export function Login() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  function handleChange(ev) {
    const { name, value } = ev.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  }

  async function onLogin(ev) {
     ev.preventDefault();
     ev.stopPropagation()
    if (!credentials.username || !credentials.password) return;
     try {
        await login(credentials);
        console.log('Login successful, navigating...')
        navigate("/");
     } catch (err) {
        showErrorMsg('Username or password incorrect')
        return
        
     }
  }

  return (
    <form className="login-form" onSubmit={onLogin}>
      <h1>Welcome back</h1>

      <input
        type="text"
        name="username"
        placeholder="Username"
        value={credentials.username}
        onChange={handleChange}
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={credentials.password}
        onChange={handleChange}
        required
      />

      <button className="login-btn">Log in</button>

      <div className="login-divider">
        <span>or</span>
      </div>

      <GoogleOAuthButton />

      {/* <button type="button" className="social-btn google">
        Continue with Google
      </button> */}

      <button type="button" className="social-btn facebook ">
       <FacebookIcon/>  Continue with Facebook
      </button>

      <button type="button" className="social-btn apple">
       <AppleIcon/> Continue with Apple
      </button>
    </form>
  );
}
