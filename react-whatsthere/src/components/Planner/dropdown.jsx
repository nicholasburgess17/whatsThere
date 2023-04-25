import { useState, useEffect, useRef, react } from "react";

const Icon = () => {
  return (
    <svg height="20" width="20" viewBox="0 0 20 20">
      <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
    </svg>
  );
};

export default function Dropdown({ placeHolder, lists, searchable }) {
  const [showMenu, SetShowMenu] = useState();
  const [selectedList, setSelecteList] = useState();
  const [searchName, setSearchName] = useState();

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

  return (
    <>
      <div className="dropdown-container">
        <div onClick={handleInputClick} className="dropdown-input">
          {showMenu && (
            <div className="dropdown-menu">
              {searchable && (
                <div className="search-box">
                  <input
                    onChange={onSearch}
                    value={searchName}
                    ref={searchRef}
                  />
                </div>
              )}
              {getLists().map((list) => (
                <div
                  onClick={() => OnItemClick(list)}
                  key={list.name}
                  classname="dropdown=item"
                >
                  {list.name}
                </div>
              ))}
            </div>
          )}
          <div className="dropdown-selected-value">{getDisplay()}</div>
          <div className="dropdown-tools">
            <div className="dropdown-tool">
              <Icon />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
