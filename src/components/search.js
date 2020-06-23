import React, {useState} from 'react';


/*
* The search component doesn't manage the state anymore but only passes up the event to te App component after text is entered in input field */
const Search = ({onSearch, searchTerm}) => {
    return (
        <div>
            <label htmlFor="search">Search:</label>
            <input type="text" id="search"  value={searchTerm} onChange={onSearch}/>
            <p>Entered text: {searchTerm}</p>
        </div>
    );
};

export default Search;