import React, { useEffect, useState } from 'react'
import {Box, Grid, Typography} from '@mui/material'
import CatalogueCard from '../CatalogueCard'

const movie_genre = {
    28: "Бойовики",
    12: "Пригоди",
    16: "Анімація",
    35: "Комедії",
    80: "Кримінал",
    99: "Документальні",
    18: "Драма",
    10751: "Сімейні",
    14: "Фентезі",
    36: "Історичні",
    27: "Жахи",
    878: "Наукова фантастика",
    10402: "Мюзикл",
    9648: "Детектив",
    10749: "Романтика",
    53: "Триллер",
    10752: "Війна",
    37: "Вестерн",
}

function MainPageCatalogue() {

    const [popularMovies, setPopularMovies] = useState([]);
    const url_popular = "https://api.themoviedb.org/3/movie/popular?api_key=767874e4be6a4070cadafe7de418a5cd&language=uk&page=1";

    useEffect(() => {
        fetchPopular();
    }, []);

    const fetchPopular = async () => {
        const data = await fetch(url_popular);
        const movies = await data.json();
        console.log(movies);
        setPopularMovies(movies.results);
    }

  return (
    <Box sx={{
        backgroundColor: "#080620",
        height: 'fit-content',
    }}>
        <Typography color="white" sx={{
            fontFamily: 'Monserrat',
            fontSize: "30px",
            fontWeight: 700,
            textAlign: 'center',
            paddingTop: "3.5%",
            paddingBottom: "2%"
        }}>
            Популярні
        </Typography>
        <Grid container spacing={4} sx={{
                  textAlign: 'center',
                  width: "100%",
                  paddingBottom: "3%",
                  margin: "0",
                  direction: "row",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
            {popularMovies.map(movie => {
                return (<Grid item lg={2.5}>
                    <CatalogueCard key={movie.id} movie={movie} id={movie.id} isMovie={true}
                    image={"https://image.tmdb.org/t/p/w500" + movie.poster_path} 
                    title={movie.title} year={movie.release_date.slice(0,4)} type={movie_genre[movie.genre_ids[0]]} />
                </Grid>);
            })}
        </Grid>
    </Box>
  )
}

export default MainPageCatalogue