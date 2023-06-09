import axios from "axios";
import { useEffect, useRef } from "react";

const Icon = () => {
  return (
    <svg height="20" width="20" viewBox="0 0 20 20">
      <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
    </svg>
  );
};

export default function Dropdown({
  userId,
  placeHolder,
  setLists,
  lists,
  searchable,
  showMenu,
  SetShowMenu,
  selectedList,
  setSelecteList,
  searchName,
  setSearchName,
  setItems,
}) {
  const searchRef = useRef();

  const getDisplay = () => {
    if (selectedList) {
      return selectedList.name;
    }
    return placeHolder;
  };

  const OnItemClick = (list) => {
    setSelecteList(list);
  };

  //search handlers
  const onSearch = (e) => {
    setSearchName(e.target.value);
  };

  const getLists = () => {
    if (!searchName) {
      return lists;
    }
    return lists.filter(
      (list) => list.name.toLowerCase().indexOf(searchName.toLowerCase()) >= 0
    );
  };

  useEffect(() => {
    //this useEffect closes the menu when users click anywhere outside of the list
    const handler = () => SetShowMenu(false);
    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
  }, []);

  //this will utilize the previous useEffect to close the dropdown menu
  const handleInputClick = (e) => {
    e.stopPropagation();
    SetShowMenu(!showMenu);
  };

  //this use effect is for the search functionality of the dropdown menu
  useEffect(() => {
    setSearchName("");
    if (showMenu && searchRef.current) {
      searchRef.current.focus();
    }
  }, [showMenu]);

  const handleDeleteList = () => {
    const ID = selectedList.id;
    axios.delete(`/api/lists/${ID}`).then((res) => {
      setSelecteList();
      setItems([]);
      axios
        .put("/api/lists", { userId })
        .then((res) => setLists(res.data))
        .catch((error) => {
          console.log(error);
        });
    });
  };

  return (
    <>
      <div className="dropdown-container bg-tertiary/90 text-black text-lg p-1 justify-between flex rounded-t-md">
        <div onClick={handleInputClick} className="dropdown-input relative">
          <div className="relative flex flex-row items-center">
            <div className="mr-2 font-bold">Trip Name:</div>
            <div className="dropdown-container-wrapper relative flex-row items-center flex-grow">
              {showMenu && (
                <div className="dropdown-menu absolute top-full left-0 border-black border-2 w-64 overflow-y-auto h-[20vh]">
                  {searchable && (
                    <div className="search-box flex justify-center p-0.5">
                      <input
                        onChange={onSearch}
                        value={searchName}
                        ref={searchRef}
                        className="p-1"
                      />
                    </div>
                  )}
                  {getLists().map((list) => (
                    <div
                      onClick={() => OnItemClick(list)}
                      key={list.name}
                      className="dropdown-item text-black flex items-center cursor-pointer bg-sky-100 hover:bg-sky-300 px-1"
                    >
                      <div className="flex items-center">
                        {list.icon && (
                          <div className="mr-2">
                            <list.icon />
                          </div>
                        )}
                        <div className="p-0.5">{list.name}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="dropdown-selected-value cursor-pointer flex-grow-0 flex-shrink-0">
                {getDisplay()}
              </div>
            </div>
            <div className="dropdown-tools ml-2 flex-grow-0 flex-shrink-0">
              <div className="dropdown-tool">
                <Icon />
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={handleDeleteList}
          className="bg-primary hover:bg-red-900 font-bold rounded-md py-1 px-2 text-sm text-slate-200 pl-5 pr-5"
        >
          Delete
        </button>
      </div>
    </>
  );
}
