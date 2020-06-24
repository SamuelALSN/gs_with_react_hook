### React Conditionnal Rendering

Handling asynchronous data in React leaves us with conditional states: with data and without data. This case is already covered, though, because our initial state is an empty list rather than null. If it was null, we’d have to handle this issue in our JSX. However, since it’s [], we filter() over an empty array for the search feature, which leaves us with an empty array. This leads to rendering nothing in the List component’s map() function.

In a real-world application, there are more than two conditional states for asynchronous data, though. Consider showing users a loading indicator when data loading is delayed:

Conditional rendering is not just for asynchronous data though. The simplest example of conditional rendering is a boolean flag state that’s toggled with a button. If the boolean flag is true, render something, if it is false, don’t render anything