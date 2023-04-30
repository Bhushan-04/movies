import logo from './logo.svg';
// import './App.css'
import './App1.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourite from './components/AddToFavourites';
import RemoveFavourites from './components/RemoveFavourites';
function App() {
  const [movies,setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [favourites, setFavourites] = useState([]);

  const getMovieReq = async (searchValue) =>{
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=647326d0`;

    const response = await fetch(url);
    const responseJson = await response.json();
    // console.log(responseJson);
    if (responseJson.Search) {
			setMovies(responseJson.Search);
		}
  }
  useEffect(()=>{
    getMovieReq(searchValue);
  },[searchValue]);

  useEffect(()=>{
    const  movieFav = JSON.parse(
      localStorage.getItem('react-movie-app-favourites')
    )
    if(movieFav){
      setFavourites(movieFav);
    }
  },[]);

  const saveToLocalStorage = (items) =>{
    localStorage.setItem('react-movie-app-favourites',JSON.stringify(items));
  }
  
  const addFavouriteMovie = (movie) =>{
    const newFavList = [...favourites, movie];
    setFavourites(newFavList);
    saveToLocalStorage(newFavList);
  }
  const removeFavouriteMovie = (movie) => {
		const newFavouriteList = favourites.filter(
			(favourite) => favourite.imdbID !== movie.imdbID
		);

		setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
	};

  

  return (
    <div className="container-fluid movie-app">
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading = 'Movies'></MovieListHeading>
        <SearchBox searchValue = {searchValue} setSearchValue = {setSearchValue}></SearchBox>
      </div>
      <div className="row">
        <MovieList 
          movies = {movies} 
          favouriteComponent= {AddFavourite}
          handlefavouritesClick = {addFavouriteMovie}></MovieList>
      </div>
      <div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='Favourites' />
			</div>
			<div className='row'>
				<MovieList 
        movies={favourites} 
        handlefavouritesClick = {removeFavouriteMovie}
        favouriteComponent= {RemoveFavourites}/>

			</div>
    </div>
  );
}

export default App;
