import React, {useCallback, useEffect, useReducer, useState} from 'react';
import List from './components/list';
import InputWithLabel from "./components/inputWithLabel";


const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

// We are following two conventions of React's built-in hooks here
// First the naming convention which puts the use prefix in front of every hook name
//Second the returned values are returned ass array
const useSemiPersistentState = (key, initialState) => {
    const [value, setValue] = useState(
        localStorage.getItem(key) || initialState // defining the initial state of the searchTerm
    )
    useEffect(() => {
        localStorage.setItem(key, value)
    }, [value, key])

    return [value, setValue]
}

// a reducer function always receives state and action , a reducer always return a new state
const storiesReducer = (state, action) => {
    switch (action.type) {
        case 'STORIES_FETCH_INIT':
            return {
                ...state,
                isLoading: true,
                isError: false,
            }
        case 'STORIES_FETCH_SUCCESS':
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload,
            }
        case 'STORIES_FETCH_FAILURE':
            return { // returning a new state
                ...state,
                isLoading: false,
                isError: true,
            }
        case 'REMOVE_STORY':
            return {
                ...state,
                data: state.data.filter(story => action.payload.objectID !== story.objectID)
            }
        default:
            throw  new Error()
    }
}


const App = () => {

    const [searchTerm, setSearchTerm] = useSemiPersistentState('search', 'React')

    // explicit-datafetching: __1
    const [url, setUrl] = useState(`${API_ENDPOINT}${searchTerm}`)
    // we merge isLoading and isError into one Reducer hook for a unified state management and a more complex state object | see the line below
    // so that everything related to asynchronous data fetching must use the new dispatch function for state transitions see line 83.+ for usage
    const [stories, dispatchStories] = useReducer(
        storiesReducer,
        {data: [], isLoading: false, isError: false}
    )

    // A
    const handleFetchStories = useCallback(() => {
       // if (!searchTerm) return; // if not searchTerm do Nothing
        dispatchStories({type: 'STORIES_FETCH_INIT'})

        fetch(url)
            .then(response => response.json())
            .then(result => {
                dispatchStories({ // Instead of setting state explicitly with the state updater function from useState , the useReducer state updater function dispatches an action for the reducer
                    // the action comes with type and payload
                    type: 'STORIES_FETCH_SUCCESS',
                    payload: result.hits,
                });
            })
            .catch(() => dispatchStories({type: 'STORIES_FETCH_FAILURE'}))
    }, [url])//E

    useEffect(() => {
        handleFetchStories() // C
    }, [handleFetchStories]) //D


    const handleSearchInput = event => {
        setSearchTerm(event.target.value)
    }
    // explicit-datafetching__2: set the url explicitly  when submit search button is clicked
    const handleSearchSubmit = () => {
        setUrl(`${API_ENDPOINT}${searchTerm}`)
    }

    // remove a specific story given as argument (item) from the list
    const handleRemoveStory = item => {
        dispatchStories({
            type: 'REMOVE_STORY',
            payload: item,
        })
    }

    return (
        <div>
            <h1>Hacker News Stories</h1>
            <InputWithLabel
                id="search"
                value={searchTerm}
                isFocused
                onInputChange={handleSearchInput}>
                <strong> Search :</strong>

            </InputWithLabel>


            {/* Disabled when we the searchterm is empty or isn't defined */}
            <button
                type="button"
                disabled={!searchTerm}
                onClick={handleSearchSubmit}
            >
                Submit
            </button>
            <hr/>
            {stories.isError && <p> Something went wrong ....</p>}
            {stories.isLoading ? (
                <p> Loading .... </p>
            ) : (
                <List
                    list={stories.data}
                    onRemoveItem={handleRemoveStory}
                />
            )}
        </div>
    );
};


export default App;
