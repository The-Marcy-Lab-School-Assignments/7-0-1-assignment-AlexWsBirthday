//1. import React? I don't know if this is necessary since this is already marked as a JSX file but ok
import React from "react"
import { useState, useEffect } from "react"

//2. import the handle fetch func from utils 
import { handleFetch } from "../utils"

//3. import the API key
import API_KEY from "../config" //since its a default export, you dont have to surround API_KEY in curly braces bc you aren't naming a specific thing to get from the export. It's one thing.
import GifContainer from "./GifContainer";



function GifSearch() {
    //VERY FIRST, setting up our useState hooks.
    //hook for the search data that will come from the form we set up  
    const [query, setQuery] = useState('');
    //set hooks for the data that we are fetching and errors if we have to return them.
    const [gifs, setGifs] = useState([]); //setting it to an empty array as we plan to hold multiple facets of data. 
    const [error, setError] = useState(null);


    //functions to get the components set up and ready for any events. in order:  
    //1. setting up the useEffect tool to set up the gif container w/ 3 basic trending search gifs upon render (since its a hook it goes first)
    //2. setting up our async fetch search func in the event that there is a search query submitted by a user. 
    //3. setting up the syncronous handleSubmit, which immediately acts first to prevent the page from refreshing and invokes the async function. 
    //4. setting 


    //our fetch functions for getting the data for search -------------------------------------------------------------------------------------
    //since useEffect is also a hook, it must go to the top. It helps render the component while keeping watch of async actions the component needs to render.

    //question mark marks the beginning of the "query" string when hitting the endpoint and asking for spec. info.
    //required query parameter api_key is fed the api key from our config file when fetching. 
    //& separates multiple query params
    //limit=3 returns a certain amount of gifs. we only want 3. 
    //rating=g is a general rating, so we're taking from a specific pool of data (trending, general gifs)
    const trendingGifs = `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=3&rating=g`
    useEffect(() => {
        const fetchTrending = async () => {

            const [data, error] = await handleFetch(trendingGifs)
            if (data) { setGifs(data.data); console.log(`fetch success! ${data.data}`) }; //if the fetch is successful, take the data from the handleFetch response and use setGifs to update the component to show the resulting data
            if (error) { setError(error); console.log(error) }; // if there is an error, set the error to show it on the dinkin. thing
        }
        fetchTrending() // invoke the fetchTrending function because it is asynchronous
    }, []); //we only want this effect to be rendered to this component on its initial (first) render. 

    //fetch function for the search part ------------------------------------------------------------------------------------------------------------

    const fetchSearch = async () => {
        //search url with the key and the query
        const search = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}&limit=3&rating=g`
        const [data, error] = await handleFetch(search) //store the fetch data

        if (data) {
            setGifs(data.data)
            console.log(data.data)
        }; // if there is data, set the gifs to the array in the endpoint data
        if (error) setError(error) // if there is an error, set the error
    }


    // callback function to handle the form event "submit" (this is how we get the query, by having the input submitted be assigned as a value to query)
    const handleSubmit = (e) => {
        e.preventDefault(); //don't have the dinkin query show up in the url 
        fetchSearch() //invoke the fetchsearch func bc its async and won't run on its own until it's queued to run 
    }

    //I want to assume handleSearch updates the query in real time as the user is searching, so you get different gifs as the user types out the query. neat!
    const handleSearch = (e) => setQuery(e.target.value)


    //conditional render, if there's an error in fetching the data needed to render the components at any point 
    if (error) {
        return (
            <div> Error: {error.message}</div> //returns error message instead of gifs. bc there was an error. 
        )
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="searchInput">Enter a Search Term </label>
                <input type="text" className="form-control" id="searchInput" value={query} onChange={handleSearch} />
                <button type="submit" className="btn btn-success">Search</button>
            </form>

            {/* feeding the gif information into the gif container through the gifs prop */}
            <GifContainer gifs={gifs} />
        </div>


    )
}

export default GifSearch
