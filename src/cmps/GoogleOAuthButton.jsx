import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { userService } from "../services/user";
import { SET_USER } from "../store/reducers/user.reducer";
import { showErrorMsg } from "../services/event-bus.service";
import { GoogleIcon } from "../assets/svg/GoogleIcon";

export function GoogleOAuthButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = useGoogleLogin({
    flow: "implicit",
    onSuccess: async (response) => {
      try {
        const user = await userService.loginWithGoogle(response.id_token);

        if (user) {
          dispatch({ type: SET_USER, user });
          navigate("/");
        }
      } catch (err) {
        console.error("Google login failed", err);
        showErrorMsg("Google login failed. Please try again.");
      }
    },
    onError: () => {
      showErrorMsg("Google login failed. Please try again.");
    },
  });

  return (
    <button type="button" className="social-btn google" onClick={() => login()}>
      <GoogleIcon />
      Continue with Google
    </button>
  );
}
