### Explicit data Fetching with React

Re-fetching all data each time someone types in the input field isn't optimal
Since we're using a third-party API to fetch the dta, its inernal are out of our reach.
Eventually we will incur rate limiting which retures an error instead of data

1- To solve this problem we will change the implementation details from implicit to explicit data (re-)fetching.
In other words , the application will refetch data only if someone clicks a confirmation button.
First we will add a button element for the confirmation to the JSX
 
 2-  Second the handler, input and button handler receive implementation logic 
 to update the component's state.
 The input field handler still updates the searchTerm 
 the button handler sets the url derived from the current searchTerm and the static API URL as a new state 
  
  3- Third instead of running the data fetching side-effect on every searchTerm change 
  which would happen each time the input field's value changes  - the url is used
  The url is set explicitly by the user when the search is confirmed via our new button  
  
  Notice that before the searchTerm was used for two cases : 
  updating field's state and activating the side-effect for fetching data 
  So it haves too many responsabilities ,
  Now it's only used for the former. A second state called url got introduced for triggering the side effect for fetching data 
  which only happes when a user clicks the confirmation button 