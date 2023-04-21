import React, { useEffect, useState } from "react";
import Map from "./components/Map/Map";
import Header from "./components/Header/Header";
import Planner from "./components/Planner/planner";
// import DatePickerCalender from "./components/Date-Picker/Date-Picker";

import { CssBaseline, Grid } from "@mui/material";
import { getAttractions } from "./components/Map/getAttractions";
// import GetListData from "./components/Planner/GetListData";

//to be moved to homepage 
import Login from "./components/Welcome/login";
// import {useEffect} from 'react';
import { gapi } from 'gapi-script';
const clientId = "632068121299-unggfu717fg5kklshvbmn1kl6s6nl9ue.apps.googleusercontent.com"



export default function App() {
  const [attractions, setAttractions] = useState([]);
  const [coords, setCoords] = useState({});
  const [bounds, setBounds] = useState({});

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
    function start(){
      gapi.client.init({
        client_id: clientId,
        scope: ""
      })
    };
    gapi.load('client:auth2', start)
  })

  return (
    <div className="bg-gray-300">
      <CssBaseline />
      <Grid container spacing={1.5} item xs={12}>
        <Grid className="flex-col" item xs={12} md={4}>
          <Grid className="flex-col">
            <Header />
          </Grid>
          <Grid>
            <Planner />
            {/* <GetListData /> */}
          </Grid>
          {/* if not logged in, show login component, else show users name*/}
          <Grid>
            <Login/>
          </Grid>
          
          <Grid className="flex-col">
            {/* <DatePickerCalender /> */}
          </Grid>
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoords={setCoords}
            setBounds={setBounds}
            coords={coords}
            attractions={attractions}
          />
        </Grid>
      </Grid>
    </div>
  );
}
