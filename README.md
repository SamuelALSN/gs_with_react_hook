### React Imposible  state
*** 
Here we transform our simulation asynchronous data to reject instead of resolving 
So this cause en Error in our UI 
where 2 states is load
- The state for handling error 
- The state which appear when loading data

These 2 things above cause errors in our UI 

***
Fortunately we can improve our chances by moving states that belong together from multiple useState and useReducer hooks into a single useReducer hook in the Nex commit  
***
This step resolve the problem below : 
Perhaps you've noticed a disconnect between the single states in the App component which seem to belong together because of the useState hooks.

`Technically all the states related to the asynchronous data belong together which doesn't only include the stories as actual data (valeur réelles) but all states related
to the asynchronous data belong together, whixh doesn't only include the stories as actual data but also their loading and error states`

***
Caveat :
There is nothing wrong with multiple useState hooks in one React component. Be wary once you see multiple state updater functions in a row, however. These conditional states can lead to impossible states, and undesired behavior in the UI. Try changing your pseudo data fetching function to the following to simulate the error handling: