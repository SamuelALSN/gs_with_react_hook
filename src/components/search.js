import React, {useState} from 'react';


/*
* The search component doesn't manage the state anymore but only passes up the event to te App component after text is entered in input field */
const Search = ({onSearch, searchTerm}) => [

    <label key="1" htmlFor="search">
        Search: {''}
    </label>,
    <input
        key="2"
        id="search"
        type="text"
        value={searchTerm}
        onChange={onSearch}/>

];

export default Search;