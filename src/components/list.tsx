import React from 'react';
import Item from "./item";

import {Story} from '../stories'

type Stories = Array<Story>;

type ListProps = {
    list: Stories;
    onRemoveItem: (item: Story) => void;
}

const List = ({list, onRemoveItem}: ListProps) => (
    // console.log('B:List') ||
    <>
        {list.map(item => (
            <Item
                key={item.objectID}
                item={item}

                onRemoveItem={onRemoveItem}
            />
        ))};
    </>
);
export default List;

