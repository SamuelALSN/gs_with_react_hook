import React from 'react';
import  styles from '../App.module.css'
import InputWithLabel from "./inputWithLabel";

const SearchForm = ({searchTerm,onSearchInput,onSearchSubmit}) => {
    return (
        <form onSubmit={onSearchSubmit} className={styles.searchForm}>
            <InputWithLabel
                id="search"
                value={searchTerm}
                isFocused
                onInputChange={onSearchInput}>
                <strong> Search :</strong>

            </InputWithLabel>


            {/* Disabled when we the searchterm is empty or isn't defined */}
            <button type="submit" disabled={!searchTerm}
             className="button button_large">
                Submit
            </button>
        </form>
    );
};

export default SearchForm;