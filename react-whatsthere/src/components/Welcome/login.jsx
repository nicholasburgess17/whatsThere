import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { Helmet } from "react-helmet";
import axios from "axios";

const Login = () => {
  const [user, setUser] = useState({});
  const [userData, setUserData] = useState();

  const handleCallbackResponse = (response) => {
    // response.credential is an encoded jwt
    const userObj = jwt_decode(response.credential);
    setUser(userObj); // decoded jwt object

    const userData = {
      email: userObj.email,
      name: userObj.name,
    };
    setUserData(userData);
  };

  const handleSignOut = () => {
    setUser({});
    google.accounts?.id.prompt();
  };

  useEffect(() => {
    // global google
    google.accounts?.id.initialize({
      client_id:
        "632068121299-unggfu717fg5kklshvbmn1kl6s6nl9ue.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts?.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });

    // prompts users to login with usual accounts (oneTap login)
    if (Object.keys(user)) {
      google.accounts?.id.prompt();
    }
  }, []);

  useEffect(() => {
    if (userData) {
      axios.put("/api/users", userData);
    }
  }, [userData]);

  return (
    <div>
      <Helmet>
        <script
          src="https://accounts.google.com/gsi/client"
          async
          defer
        ></script>
      </Helmet>
      {Object.keys(user).length === 0 && 
      <div id="signInDiv"></div>}
      {Object.keys(user).length !== 0 && (
        <div>
          <button
            onClick={handleSignOut}
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
