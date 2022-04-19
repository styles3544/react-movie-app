import './App.css';

import MovieCard from './MovieCard';
import Footer from './Footer';

import logo from './logo.svg';
import { useEffect, useState } from "react";


const API_URL = `http://www.omdbapi.com?apikey=${process.env.REACT_APP_API_KEY}`;

const App = () => {

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);

    const data = await response.json();

    setMovies(data.Search);
  }

  useEffect(() => {
    searchMovies('avengers')
  }, []);

  return (
    <div className="app">
      <h1>BingeWatch</h1>

      <div className='search'>
        <input
          placeholder='Search for movies'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={logo}
          alt='search'
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {
        movies?.length > 0
        ? (
          <div className='container'>
            {movies.map((movie) => (
              <MovieCard movie={movie} />
            ))}
          </div>
        ) : 
        (
          <div className='empty'>
            <h2>No movies found</h2>
          </div>
        )
      }

        <Footer />
      
    </div>
  );
}

export default App;
