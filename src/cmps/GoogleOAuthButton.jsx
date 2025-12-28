import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userService } from "../services/user";
import { SET_USER } from "../store/reducers/user.reducer";
import { showErrorMsg } from "../services/event-bus.service";

export function GoogleOAuthButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleSuccess(credentialResponse) {
    try {
      const user = await userService.loginWithGoogle(
        credentialResponse.credential
      );

      if (user) {
        dispatch({ type: SET_USER, user });
        navigate("/");
      }
    } catch (err) {
      console.error("Google login failed", err);
      showErrorMsg("Google login failed. Please try again.");
    }
  }

  function handleError() {
    console.error("Google login failed");
    showErrorMsg("Google login failed. Please try again.");
  }
  return (
    <div className="google-oauth-btn">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        useOneTap={false}
      />
    </div>
  );
}
