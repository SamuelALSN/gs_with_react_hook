### React Advanced state
***
 Implementing UseReducer hook  for more sophisticated state management 
 
 So far, the handleRemoveStory handler computes the new stories. It’s valid to move this logic into the reducer function and manage the reducer with an action, which is another case for moving from imperative to declarative programming. Instead of doing it ourselves by saying how it should be done, we are telling the reducer what to do. Everything else is hidden in the reducer.
 
 
 ***
 Now the reducer function has to cover this new case in a new conditional state transition. If the condition for removing a story is met, the reducer has all the implementation details needed to remove the story. The action gives all the necessary information, an item’s identifier to remove the story from the current state and return a new list of filtered stories as state.
 
 ***
 What we’ve covered is a minimal version of a reducer in JavaScript. It covers two state transitions, shows how to compute current state and action into a new state, and uses some business logic (removal of a story). Now we can set a list of stories as state for the asynchronously arriving data, and remove a story from the list of stories, with just one state managing reducer and its associated useReducer hook.