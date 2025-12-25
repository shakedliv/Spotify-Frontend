import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../store/actions/user.actions";
import { userService } from "../services/user";
import { AppleIcon } from '../assets/svg/AppleIcon';
import { FacebookIcon } from '../assets/svg/FacebookIcon';
import { GoogleIcon } from '../assets/svg/GoogleIcon';

export function Signup() {
  const [credentials, setCredentials] = useState(userService.getEmptyUser());
  const navigate = useNavigate();

  function handleChange(ev) {
    const { name, value } = ev.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  }

  async function onSignup(ev) {
    ev.preventDefault();
    const { fullname, username, password } = credentials;
    if (!fullname || !username || !password) return;
    await signup(credentials);
    navigate("/");
  }

  return (
    <form className="signup-form" onSubmit={onSignup}>
      <h1>Sign up to start listening</h1>

      <input
        type="text"
        name="fullname"
        placeholder="Full name"
        value={credentials.fullname}
        onChange={handleChange}
        required
      />

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

      <button className="signup-btn">Sign up</button>

      <div className="signup-divider">
        <span>or</span>
      </div>

      <button type="button" className="social-btn google ">
        <GoogleIcon /> Continue with Google
      </button>

      <button type="button" className="social-btn apple">
       <AppleIcon/> Continue with Apple
      </button>
    </form>
  );
}

// import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'

// import { signup } from '../store/actions/user.actions'

// import { ImgUploader } from '../cmps/ImgUploader'
// import { userService } from '../services/user'

// export function Signup() {
//     const [credentials, setCredentials] = useState(userService.getEmptyUser())
//     const navigate = useNavigate()

//     function clearState() {
//         setCredentials({ username: '', password: '', fullname: '', imgUrl: '' })
//     }

//     function handleChange(ev) {
//         const type = ev.target.type

//         const field = ev.target.name
//         const value = ev.target.value
//         setCredentials({ ...credentials, [field]: value })
//     }

//     async function onSignup(ev = null) {
//         if (ev) ev.preventDefault()

//         if (!credentials.username || !credentials.password || !credentials.fullname) return
//         await signup(credentials)
//         clearState()
//         navigate('/')
//     }

//     function onUploaded(imgUrl) {
//         setCredentials({ ...credentials, imgUrl })
//     }

//     return (
//         <form className="signup-form" onSubmit={onSignup}>
//             <input
//                 type="text"
//                 name="fullname"
//                 value={credentials.fullname}
//                 placeholder="Fullname"
//                 onChange={handleChange}
//                 required
//             />
//             <input
//                 type="text"
//                 name="username"
//                 value={credentials.username}
//                 placeholder="Username"
//                 onChange={handleChange}
//                 required
//             />
//             <input
//                 type="password"
//                 name="password"
//                 value={credentials.password}
//                 placeholder="Password"
//                 onChange={handleChange}
//                 required
//             />
//             <ImgUploader onUploaded={onUploaded} />
//             <button>Signup</button>
//         </form>
//     )
// }
