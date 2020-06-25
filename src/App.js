import React, {useEffect, useReducer, useState} from 'react';
import List from './components/list';
import InputWithLabel from "./components/inputWithLabel";

// const initialStories = [
//     {
//         title: 'React',
//         url: 'https://reactjs.org/',
//         author: 'Jordan Walke',
//         num_comments: 3,
//         points: 4,
//         objectID: 0,
//     },
//     {
//         title: 'Redux',
//         url: 'https://redux.js.org/',
//         author: 'Dan Abramov, Andrew Clark',
//         num_comments: 2,
//         points: 5,
//         objectID: 1,
//     },
// ];

// const getAsyncStories = () =>
//     new Promise(resolve =>
//         setTimeout(
//             () => resolve({data: {stories: initialStories}}),
//             2000
//         )
//     );

// const getAsyncStories = () =>
//     new Promise((resolve, reject) => setTimeout(reject, 2000));
//

// We are following two conventions of React's built-in hooks here
// First the naming convention which puts the use prefix in front of every hook name
//Second the returned values are returned ass array
const useSemiPersistentState = (key, initialState) => {
    const [value, setValue] = useState(
        localStorage.getItem(key) || initialState // defining the initial state of the searchTerm
    )

    // our sideEffect function define the localstorage
    // first parameters: useEffect set to the localstorage the most recent search ineraction
    // second parameters: a dependency array of variables if one variables changes the function for side-effect is called
    // Here the side effects function is called everytime the searchTerm changes
    // so here this hook is updated whenever the component is first mounted but also if one of it dependencies is updated
    useEffect(() => {
        localStorage.setItem(key, value)
    }, [value, key])

    // let return the values that are needed in our App Component from  our custom hooks we created
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
        // NOTICE how the REMOVE_STORY action changed as well , it operates on the state.data, no longer just the plain state
        // so now the state is a complex object with data, loading and error states rather than just a list of stories
        case 'REMOVE_STORY':
            return {
                ...state,
                data: state.data.filter(story => action.payload.objectID !== story.objectID)
            }
        default:
            throw  new Error()
    }
}

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

const App = () => {

    const [searchTerm, setSearchTerm] = useSemiPersistentState('search', 'React')

    // we merge isLoading and isError into one Reducer hook for a unified state management and a more complex state object | see the line below
    // so that everything related to asynchronous data fetching must use the new dispatch function for state transitions see line 83.+ for usage
    const [stories, dispatchStories] = useReducer(
        storiesReducer,
        {data: [], isLoading: false, isError: false}
    )

    // const [isLoading, setIsLoading] = useState(false)
    // const [isError, setIsError] = useState(false)
    useEffect(() => {
        if (!searchTerm) return; // if not searchTerm do Nothing
        //setIsLoading(true)
        dispatchStories({type: 'STORIES_FETCH_INIT'})
        fetch(`${API_ENDPOINT}${searchTerm}`)
            .then(response => response.json())
            .then(result => {
                dispatchStories({ // Instead of setting state explicitly with the state updater function from useState , the useReducer state updater function dispatches an action for the reducer
                    // the action comes with type and payload
                    type: 'STORIES_FETCH_SUCCESS',
                    payload: result.hits,
                });
                // setIsLoading(false)
            })
            .catch(() => dispatchStories({type: 'STORIES_FETCH_FAILURE'})
                // setIsError(true)
            )
    }, [searchTerm])


    const handleSearch = event => {
        setSearchTerm(event.target.value)
    }
    // return stories that contains the searchTerm
    //const searchedStories = stories.data.filter(story => story.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()))

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
                onInputChange={handleSearch}>
                <strong> Search :</strong>

            </InputWithLabel>
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
