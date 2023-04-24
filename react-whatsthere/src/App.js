import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import Map from "./components/Map/Map";
import Header from "./components/Header/Header";
import Planner from "./components/Planner/planner";
// import Login from "./components/Welcome/login";
import { CssBaseline, Grid } from "@mui/material";
import { getAttractions } from "./components/Map/getAttractions";
import axios from "axios";
import Adding from "./components/Map/Adding-Attractions";
import Alarm from "./components/Map/Alarm";

export default function App() {
  const [items, setItems] = useState([]);
  const [attractions, setAttractions] = useState([]);
  const [attraction, setAttraction] = useState("");
  const [coords, setCoords] = useState({});
  const [bounds, setBounds] = useState({});
  const [attractionInfoShown, setAttractionInfoShown] = useState(false);
  const [display, setDisplay] = useState("invisible");
  const [data, setData] = useState();

  //login states
  const [user, setUser] = useState({});
  const [userData, setUserData] = useState();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((e) => {
      setCoords({ lat: e.coords.latitude, lng: e.coords.longitude });
      setBounds({
        ne: { lat: e.coords.latitude + 0.05, lng: e.coords.longitude + 0.1 },
        sw: { lat: e.coords.latitude - 0.05, lng: e.coords.longitude - 0.1 },
      });
    });
  }, []);

  useEffect(() => {
    if (bounds.ne && bounds.sw) {
      getAttractions(bounds.ne, bounds.sw).then((data) => {
        setAttractions(data);
      });
    }
  }, [coords, bounds]);

  useEffect(() => {
    if (data) {
      axios.put("/api/attractions", data);
      axios.get("/api/attractions").then((res) => {
        setItems(res.data);
      });
    }
  }, [data]);

  useEffect(() => {
    axios
      .get("/api/attractions")
      .then((res) => {
        setItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //Login Functions
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

  //Login
  useEffect(() => {
    // global google
    google.accounts?.id.initialize({
      client_id:
        "632068121299-unggfu717fg5kklshvbmn1kl6s6nl9ue.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    // google.accounts.id.renderButton(document.getElementById("signInDiv"), {
    //   theme: "outline",
    //   size: "large",
    // });

    // prompts users to login with usual accounts (oneTap login)
    if (Object.keys(user)) {
      google.accounts?.id.prompt();
    }
  }, []);

  //login communication to DB
  useEffect(() => {
    if (userData) {
      axios.put("/api/users", userData);
    }
  }, [userData]);

  return (
    <main className="bg-gray-300">
      <CssBaseline />
      <Grid container spacing={1.5} item xs={12}>
        <Grid className="flex-col" item xs={12} md={4}>
          <Header />

          <Planner items={items} setItems={setItems} />

          {/* <Login /> */}
          {Object.keys(user).length === 0 && <div id="signInDiv"></div>}
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
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoords={setCoords}
            setBounds={setBounds}
            coords={coords}
            attraction={attraction}
            attractions={attractions}
            setAttraction={setAttraction}
            attractionInfoShown={attractionInfoShown}
            setAttractionInfoShown={setAttractionInfoShown}
            setDisplay={setDisplay}
          />
          <div className="flex justify-center">
            <div className={display}>
              <Adding
                attraction={attraction}
                setDisplay={setDisplay}
                setData={setData}
              />
              <Alarm items={items} />
            </div>
          </div>
        </Grid>
      </Grid>
    </main>
  );
}
