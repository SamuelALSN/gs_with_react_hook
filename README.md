### Memoized handler in React 

We have learned about handlers, callback handlers, and inline handlers. Now we’ll introduce a memoized handler, which can be applied on top of handlers and callback handlers. For the sake of learning, we will move all the data fetching logic into a standalone function outside the side-effect (A); wrap it into a useCallback hook (B); and then invoke it in the useEffect hook (C):
****