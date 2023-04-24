import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrash,
  faMapLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
// import { id } from "date-fns/locale";

export default function Planner({ items, setItems }) {
  const [editingIndex, setEditingIndex] = useState(-1);
  const [newTitle, setNewTitle] = useState("");
  const [newTime, setNewTime] = useState("");

  const handleEditClick = (index) => {
    setEditingIndex(index);
  };

  const handleSaveClick = (index, newTitle, newTime) => {
    const newItems = [...items];
    newItems[index] = { title: newTitle, time: newTime };
    setItems(newItems);
    setEditingIndex(-1);
  };

  const handleCancelClick = () => {
    setEditingIndex(-1);
    setNewTitle("");
    setNewTime("12:00pm");
  };

  const handleDeleteClick = (id) => {
    axios
      .delete(`/api/attractions/${id}`)
      .then((res) => axios.get("/api/attractions"))
      .then((res) => setItems(res.data))
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAddClick = () => {
    setEditingIndex(null);
    setNewTitle("");
    setNewTime("12:00pm");
  };

  const handleNewTitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const handleNewTimeChange = (event) => {
    setNewTime(event.target.value);
  };

  const handleNewSaveClick = () => {
    const newItems = [...items, { title: newTitle, time: newTime }];
    setItems(newItems);
    setEditingIndex(-1);
    setNewTitle("");
    setNewTime("12:00pm");
  };

  return (
    <div className="h-[100%]">
      <div className="bg-tertiary text-white text-lg flex justify-between px-2">
        <div>Locations to Visit</div>
        <div>Edit/Delete</div>
      </div>
      <ul className="h-[35vh] overflow-y-auto">
        {items.map((item, index) => (
          <li key={index}>
            {editingIndex === index ? (
              <div>
                <input
                  type="text"
                  value={newTitle}
                  onChange={handleNewTitleChange}
                />
                <input
                  type="time"
                  value={newTime}
                  onChange={handleNewTimeChange}
                />
                <button
                  onClick={() => handleSaveClick(index, newTitle, newTime)}
                >
                  Save
                </button>
                <button onClick={handleCancelClick}>Cancel</button>
              </div>
            ) : (
              <div className="bg-secondary flex justify-between">
                <div className="text-white px-2 py-2">
                  <div className="flex justify-between text-xl font-semibold">
                    <span>{item.name}</span>
                  </div>
                  <div className="text-m">
                    <span>{item.address}</span>
                  </div>
                  <div className="text-m">
                    <span>{item.startTime}</span>
                  </div>
                  <div className="text-">
                    <span>{item.endTime}</span>
                  </div>
                </div>
                <div className="space-x-4 px-4 py-2">
                  <button onClick={() => handleEditClick(index)}>
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      size="lg"
                      color="white"
                    />
                  </button>
                  <button onClick={() => handleDeleteClick(item.id)}>
                    <FontAwesomeIcon icon={faTrash} size="lg" />
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
      {editingIndex === null && (
        <div className="flex flex-row justify-between text-xl space-x-2">
          <div className="flex flex-row space-x-2 w-[100%]">
            <div className="border-double border-2 border-black p-2 rounded-md w-[100%]">
              <input
                type="text"
                value={newTitle}
                onChange={handleNewTitleChange}
                placeholder="Enter new location here"
                className="w-[100%]"
              />
            </div>
            <div className="border-double border-2 border-black p-2 rounded-md">
              <input
                type="time"
                value={newTime}
                onChange={handleNewTimeChange}
              />
            </div>
          </div>
          <div className="flex flex-row space-x-2">
            <div className="border-double border-2 border-black rounded-md p-2 font-bold bg-green-400">
              <button onClick={handleNewSaveClick}>Save</button>
            </div>
            <div className="border-double border-2 border-black rounded-md p-2 font-bold bg-red-600">
              <button onClick={handleCancelClick}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      {editingIndex && (
        <button
          onClick={handleAddClick}
          className="bg-gray-400 text-lg font-semibold p-2 "
        >
          Add Location <FontAwesomeIcon icon={faMapLocationDot} size="lg" />
        </button>
      )}
    </div>
  );
}
