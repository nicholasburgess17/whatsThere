import React, { useEffect, useState } from "react";
import Map from "./components/Map/Map";
import Header from "./components/Header/Header";
import Planner from "./components/Planner/planner";
// import DatePickerCalender from "./components/Date-Picker/Date-Picker";
import { CssBaseline, Grid } from "@mui/material";
import { getAttractions } from "./components/Map/getAttractions";
import axios from "axios";
import LandingPage from "./components/Welcome/landingPage";
// import Login from "./components/Welcome/login";
import jwt_decode from "jwt-decode";

export default function App() {
  const [items, setItems] = useState([]);
  const [attractions, setAttractions] = useState([]);
  const [attraction, setAttraction] = useState();
  const [coords, setCoords] = useState({});
  const [bounds, setBounds] = useState({});
  const [user, setUser] = useState({});
  const [data, setData] = useState();

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
    if (attraction) {
      axios.put("/api/attractions", attraction);
      axios.get("/api/attractions").then((res) => {
        setItems(res.data);
      });
    }
  }, [attraction]);

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

  //login  and user tracking
  const handleCallbackResponse = (response) => {
    // response.credential is an encoded jwt
    const userObj = jwt_decode(response.credential);
    setUser(userObj); // decoded jwt object

    const userData = {
      email: user.email,
      name: user.name,
    };
    setData(userData);
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
    if (data) {
      axios.put("/api/users", data);
    }
  }, [data]);

  return (
    <div>
      {Object.keys(user).length === 0 && (
        <div>
          <LandingPage />
        </div>
      )}
      {Object.keys(user).length !== 0 && (
        <div className="bg-gray-300">
          <CssBaseline />
          <Grid container spacing={1.5} item xs={12}>
            <Grid className="flex-col" item xs={12} md={4}>
              <Grid className="flex-col">
                <Header />
              </Grid>
              <Grid>
                <Planner items={items} setItems={setItems} />
              </Grid>
              <Grid>
                <button
                  onClick={handleSignOut}
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                >
                  Sign out
                </button>
              </Grid>
              <Grid className="flex-col">{/* <DatePickerCalender /> */}</Grid>
            </Grid>
            <Grid item xs={12} md={8}>
              <Map
                setCoords={setCoords}
                setBounds={setBounds}
                coords={coords}
                attractions={attractions}
                setAttraction={setAttraction}
              />
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
}
