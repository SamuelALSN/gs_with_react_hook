import React from 'react';
import InputWithLabel from "./inputWithLabel";

const SearchForm = ({searchTerm,onSearchInput,onSearchSubmit}) => {
    return (
        <form onSubmit={onSearchSubmit}>
            <InputWithLabel
                id="search"
                value={searchTerm}
                isFocused
                onInputChange={onSearchInput}>
                <strong> Search :</strong>

            </InputWithLabel>


            {/* Disabled when we the searchterm is empty or isn't defined */}
            <button type="submit" disabled={!searchTerm}>
                Submit
            </button>
        </form>
    );
};

export default SearchForm;