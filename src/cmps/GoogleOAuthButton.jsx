import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";

import { SET_USER } from "../store/reducers/user.reducer";

export function GoogleOAuthButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSuccess(credentialResponse) {
    const googleUser = jwtDecode(credentialResponse.credential);

    const user = {
      _id: googleUser.sub,
      username: googleUser.email,
      fullname: googleUser.name,
      password: "google-oauth",
      likedSongs: [],
      userStations: [],
    };

    dispatch({ type: SET_USER, user });
    navigate("/");
  }

  function handleError() {
    console.error("Google login failed");
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
