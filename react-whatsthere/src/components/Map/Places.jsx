import React from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"

export default function Place({ setCoords, setBounds }) {
  const {
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (i) => {
    setValue(i, false);
    clearSuggestions();

    const datas = await getGeocode({ address: i });
    const { lat, lng } = getLatLng(datas[0]);
    setCoords({ lat, lng });
    setBounds({
      ne: { lat: lat + 0.07, lng: lng + 0.12 },
      sw: { lat: lat - 0.07, lng: lng - 0.12 },
    });
  };

  return (
    <div className="flex flex-row bg-white relative item-center m-2">
      <FontAwesomeIcon icon={faMagnifyingGlass} className="z-20 relative pl-2 pt-3"/>
      <Combobox onSelect={handleSelect} className="absolute z-10">
        <ComboboxInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-96 pl-8 pt-2 pb-2 pr-2"
          placeholder="Search an address"
        />
        <ComboboxPopover>
          <ComboboxList>
            
            {status === "OK" &&
              data.map(({ place_id, description }) => (
                <ComboboxOption key={place_id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
      {/* <button className="w-20 mr-3 bg-blue-600 text-white rounded-xl ">Search</button> */}
    </div>
    
  );
}
