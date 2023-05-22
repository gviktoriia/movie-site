import { Box, Grid, Pagination, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Header from '../Header/Header';
import NavBar from '../NavBar/NavBar';
import CatalogueCard from '../CatalogueCard';
import Footer from '../Footer/Footer';
import { useParams } from 'react-router-dom';


const movie_genre = {
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
    10759: "Бойовики & Пригоди",
    10762: "Дитячі",
    10763: "Новини",
    10764: "Реаліті",
    10765: "Наукова фантастика & Фентезі",
    10766: "Мильна опера",
    10767: "Ток-шоу",
    10768: "Війна & Політика",
}


function SearchPage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const [movies, setFilms] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const { searchTerm } = useParams();
    const url_films = `https://api.themoviedb.org/3/search/multi?api_key=767874e4be6a4070cadafe7de418a5cd&language=uk&page=${currentPage}&include_adult=false&query=${searchTerm}`;


    useEffect(() => {
      const fetchFilms = async () => {
        const data = await fetch(url_films);
        const movies = await data.json();
        setFilms(movies.results);
        console.log(movies.results);
      };
      fetchFilms();
    }, [searchTerm, currentPage]);

  return (
    <>
     <Box sx={{ backgroundColor: "#080620", height: "fit-content", minHeight: "90vh" }}>
        <Header handleMenu={() => setIsMenuOpen(true)} />
        <NavBar menuOpen={isMenuOpen} closeMenu={() => setIsMenuOpen(false)} />
        {movies.length === 0 ? (
          <Typography paddingTop="200px" textAlign="center" paddingBottom="40px" variant="h5">
            За запитом "{searchTerm}" фільмів не знайдено.
          </Typography>
        ) : (
          <>
            <Grid
              paddingTop="50px"
              container
              spacing={4}
              sx={{
                textAlign: "center",
                width: "100%",
                paddingBottom: "3%",
                margin: "0",
                direction: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {movies.map((movie) => (
                <Grid key={movie.id} item lg={3.5}>
                  <CatalogueCard
                    key={movie.id}
                    movie={movie}
                    id={movie.id}
                    isMovie={movie.media_type === "movie"}
                    image={movie.poster_path 
                      ? "https://image.tmdb.org/t/p/w500" + movie.poster_path 
                      : "data:image/png;base64,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"}
                    title={movie.title || movie.name}
                    year={(movie.release_date ? movie.release_date.slice(0, 4) : movie.first_air_date.slice(0, 4))}
                    type={Array.isArray(movie.genre_ids) ? movie_genre[movie.genre_ids[0]] : null}
                  />
                </Grid>
              ))}
            </Grid>
            <Stack alignItems="center" paddingBottom="20px">
              <Pagination
                count={1}
                page={currentPage}
                onChange={(event, page) => setCurrentPage(page)}
                sx={{ button: { color: "white" } }}
                variant="outlined"
                color="primary"
                size="large"
              />
            </Stack>
          </>
        )}
      </Box>
      <Footer />
    </>
  )
}

export default SearchPage