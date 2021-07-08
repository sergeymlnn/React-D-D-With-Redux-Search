import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';

import { FixedSizeList } from 'react-window';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


const countries = require('country-list');
const countriesList = countries.getNames();
const cities = ["London", "Madrid", "Berlin", "Milan", "Paris", "Kyiv", "Lviv"];


const getRenderItem = countries => (provided, snapshot, rubric) => {
  return (
    <div
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}
      className="droppable-list-item"
      >
      <Typography variant="subtitle1">
          {countries[rubric.source.index]}
      </Typography>
    </div>
  );
};


const App = () => {
  const [allCountries, setAllCountries] = useState([...countriesList]);
  const suggestCountry = event => {
    const suggestedCountries = countriesList.filter(
      country => country.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setAllCountries(suggestedCountries);
  };

  const renderItem = getRenderItem(allCountries);

  const CountryItem = ({ index, style }) => {
    const country = allCountries[index];
    if (!country) {
      return;
    }
    return (
      <Draggable key={uuidv4()} draggableId={country} index={index}>
        {
          provided => (
            <div
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              key={uuidv4()}
              style={{
                ...style,
                // border: draggableCountry === country ? '3px solid black' : '1px solid lightgrey',
                width: '93%',
              }}
              className="droppable-list-item"
            >
              <Typography variant="subtitle1">
                  {country}
              </Typography>
            </div>
          )
        }
      </Draggable>
    );
  }

  const onDragUpdate = event => {
    console.log("On Update Event: ", event);
    const countryIndex = event.destination?.index;
    if(!countryIndex) {
      return;
    }
    console.log("COUNTRY: ", allCountries[countryIndex])
  };

  const onDragEnd = event => {
    console.log("On End Event: ", event);
  };

  return (
    <div className="container">
      <div className="search-input">
        <TextField autoFocus onSelect={suggestCountry} placeholder="Search"/>
      </div>
      <div className="drag-and-drop-container">
        <DragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>

          <div className="draggable-countries-container">
            <Droppable droppableId="cities-list">
              {
                provided => (
                  <List ref={provided.innerRef}>
                    {
                      cities.map((city, index) => (
                        <Draggable key={uuidv4()} draggableId={city} index={index}>
                          {
                            provided => (
                              <ListItem
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                                key={uuidv4()}
                              >
                                <Typography variant="subtitle1" className="draggable-list-item">
                                  {city}
                                </Typography>
                              </ListItem>
                            )
                          }
                        </Draggable>
                      ))
                    }
                    {provided.placeholder}
                  </List>
                )
              }
            </Droppable>
          </div>
          <div className="droppable-countries-container">
            <Droppable droppableId="countries-list" renderClone={renderItem} mode="virtual">
              {
                (provided, snapshot) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {
                    allCountries.map((item, index)  => (
                      <Draggable draggableId={index.toString()} index={index} key={index}>
                        {renderItem}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )
              }
            </Droppable>
          </div>

        </DragDropContext>
      </div>
    </div>
  );
};

export default App;
