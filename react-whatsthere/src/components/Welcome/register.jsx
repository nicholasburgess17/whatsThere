// import { Helmet } from "react-helmet";
import { useEffect } from "react";

const Register = (props) => {
    useEffect(() => {
        google.accounts?.id.initialize({
            client_id:
              "632068121299-unggfu717fg5kklshvbmn1kl6s6nl9ue.apps.googleusercontent.com",
            callback: props.handleCallbackResponse,
          });
    })
  return (
    <div>
      <div id="signInDiv"></div>
    </div>
  );
};

export default Register