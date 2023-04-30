import React from 'react'
import AddFavourite from './AddToFavourites';
const MovieList = (props) => {
  const favouriteComponent = props.favouriteComponent;
  return (
    <>
    {props.movies.map((movie, index)=>(
        <div key={index} className='image-container col d-flex m-3'>
            <img src={movie.Poster} alt='movie' style={{width:'180px',height:'250px'}}></img>
            <div onClick={()=> props.handlefavouritesClick(movie)}
            className='overlay d-flex align-items-center justify-content-center'>
              <AddFavourite/>
            </div>
        </div>
    ))}
  </>
  )
}

export default MovieList;