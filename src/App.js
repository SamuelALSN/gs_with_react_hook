import React, {useState} from 'react';
import List from './components/list'
import Search from "./components/search";

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

    const [searchTerm, setSearchTerm] = useState('')

    const handleSearch = event => {
        setSearchTerm(event.target.value)
    }
    // return stories that contains the searchTerm
    const searchedStories = stories.filter(story => story.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase() ))
    return (
        <div>
            <h1>Hacker News Stories</h1>
            <Search onSearch={handleSearch} searchTerm={searchTerm}/>
            <hr/>
            <List list={searchedStories}/>
        </div>
    );
};


export default App;
