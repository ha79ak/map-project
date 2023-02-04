import React from 'react';
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";

const PlacesAutocomplete = ({
    onAddressSelect,
}: {
    onAddressSelect? : (address: string) => void;
}) => {
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
      } = usePlacesAutocomplete ({
        requestOptions: { componentRestrictions: { country: null } }, // country can be restricted by 'tr' or 'us' instead null
        debounce: 300,
        cache: 86400,
      });
    
      const renderSuggestions= () => {
        return data.map((suggestion) => {
          const {
            place_id,
            structured_formatting: { main_text, secondary_text },
            description,
          } = suggestion;
    
          return (
            <li
              key={place_id}
              onClick={() => {
                setValue(description, false);
                clearSuggestions();
                onAddressSelect && onAddressSelect(description);
              }}
            >
              <strong>{main_text}</strong> <small>{secondary_text}</small>
            </li>
          )
        })
      };

      return (
        <div>
            <input
              value={value}
              disabled={!ready}
              onChange={(e) => setValue(e.target.value)}
              placeholder='Cankaya Ankara'
            />
            {status === 'OK' && (
              <ul>{renderSuggestions()}</ul>
            )}
        </div>
      )
};

export default PlacesAutocomplete;