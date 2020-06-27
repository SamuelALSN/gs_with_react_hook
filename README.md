### Performance-Avoiding First Render Computation 
***
#####Performance in REACT
This section is just here for the sake of learning about performance improvements in React. We wouldn’t need optimizations in most React applications, as React is fast out of the box. While more sophisticated tools exist for performance measurements in JavaScript and React, we will stick to a simple console.log() and our browser’s developer tools for the logging output.

### Don't run on first render 

Previously we covered React’s useEffect Hook, which is used for side-effects. It runs the first time a component renders (mounting), and then every re-render (updating). By passing an empty dependency array to it as a second argument, we can tell the hook to run on the first render only. Out of the box, there is no way to tell the hook to run only on every re-render (update) and not on the first render (mount). For instance, examine this custom hook for state management with React’s useState Hook and its semi persistent state with local storage using React’s useEffect Hook:
***
We are exploiting the ref and its mutable current property for imperative state management that doesn’t trigger a re-render. Once the hook is called from its component for the first time (component render), the ref’s current is initialized with a false boolean called isMounted. As a result, the side-effect function in useEffect isn’t called; only the boolean flag for isMounted is toggled to true in the side-effect. Whenever the hook runs again (component re-render), the boolean flag is evaluated in the side-effect. Since it’s true, the side-effect function runs. Over the lifetime of the component, the isMounted boolean will remaintrue. It was there to avoid calling the side-effect function for the first time render that uses our custom hook.

The above was only about preventing the invocation of one simple function for a component rendering for the first time. But imagine you have an expensive computation in your side-effect, or the custom hook is used frequently in the application. It’s more practical to deploy this technique to avoid unnecessary function invocations.
***
Notice that in React if a parent component re-renders, its child components re-render as well

React does this by default because preventing a re-render of child components could lead to bugs, and the re-rendering mechanism of React is still fast.

***
Sometimes we want to prevent re-rendering , however. For instance huge data sets displayed in a table shouldn't re-render if they are not affected by an update.
It's more efficient to perform an equality check if something changed for the component. Therefore we can use React's memo API to make this equality check for the props
***
After Implementing getsumComments function and call it in our component , 
we notice that each time text is typed in the input field of the searchForm component 
this computation runs again with an output of a console.log(C) 
This may be fine for a non-heavy computationike this one , but imagine this computation would take more than 500ms.
It would give the re-rendering a delay because everything in the component has to wait for this computation.
We can tell React to only run a function if one of its dependencies has changed
If no dependency changed, the result of the function stays the same 
So React's useMemo Hook help us there
*****
For every time someone types in the SearchForm, the computation shouldn’t run again. It only runs if the dependency array, here stories, has changed. After all, this should only be used for cost expensive computations which could lead to a delay of a (re-)rendering of a component.

Now, after we went through these scenarios for useMemo, useCallback, and memo, remember that these shouldn’t necessarily be used by default. Apply these performance optimization only if you run into a performance bottlenecks. Most of the time this shouldn’t happen, because React’s rendering mechanism is pretty efficient by default. Sometimes the check for utilities like memo can be more expensive than the re-rendering itself.
 