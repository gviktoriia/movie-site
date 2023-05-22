import { Box, Button, Grid, Pagination, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import NavBar from '../NavBar/NavBar';
import CatalogueCard from '../CatalogueCard';

const movie_genre = {
  0: "Усі",
  28: "Бойовики",
  12: "Пригоди",
  16: "Мультфільми",
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


function NewFilmsPage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [films, setFilms] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedGenre, setSelectedGenre] = useState(null);

    const url_films = `https://api.themoviedb.org/3/movie/upcoming?api_key=767874e4be6a4070cadafe7de418a5cd&language=uk&page=${currentPage}`;

    useEffect(() => {
        fetchPopular();
    }, [currentPage, selectedGenre]);

    const fetchPopular = async () => {
      const url = selectedGenre !== null 
      ? `https://api.themoviedb.org/3/movie/upcoming?api_key=767874e4be6a4070cadafe7de418a5cd&language=uk&sort_by=popularity.desc&with_genres=${selectedGenre}&page=${currentPage}`
      : url_films;
        const data = await fetch(url);
        const movies = await data.json();
        console.log(movies);
        setFilms(movies.results);
    }

  return (
    <><Box sx={{backgroundColor:"#080620", height:"fit-content", minHeight: "90vh",}}>
        <Header handleMenu={() => setIsMenuOpen(true)} />
        <NavBar menuOpen={isMenuOpen} closeMenu={() => setIsMenuOpen(false)}/>
        <Typography sx={{ textAlign: 'center', fontSize: '30px', paddingTop: '15vh', }}>Новинки</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', paddingTop: '2rem' }}>
          {Object.entries(movie_genre).map(([id, genre]) => (
            <Button key={id}
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
            onClick={() => setSelectedGenre(id === '0' ? null : id)}>
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
                        isMovie={true}
                        title={movie.title} year={movie.release_date.slice(0, 4)} type={movie_genre[movie.genre_ids[0]]} />
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

export default NewFilmsPage