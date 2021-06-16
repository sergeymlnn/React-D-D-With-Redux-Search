import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';

import { FixedSizeList } from 'react-window';


const countries = require('country-list');
const countriesList = countries.getNames();
const cities = ["London", "Madrid", "Berlin", "Milan", "Paris", "Kyiv", "Lviv"];


const App = () => {
  const [allCountries, setAllCountries] = useState([...countriesList]);
  const suggestCountry = event => {
    const suggestedCountries = countriesList.filter(
      country => country.toLowerCase().includes(event.target.value)
    );
    setAllCountries(suggestedCountries);
  };

  const CountryItem = ({index, style}) => (
    <Typography variant="subtitle1" key={uuidv4()} style={style}>
      <div className="droppable-list-item">
        {allCountries[index]}
      </div>
    </Typography>
  );
  return (
    <div className="container">
      <div className="search-input">
        <TextField autoFocus onSelect={suggestCountry} placeholder="Search"/>
      </div>
      <div className="drag-and-drop-container">
        <div className="draggable-countries-container">
          <List>
            {
              cities.map(city => (
                <ListItem key={uuidv4()}>
                  <Typography variant="subtitle1" className="draggable-list-item" >
                    {city}
                  </Typography>
                </ListItem>
              ))
            }
          </List>
        </div>
        <div className="droppable-countries-container">
          <FixedSizeList
            style={{overflowX: "hidden"}}
            height={600}
            itemCount={allCountries.length}
            itemSize={50}
          >
            {CountryItem}
          </FixedSizeList>
        </div>
      </div>
    </div>
  );
};

export default App;
