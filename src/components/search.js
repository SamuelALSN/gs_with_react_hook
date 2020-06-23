import React, {useState} from 'react';


/*
* The search component doesn't manage the state anymore but only passes up the event to te App component after text is entered in input field */
const Search = ({onSearch, searchTerm}) => (

    <>
        <label htmlFor="search">Search: </label>
        <input
            id="search"
            type="text"
            value={searchTerm}
            onChange={onSearch}
        />
    </>
);

export default Search;