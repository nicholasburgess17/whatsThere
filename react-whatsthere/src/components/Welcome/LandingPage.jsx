import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";

// Components
import Features from "./Features";
import VideoPlayer from "./VideoPlayer";

export default function LandingPage({
  user,
  setUser,
  userData,
  setUserData,
  userPicture,
  setUserPicture,
  userId,
  setUserId,
}) {
  const handleCallbackResponse = (response) => {
    // response.credential is an encoded jwt
    const userObj = jwt_decode(response.credential);
    setUser(userObj); // decoded jwt object

    const userData = {
      email: userObj.email,
      name: userObj.name,
    };

    const userPic = {
      picture: userObj.picture,
    };

    setUserData(userData);
    setUserPicture(userPic);
  };

  const handleSignOut = () => {
    setUser({});
    setUserData({});
    setUserPicture({});
  };


  useEffect(() => {
    // global google
    if (Object.keys(user).length === 0) {
      google.accounts?.id.initialize({
        client_id:
          "632068121299-unggfu717fg5kklshvbmn1kl6s6nl9ue.apps.googleusercontent.com",
        callback: handleCallbackResponse,
        auto_select: true,
        cancel_on_tap_outside: false,
      });
    }
  }, [user]);

  google.accounts.id.renderButton(document.getElementById("signInDiv"), {
    theme: "filled_black",
    size: "large",
    shape: "pill",
    ux_mode: "redirect",
  });

  return (
    <div className="h-full">
      {/* top container with logo and login */}
      <div>
        <header className="flex items-center justify-between h-40 px-4 ">
          <div className="flex-1"></div>
          <div className="h-full flex items-center justify-center">
            <img src={logo} alt="logo" className="h-full" />
          </div>
          <div className="flex-1 flex justify-end">
            <div id='signInDiv'></div>
            {/* {Object.keys(user).length === 0 ? (
            ) : (
              <button
                onClick={handleSignOut}
                className="bg-tertiary hover:bg-secondary text-white font-bold py-2 px-4 rounded-full"
              >
                Sign Out
              </button>
            )} */}
          </div>
        </header>
        <Features />
      </div>
      <VideoPlayer />
      <div>

      </div>
    </div>
  );
}
