import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../services/api";
import "../css/Home.css"


function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movieList, setMovieList] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    useEffect( () => {
        const loadPopularMovies = async ()=>{
            try{
                const popularMovies = await getPopularMovies();
                setMovieList(popularMovies);
            } catch(err) {
                setError("Failed to load Movies...");
                console.log("errr" , err);
            }
            finally{
                setLoading(false);
            }
        }

        loadPopularMovies();
    },[])

    const handleSearch = async(e) => {
        e.preventDefault();
        console.log(searchQuery);
        if(!searchQuery.trim()) return;
        if(loading) return;
        setLoading(true);

        try{
            const searchResults = await searchMovies(searchQuery);
            setMovieList(searchResults);
            setError(null)
        }
        catch(err){
            console.log(err);
            setError("Failed to load Movies...")
        }
        finally{
            setLoading(false);
        }
        setSearchQuery("");
    }
    return <div className="home">
        <form onSubmit={handleSearch} className="search-form">
            <input type="text" 
                    placeholder="Search for movies" 
                    className="search-input" 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)}>
            </input>
            <button type="submit" className="search-button"> Search</button>
        </form>
        {error && <div className=" error-message"> {error} </div> }
          {loading ? (<div className="loading"> Loading...</div>):(
        <div className="movies-grid">
            {movieList.map((movie) => 
            movie.title.toLowerCase().startsWith(searchQuery) && (<MovieCard movie={movie} key={movie.id}/>
            )
        )}
        </div>)}
    </div>
}

export default Home;