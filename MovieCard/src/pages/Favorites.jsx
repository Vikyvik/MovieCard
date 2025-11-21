import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";
import "../css/Favorites.css"

function Favorites(){
    const {favorites} = useMovieContext();
    console.log(favorites);
    
    return (favorites.length>0 ? <div className="favorite">
        <h2> Your Favorites</h2>
         <div className="movie-grid">
            {favorites.map((movie) => 
              <MovieCard movie={movie} key={movie.id}/>
            
        )}
    </div> 
    </div>
     :  <div className="favorites-empty">
        <h2>No favorite selected</h2>
        <p>Starting adding movies to your favorites and they wil appear</p>
     </div>  ) 
}

export default Favorites;