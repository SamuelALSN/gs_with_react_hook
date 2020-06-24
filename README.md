### IMPERTATIVE PROGRAMMING IN REACT 
React is inherently declarative, starting with JSX and ending with hooks. In JSX, we tell React what to render and not how to render it. In a React side-effect Hook (useEffect), we express when to achieve what instead of how to achieve it. Sometimes, however, we’ll want to access the rendered elements of JSX imperatively, in cases such as these:

    read/write access to elements via the DOM API:
        measure (read) an element’s width or height
        setting (write) an input field’s focus state
    implementation of more complex animations:
        setting transitions
        orchestrating transitions
    integration of third-party libraries:
        D3 is a popular imperative chart library

