import { Box, Button, Grid, Pagination, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import NavBar from '../NavBar/NavBar'
import CatalogueCard from '../CatalogueCard'

const movie_genre = {
  0: "Усі",
  10759: "Бойовики & Пригоди",
  16: "Мультфільми",
  35: "Комедії",
  80: "Кримінал",
  99: "Документальні",
  18: "Драма",
  10751: "Сімейні",
  10762: "Дитячі",
  10763: "Новини",
  10764: "Реаліті",
  10765: "Наукова фантастика & Фентезі",
  10766: "Мильна опера",
  10767: "Ток-шоу",
  10768: "Війна & Політика",
  37: "Вестерн",
}


function SerialsPage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [films, setFilms] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedGenre, setSelectedGenre] = useState(null);

    const url_films = `https://api.themoviedb.org/3/tv/top_rated?api_key=767874e4be6a4070cadafe7de418a5cd&language=uk&page=${currentPage}`;

    useEffect(() => {
        fetchPopular();
    }, [currentPage, selectedGenre]);

    const fetchPopular = async () => {
      const url = selectedGenre !== null
        ? `https://api.themoviedb.org/3/discover/tv?api_key=767874e4be6a4070cadafe7de418a5cd&language=uk&sort_by=popularity.desc&with_genres=${selectedGenre}&page=${currentPage}`
        : url_films;
      const data = await fetch(url);
      const movies = await data.json();
      setFilms(movies.results);
      console.log(movies.results);
    };

  return (
    <><Box sx={{backgroundColor:"#080620", height:"fit-content", minHeight: "90vh",}}>
        <Header handleMenu={() => setIsMenuOpen(true)}/>
        <NavBar menuOpen={isMenuOpen} closeMenu={() => setIsMenuOpen(false)}/>
        <Typography sx={{ textAlign: 'center', fontSize: '30px', paddingTop: '15vh', }}>Серіали</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', paddingTop: '2rem' }}>
          {Object.entries(movie_genre).map(([id, genre]) => (
            <Button
              key={id}
              sx={{
                margin: '0.5rem',
                borderRadius: "30px",
                backgroundColor: selectedGenre === id ? 'primary.main' : 'transparent',
                color: selectedGenre === id ? 'white' : 'primary.main',
                '&:hover': {
                  backgroundColor: 'primary.main',
                  color: 'white',
                },
              }}
              variant={selectedGenre === id ? 'contained' : 'outlined'}
              onClick={() => setSelectedGenre(id === '0' ? null : id)}
            >
              {genre}
            </Button>
          ))}
        </Box>
        <Grid container spacing={4} sx={{
                  textAlign: 'center',
                  width: "100%",
                  paddingBottom: "3%",
                  margin: "0",
                  direction: "row",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
            {films.map(movie => {
                    return (<Grid item lg={3.5}>
                        <CatalogueCard key={movie.id} movie={movie} id={movie.id}
                        image={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
                        isMovie={false}
                        title={movie.name} year={movie.first_air_date.slice(0, 4)} type={movie_genre[movie.genre_ids[0]]} />
                    </Grid>);
                })}
        </Grid>
        <Stack alignItems='center' paddingBottom="20px">
          <Pagination count={10} page={currentPage} onChange={(event, page) => setCurrentPage(page)}
          sx={{button:{color: 'white', }}}
          variant='outlined' color='primary' size='large' />
        </Stack>
    </Box>
    <Footer />
    </>
  )
}

export default SerialsPage