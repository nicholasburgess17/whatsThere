import React, { useEffect, useState } from "react";
import Map from "./components/Map/Map";
import Header from "./components/Header/Header";
import Planner from "./components/Planner/planner";
import DatePickerCalender from "./components/Date-Picker/Date-Picker";
import Login from "./components/Welcome/login" 
import { CssBaseline, Grid } from "@mui/material";
import { getAttractions } from "./components/Map/getAttractions";
import axios from "axios";

export default function App() {
  const [items, setItems] = useState([]);
  const [attractions, setAttractions] = useState([]);
  const [attraction, setAttraction] = useState();
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
    if (attraction) {
      axios.put("/api/attractions", attraction);
      axios.get('/api/attractions')
        .then(res => { setItems(res.data) })
    }
  }, [attraction]);

  useEffect(() => {
    axios.get('/api/attractions')
      .then(res => { setItems(res.data) })
      .catch(err => { console.log(err) })
  }, [])

  return (
    <div className="bg-gray-300">
      <CssBaseline />
      <Grid container spacing={1.5} item xs={12}>
        <Grid className="flex-col" item xs={12} md={4}>
          <Grid className="flex-col">
            <Header />
          </Grid>
          <Grid>
            <Planner
              items={items}
              setItems={setItems}
            />
          </Grid>
          {/* <Grid>
            <Login />
          </Grid> */}
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
            setAttraction={setAttraction}
          />
        </Grid>
      </Grid>
    </div>
  );
}
