import { useEffect, useState } from "react";
import "./App.css";
import SearchIcon from './search.svg'
import MovieCard from './MovieCard.jsx'

const API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=9f82d5eb'

const App = () => {
  const [movies, setMovies] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  //first fetch the data from omdb (api url given)
  const searchMovies = async(title) => {
    const response = await fetch(`${API_URL}&s=${title}`)
    const data = await response.json()
    
    setMovies(data.Search)
    }

    useEffect(() => {
      searchMovies('Avengers')
    }, [])

  return (
    <div className="app">
      <h1>Movie's World</h1>

      <div className="search">
        <input placeholder="Search for movies"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img src={SearchIcon} alt="search" 
        onClick={()=> {searchMovies(searchTerm)}}
        />
      </div>

      {movies?.length > 0 ?
        (
          <div className="container">
            {movies.map((movie) => (
              <MovieCard movie={movie}/>
            ))}
          </div>
        ) : (
          <div className="empty">
            <h2>No movies found</h2>
          </div>
        )}
      
    </div>
  );
}

export default App;
