import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom'
import { SpotifyLogo } from '../assets/svg/SpotifyLogo.jsx'

export function LoginSignup() {
    const navigate = useNavigate()
    const location = useLocation()

    const isSignup = location.pathname.includes('signup')

    return (
        <section className='auth-layout'>
            <div className='auth-logo'>
                <button
                    className='logo-btn'
                    onClick={() => navigate('/')}
                    aria-label='Go to home'
                >
                    <SpotifyLogo />
                </button>
            </div>

            <div className='auth-content'>
                <Outlet />

                <div className='auth-footer'>
                    {isSignup ? (
                        <section className='login-signup-link'>
                            <p>Already have an account? </p>
                            <p>
                                <Link to='/login'>Log in</Link>
                            </p>
                        </section>
                    ) : (
                        <section className='login-signup-link'>
                            <p>Don’t have an account?</p>
                            <p>
                                <Link to='/login/signup'>Sign up</Link>
                            </p>
                        </section>
                    )}
                </div>
            </div>
            <p className='credits'>
                This site is protected by reCAPTCHA and the Google <span>Privacy
                Policy</span> and <span>Terms of Service</span> apply.
            </p>
        </section>
    )
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
