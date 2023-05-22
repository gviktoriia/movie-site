import React, { useEffect, useState } from 'react'
import {Button} from '@mui/material'
import axios from 'axios';

function SaveMovie(props) {
  const [isSaved, setIsSaved] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [message, setMessage] = useState('');

  const handleSaveClick = () => {
    setIsSaved(true);
    axios.post('http://localhost:8081/save-movie', {
      movieId: props.id,
      type: props.type
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  useEffect(() => {
    console.log(savedMovies);
    if (savedMovies.length > 0) {
      const isMovieSaved = savedMovies.some(movie => movie.movie_id === parseInt(props.id) && movie.type === props.type);
      setIsSaved(isMovieSaved);
      console.log(props.id + props.type);
    }
  }, [savedMovies, props.id, props.type]);

  useEffect(() => {
    axios.get('http://localhost:8081/movies')
      .then(res => {
        if (res.data.Status === "Success") {
          setSavedMovies(res.data.data);
        } else {
          setMessage(res.data.Error);
        }
      })
      .catch(err => console.log(err));
  }, [props.id, props.type]);


  return (
    <Button variant='outlined'
        onClick={handleSaveClick}
        disabled={isSaved}
        sx={{
            color: 'white',
            borderColor: 'white',
            borderRadius: '30px',
            fontSize: "18px",
            width: "200px",
            "&:hover" : {
                backgroundColor: 'black',
            },
            "&:disabled": {
              backgroundColor: "gray",
              color: 'black',
              opacity: 0.5,
              cursor: "not-allowed",
            },
    }}
    >{isSaved ? 'Збережено!' : 'Зберегти'}
    </Button>
  )
}

export default SaveMovie