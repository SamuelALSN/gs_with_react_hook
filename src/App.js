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
    const handleSearch = event => {
        console.log(event.target.value)
    }
    return (
        <div>
            <h1>Hacker News Stories</h1>
            <Search onSearch={handleSearch}/>
            <hr/>
            <List list={stories}/>
        </div>
    );
};


export default App;
