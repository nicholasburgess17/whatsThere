import { useState, useEffect } from "react";
import axios from "axios";

const URL = "http://localhost:3000/api/attractions"
const URL2 = "https://jsonplaceholder.typicode.com/users"

export default function GetListData() {
  
  const [listItems, setListItems] = useState([]);

  useEffect(() => {
    axios.get(URL)
    .then(res => {setListItems(res.data)})
    .catch(err => {console.log(err)})
  }, [])

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tBody>
          {listItems.map((r, item) => (
            <tr key={item.id}>
            <th>{r.id}</th>
            <th>{r.name}</th>
            </tr>
          ))}
        </tBody>
      </table>
    </div>
  );


  

//   useEffect(() => {
//     await axios
//       .get(URL)
//       .then((res) => {
//         setListItems(res.data);
//         console.log(res.data)
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);
}