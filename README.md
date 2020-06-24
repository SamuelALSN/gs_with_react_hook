### React Asynchronous Data 

`sometimes we must render a component before we can fetch data from a third-party API and display it.
We will simulate this kind of asynchronous data in the appllication 
`

` Our Asyncrhonous loading logic 
1- the component state is initialized with an empty array
2- useEffect call the asynchronous function to load data and after it resolve 
3- our empty array in the state is updated with resolve data
4- the component re-renders and dislays the data asynchronously`