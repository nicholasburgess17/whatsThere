import { useState, useEffect, useRef } from "react";
import Dropdown from "./Dropdown";
import axios from "axios";

export default function CreateList({
  userId,
  showMenu,
  SetShowMenu,
  selectedList,
  setSelecteList,
  searchName,
  setSearchName,
  lists,
  setLists,
  setItems,
}) {
  const [name, setName] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleNameChange = (event) => {
    setName(event.target.value);
    setSelecteList();
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const newList = {
      name: name,
      userId: userId,
    };
    axios
      .post(`/api/lists`, newList)
      .then((res) => {
        setName("");
        axios.put("/api/lists", { userId }).then((res) => {
          console.log(res.data);
          setLists(res.data);
          const displayList = res.data[res.data.length - 1];
          setSelecteList(displayList);
        });
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Dropdown
        searchable
        placeHolder={"Select a Trip"}
        userId={userId}
        setLists={setLists}
        lists={lists}
        showMenu={showMenu}
        SetShowMenu={SetShowMenu}
        selectedList={selectedList}
        setSelecteList={setSelecteList}
        searchName={searchName}
        setSearchName={setSearchName}
        setItems={setItems}
      />
      <div className="flex flex-col bg-tertiary/90 p-1 text-lg">
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-row justify-between "
        >
          <label>
            <strong>New Trip: </strong>
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              ref={inputRef}
              className="rounded-sm"
            />
          </label>
          <button
            type="submit"
            className="bg-primary hover:bg-slate-900 font-bold rounded-md py-1 px-2 text-sm text-slate-200"
          >
            Create Trip
          </button>
        </form>
      </div>
    </>
  );
}
