import React, {useEffect, useState} from 'react';
import List from './components/list'
import InputWithLabel from "./components/inputWithLabel";

const App = () => {
    const stories = [
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

    // We are following two conventions of React's built-in hooks here
    // First the naming convention which puts the use prefix in front of every hook name
    //Second the returned values are returned ass aray
    const useSemiPersistentState = (key) => {
        const [value, setValue] = useState(
            localStorage.getItem(key) || '' // defining the initial state of the searchTerm
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

    const [searchTerm, setSearchTerm] = useSemiPersistentState('search')
    const handleSearch = event => {
        setSearchTerm(event.target.value)
    }
    // return stories that contains the searchTerm
    const searchedStories = stories.filter(story => story.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()))
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
            <List list={searchedStories}/>
        </div>
    );
};


export default App;
