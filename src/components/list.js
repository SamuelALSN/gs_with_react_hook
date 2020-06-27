import React from 'react';
import Item from "./item";

const List = ({ list, onRemoveItem }) =>
  console.log('B:List') ||
    list.map(item => (
        <Item
            key={item.objectID}
            item={item}

            onRemoveItem={onRemoveItem}
        />
    ));

export default List;
// for performance optimisation replace thes code before by the code below to see what happening

// const List = React.memo(({list, onRemoveItem}) =>
//     console.log('B:List') ||
//     list.map(item => (
//         <Item
//             key={item.objectID}
//             item={item}
//
//             onRemoveItem={onRemoveItem}
//         />
//     ))
// );
// export default List;
