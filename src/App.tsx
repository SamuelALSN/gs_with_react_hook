import React, {useCallback, useEffect, useReducer, useRef, useState} from 'react';
import axios from 'axios';
import styles from './App.module.css'
import List from './components/list';
import SearchForm from "./components/searchForm";
import {Story} from './stories'


const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

// we will exploiting the ref and its mutable current property for imperative state management
// that doesn't trigger a re-render

// We are following two conventions of React's built-in hooks here
// First the naming convention which puts the use prefix in front of every hook name
//Second the returned values are returned ass array
const useSemiPersistentState = (
    key: string,
    initialState: string
    // we tell the function to return an array [] with a string (state) and tell the functions like state updater functiioin that take a value to return nothing (void)
): [string, (newValue: string) => void] => {

    //const isMounted = useRef(false) | these value will be use later to avoiding first render computation

    const [value, setValue] = useState(
        localStorage.getItem(key) || initialState // defining the initial state of the searchTerm
    )
    useEffect(() => {
        // the logic below prevent First render computation for useEffect which is used for side-effects

        /***
         *   if (!isMounted.current) {
            isMounted.current = true;
         } else {
             console.log('A');
             localStorage.setItem(key, value)
         }
         */

        console.log('A');
        localStorage.setItem(key, value)
    }, [value, key])

    return [value, setValue]
}

/* Typescript type  Definitions */

type Stories = Array<Story>
type StoriesState = {
    data: Stories;
    isLoading: boolean;
    isError: boolean;
}

interface StoriesFetchInitAction {
    type: 'STORIES_FETCH_INIT';
}

interface StoriesFetchSucessAction {
    type: 'STORIES_FETCH_SUCCESS';
    payload: Stories;
}

interface StoriesFetchFailureAction {
    type: 'STORIES_FETCH_FAILURE';
}

interface StoriesRemoveAction {
    type: 'REMOVE_STORY';
    payload: Story;
}

// We  do better by specifying each action TypeScript type as an interface, and using a union type (here StoriesAction) for the final type safety:
// so For instance if we would dispatch an action to the reducer with an action type that's not defined , we will get a type error.
// or if we would pass something else than a story to the action which removes a story , we will get a type error as well

type StoriesAction =
    | StoriesFetchInitAction
    | StoriesFetchSucessAction
    | StoriesFetchFailureAction
    | StoriesRemoveAction;

// a reducer function always receives state and action , a reducer always return a new state
const storiesReducer = (state: StoriesState, action: StoriesAction) => {
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

 const getSumComments = (stories:StoriesState) => {
    console.log('C')
    return stories.data.reduce(
        (result, value) => result + value.num_comments,
        0
    )
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
    const handleFetchStories = useCallback(async () => {
        // if (!searchTerm) return; // if not searchTerm do Nothing
        dispatchStories({type: 'STORIES_FETCH_INIT'})

        try {
            // once we start using the await keyword , everything reads like synchronous code
            // actions after await keyword are not executed until promise resolves meaning the code will wait
            const result = await axios.get(url)
            dispatchStories({ // Instead of setting state explicitly with the state updater function from useState , the useReducer state updater function dispatches an action for the reducer
                // the action comes with type and payload
                type: 'STORIES_FETCH_SUCCESS',
                payload: result.data.hits,
            });
        } catch {
            dispatchStories({type: 'STORIES_FETCH_FAILURE'})
        }
    }, [url])//E

    useEffect(() => {
        handleFetchStories() // C
    }, [handleFetchStories]) //D


    const handleSearchInput = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setSearchTerm(event.target.value)
    }
    // explicit-datafetching__2: set the url explicitly  when submit search button is clicked
    const handleSearchSubmit = (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        setUrl(`${API_ENDPOINT}${searchTerm}`)
        // eslint-disable-next-line no-restricted-globals
        event.preventDefault();
    }

    const handleRemoveStory = (item: Story) => {
        dispatchStories({
            type: 'REMOVE_STORY',
            payload: item
        })
    }  // for performance optimisation replace these codes lines below by the line before


    // remove a specific story given as argument (item) from the list // use callback is add here for performance optimisation only // it prevent to creating the function on every render

    /**
     * * const handleRemoveStory = useCallback(item => {
         dispatchStories({
     *        type: 'REMOVE_STORY',
             payload: item,
     *    })
     }, [])
     */
    console.log('B:APP');

    const sumComments = getSumComments(stories)

    // ---- FOR PERFORMANCE OPTIMISATION REPLACE THE LINE BEFORE BY CODE AFTER THIS LINES
    // Using useMemo here is for resolving the problem below: // For every time someone types in the seachForm , the computation souldn't run again. // It only runs if the dependency array here [stores] has changed.

    /**
     * * const sumComments = React.useMemo(() => getSumComments(stories), [
     *   stories,
     ]);
     */


    return (
        <div className={styles.container}>
            <h1 className={styles.headlinePrimary}> My Hacker Stories with {sumComments} comments.</h1>
            <SearchForm
                searchTerm={searchTerm}
                onSearchInput={handleSearchInput}
                onSearchSubmit={handleSearchSubmit}/>

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
