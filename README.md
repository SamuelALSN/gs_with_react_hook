### reusable component

Have a closer look at the Search component. The label element has the text "Search: "; the id/htmlFor attributes have the search identifier; the value is called search; and the callback handler is called onSearch. The component is very much tied to the search feature, which makes it less reusable for the rest of the application and non search-related tasks. It also risks introducing bugs if two of these Search components are rendered side by side, because the htmlFor/id combination is duplicated, breaking the focus when one of the labels is clicked by the user.

Since the Search component doesn’t have any actual “search” functionality, it takes little effort to generalize other search domain properties to make the component reusable for the rest of the application. Let’s pass an additional id and label prop to the Search component, rename the actual value and callback handler to something more abstract, and rename the component accordingly:
