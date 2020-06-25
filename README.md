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