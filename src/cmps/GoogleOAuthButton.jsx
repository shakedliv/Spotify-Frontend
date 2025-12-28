import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { userService } from "../services/user";
import { SET_USER } from "../store/reducers/user.reducer";
import { showErrorMsg } from "../services/event-bus.service";
import { GoogleIcon } from "../assets/svg/GoogleIcon";

export function GoogleOAuthButton() {
  const googleBtnRef = useRef(null);
  const initializedRef = useRef(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (initializedRef.current) return;
    if (!window.google || !googleBtnRef.current) return;

    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleGoogleResponse,
    });

    google.accounts.id.renderButton(googleBtnRef.current, {
      theme: "outline",
      size: "large",
    });

    initializedRef.current = true;
  }, []);

  async function handleGoogleResponse(response) {
    try {
      const user = await userService.loginWithGoogle(response.credential);
      if (!user) return;

      dispatch({ type: SET_USER, user });
      navigate("/");
    } catch (err) {
      console.error("Google login failed", err);
      showErrorMsg("Google login failed. Please try again.");
    }
  }

  function handleClick() {
    const btn = googleBtnRef.current?.querySelector("div[role=button]");
    btn?.click();
  }

  return (
    <>
      <button type="button" className="social-btn google" onClick={handleClick}>
        <GoogleIcon />
        Continue with Google
      </button>

      <div ref={googleBtnRef} style={{ display: "none" }} />
    </>
  );
}
