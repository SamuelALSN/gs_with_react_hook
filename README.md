### DATA FETCHING WITH REACT 
***
irst, the API_ENDPOINT ,(A) is used to fetch popular tech stories for a certain query (a search topic). In this case, we fetch stories about React (B). Second, the native browser’s fetch API is used to make this request (B). For the fetch API, the response needs to be translated into JSON (C). Finally, the returned result follows a different data structure (D), which we send as payload to our component’s state.

***
We changed the feature from a client-side to server-side search, Instead of 
filtering a predefined list of stories on the client , the searchTerm is used 
to fetch a sever-side filtering list .
The server-side search happens not only for the initial data fetching but also for dat fetching if the searchTerm changes changes.
The feature is full server-side now 