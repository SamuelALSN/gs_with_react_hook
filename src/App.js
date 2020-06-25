import React, {useEffect, useReducer, useState} from 'react';
import List from './components/list';
import InputWithLabel from "./components/inputWithLabel";

const initialStories = [
    {
        title: 'React',
        url: 'https://reactjs.org/',
        author: 'Jordan Walke',
        num_comments: 3,
        points: 4,
        objectID: 0,
    },
    {
        title: 'Redux',
        url: 'https://redux.js.org/',
        author: 'Dan Abramov, Andrew Clark',
        num_comments: 2,
        points: 5,
        objectID: 1,
    },
];

// const getAsyncStories = () =>
//     new Promise(resolve =>
//         setTimeout(
//             () => resolve({data: {stories: initialStories}}),
//             2000
//         )
//     );

const getAsyncStories = () =>
    new Promise((resolve, reject) => setTimeout(reject, 2000));



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
        case 'SET_STORIES':
            return action.payload;
        case 'REMOVE_STORY':
            return state.filter(story => action.payload.objectID !== story.objectID)
        default:
            throw  new Error()
    }
}

const App = () => {

    const [searchTerm, setSearchTerm] = useSemiPersistentState('search', 'React')
    const [stories, dispatchStories] = useReducer(storiesReducer, [])

    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    useEffect(() => {
        setIsLoading(true)
        getAsyncStories()
            .then(result => {
                dispatchStories({ // Instaed of setting state explicitly with the state updater function from useState , the useReducer state updater function dispatches an action for the reducer
                    // the action comes with type and payload
                    type: 'SET_STORIES',
                    payload: result.data.stories,
                });
                setIsLoading(false)
            })
            .catch(() => setIsError(true))
    }, [])


    const handleSearch = event => {
        setSearchTerm(event.target.value)
    }
    // return stories that contains the searchTerm
    const searchedStories = stories.filter(story => story.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()))

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
            {isError && <p> Something went wrong ....</p>}
            {isLoading ? (
                <p> Loading .... </p>
            ) : (
                <List
                    list={searchedStories}
                    onRemoveItem={handleRemoveStory}
                />
            )}
        </div>
    );
};


export default App;
