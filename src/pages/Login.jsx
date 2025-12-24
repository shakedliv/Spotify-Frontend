import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../store/actions/user.actions";

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
    if (!credentials.username || !credentials.password) return;
    await login(credentials);
    navigate("/");
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

      <button type="button" className="social-btn google">
        Continue with Google
      </button>

      <button type="button" className="social-btn facebook">
        Continue with Facebook
      </button>

      <button type="button" className="social-btn apple">
        Continue with Apple
      </button>
    </form>
  );
}

// import { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'

// import { userService } from '../services/user'
// import { login } from '../store/actions/user.actions'

// export function Login() {
//     const [users, setUsers] = useState([])
//     const [credentials, setCredentials] = useState({ username: '', password: '', fullname: '' })

//     const navigate = useNavigate()

//     useEffect(() => {
//         loadUsers()
//     }, [])

//     async function loadUsers() {
//         const users = await userService.getUsers()
//         setUsers(users)
//     }

//     async function onLogin(ev = null) {
//         if (ev) ev.preventDefault()

//         if (!credentials.username) return
//         await login(credentials)
//         navigate('/')
//     }

//     function handleChange(ev) {
//         const field = ev.target.name
//         const value = ev.target.value
//         setCredentials({ ...credentials, [field]: value })
//     }

//     return (
//         <form className="login-form" onSubmit={onLogin}>
//             <select
//                 name="username"
//                 value={credentials.username}
//                 onChange={handleChange}>
//                 <option value="">Select User</option>
//                 {users.map(user => <option key={user._id} value={user.username}>{user.fullname}</option>)}
//             </select>
//             <button>Login</button>
//         </form>
//     )
// }
