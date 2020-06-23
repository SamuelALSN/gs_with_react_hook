import React, {useState} from 'react';

const Search = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('')
    const handleChange = event => {
        setSearchTerm(event.target.value)
        onSearch(event)
    }
    return (
        <div>
            <label htmlFor="search">Search:</label>
            <input type="text" id="search" onChange={handleChange}/>
            <p>
                Searching for <strong>{searchTerm}</strong>
            </p>
        </div>
    );
};

export default Search;