import React, { useEffect, useState } from 'react'
import {Grid} from "@mui/material"
import MainScreenCard from './MainScreenCard'
import { ScrollingCarousel } from '@trendyol-js/react-carousel';

function MainScreen() {

    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth)

    React.useEffect(() => {
      function handleResize() {
        setWindowWidth(window.innerWidth)
      }
      window.addEventListener('resize', handleResize)
    })

    const [topMovies, setTopMovies] = useState([]);
    const url_top = "https://api.themoviedb.org/3/movie/now_playing?api_key=767874e4be6a4070cadafe7de418a5cd&language=uk&page=1";
    useEffect(() => {
      fetchTop();
    }, []);

    const fetchTop = async () => {
        const data = await fetch(url_top);
        const movies = await data.json();
        console.log(movies);
        setTopMovies(movies.results.splice(10,10));
    }

  return (
    <Grid container spacing={3} direction="row" textAlign="center"
    sx={{
        textAlign: 'center',
        width: "100%",
        paddingBottom: "3%",
        margin: "0",
        direction: "row",
        alignItems: "center",
        justifyContent: "center"
      }}>
          <ScrollingCarousel>
            {topMovies.map(movie => {
              return (<Grid item mt="20vh" mb="10vh" ml="20px">
                        <MainScreenCard key={movie.id} movie={movie} id={movie.id} isMovie={true}
                        image={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
                        title={movie.title} />
                      </Grid>);
            })}
          </ScrollingCarousel>
  </Grid>
  )
}

export default MainScreen