import React, { useEffect, useState, ReactFragment } from "react";
import { CssBaseline, Grid } from "@mui/material";
import axios from "axios";

// Components
import Map from "./components/Map/Map";
import Header from "./components/Header/Header";
import Planner from "./components/Planner/planner";
import Adding from "./components/Map/Adding-Attractions";
import Alert from "./components/Map/Alert";
import CreateList from "./components/Planner/CreateList";
import UserInfo from "./components/Users/UserInfo";
import LandingPage from "./components/Welcome/LandingPage";
import Logout from "./components/Users/Logout";

// Helpers / Hooks
import { getAttractions } from "./components/Map/helper/getAttractions";

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
  const [userData, setUserData] = useState({});
  const [userId, setUserId] = useState("");
  const [userPicture, setUserPicture] = useState();

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

  useEffect(() => {
    if (Object.keys(userData).length !== 0) {
      axios
        .get("/api/users")
        .then((res) => {
          const users = res.data;
          if (users.length !== 0) {
            const foundUser = users.filter((i) => i.email === userData.email);
            if (foundUser.length !== 0) {
              const ID = foundUser[0].id;
              setUserId(ID);
            } else {
              axios.put("/api/users", userData);
            }
          } else {
            axios.put("/api/users", userData);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userData]);

  return (
    <React.Fragment>
      {Object.keys(user).length === 0 && (
        <LandingPage
          user={user}
          setUser={setUser}
          userData={userData}
          setUserData={setUserData}
          userPicture={userPicture}
          setUserPicture={setUserPicture}
          userId={userId}
          setUserId={setUserId}
        />
      )}
      {Object.keys(user).length !== 0 && (
        <>
          <main className="bg-gray-300">
            <CssBaseline />
            <Grid container spacing={1.5} item xs={12}>
              <Grid className="flex-col" item xs={12} md={4}>
                <Header />
                <div>
                  <UserInfo userData={userData} userPicture={userPicture} />
                  <Logout
                    user={user}
                    setUser={setUser}
                    setUserData={setUserData}
                    setUserPicture={setUserPicture}
                  />
                </div>
                <CreateList userId={userId} />
                <Planner items={items} setItems={setItems} />
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
                    <Alert items={items} setItems={setItems} />
                  </div>
                </div>
              </Grid>
            </Grid>
          </main>
        </>
      )}
    </React.Fragment>
  );
}
