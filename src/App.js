import React, {useEffect, useState} from 'react';
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

const getAsyncStories = () =>
    new Promise(resolve =>
        setTimeout(
            () => resolve({data: {stories: initialStories}}),
            2000
        )
    );



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


const App = () => {

    const [searchTerm, setSearchTerm] = useSemiPersistentState('search', 'React')
    const [stories, setStories] = useState([])

    // we want to start off with an empty list of stories and simulate fetching thes stories asynchronously.
    // In a new useEffect hook we call the function and resolve the return promise with then

    useEffect(() => {
        getAsyncStories().then(result => {
            setStories(result.data.stories)
        }, []) // due to empty dependency array the side-effect only runs one the component renders for the first time
    })
    const handleSearch = event => {
        setSearchTerm(event.target.value)
    }
    // return stories that contains the searchTerm
    const searchedStories = stories.filter(story => story.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()))

    // remove a specific story given as argument (item) from the list
    const handleRemoveStory = item => {
        const newStories = stories.filter(story => item.objectID !== story.objectID)

        setStories(newStories) // updating our state
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
            <List list={searchedStories} onRemoveItem={handleRemoveStory}/>
        </div>
    );
};


export default App;
