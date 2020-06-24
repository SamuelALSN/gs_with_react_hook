import React from 'react';

const Item = ({item}) => {
    return (
        <div>
            <span><a href={item.url}>{item.title}</a></span>
            <span>{item.author}</span>
            <span>{item.points}</span>
        </div>
    );
};

export default Item;