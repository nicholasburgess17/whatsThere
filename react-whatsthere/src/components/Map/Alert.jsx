import React, { useEffect, useState } from "react";
import { compare } from "./helper/compare";
import Swal from "sweetalert2";
import axios from "axios";

export default function Alert({ items, setItems }) {
  const [sortTimeArray, setSortTimeArray] = useState([]);
  let array = [];
  let sortArray = [];

  const handleAlert = (sortTimeArray) => {
    const oneHour = 1000 * 60 * 60;
    let results = [];
    let names = "";
    let timeDif = 1000 * 60 * 70;

    if (sortTimeArray.length !== 0) {
      const nextComingitems = sortTimeArray.filter(
        (i) => i.startTime - Date.now() <= oneHour
      );

      for (let i of nextComingitems) {
        let [filterItem] = items.filter((j) => j.id === i.id);
        results.push(filterItem);
      }

      results.forEach((i) => {
        names += `${i.name}, `;
      });
      names = names.substring(0, names.length - 2);
      timeDif = sortTimeArray[0].startTime - Date.now();
      console.log(timeDif);

      if (timeDif < oneHour && timeDif > 0) {
        const alertMessage = `You are going to visit: \n${names} in ${Math.ceil(
          timeDif / 60000
        )} minutes`;
        console.log(alertMessage);
        Swal.fire({
          title: "Get Ready!",
          text: alertMessage,
          icon: "info",
          confirmButtonText: "Got it!",
        });
      }
      if (timeDif < 0) {
        if (sortTimeArray.length > 0) {
          axios
            .delete(`/api/attractions/${sortTimeArray[0].id}`)
            .then((res) => axios.get("/api/attractions"))
            .then((res) => setItems(res.data))
            .catch((error) => {
              console.log(error);
            });
        }
      }
    }
  };

  useEffect(() => {
    console.log(items);
    if (items.length !== 0) {
      items.forEach((i) => {
        const startTime = new Date(i.startTime).getTime();
        const id = i.id;
        array.push({ startTime, id });
      });
      sortArray = array.sort(compare);
      setSortTimeArray(sortArray);
    } else {
      setSortTimeArray([]);
    }
  }, [items]);

  useEffect(() => {
    const interval = setInterval(() => {
      handleAlert(sortTimeArray);
    }, 60000);
    return () => clearInterval(interval);
  }, [sortTimeArray]);

  return <div></div>;
}
