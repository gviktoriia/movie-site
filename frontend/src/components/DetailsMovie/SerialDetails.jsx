import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import NavBar from '../NavBar/NavBar';
import CastCard from './CastCard';
import SaveMovie from './SaveMovie';
import axios from 'axios';

function SerialDetailPage() {
  const { id } = useParams();
  const [auth, setAuth] = useState(false)
  const [message, setMessage] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [show, setShow] = useState(null);
  const [video, setVideo] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  axios.defaults.withCredentials = true;

    useEffect(() => {
      axios.get('http://localhost:8081/')
      .then(res => {
        if(res.data.Status === "Success") {
          setAuth(true)
        } else{
          setAuth(false)
          setMessage(res.data.Error)
        }
      })
      .then(err => console.log(err));
    }, [])

    useEffect(() => {
      function handleResize() {
        setWindowWidth(window.innerWidth)
      }
      window.addEventListener('resize', handleResize)
    })

  useEffect(() => {
    const fetchShow = async () => {
      const url = `https://api.themoviedb.org/3/tv/${id}?api_key=767874e4be6a4070cadafe7de418a5cd&language=uk`;
      const data = await fetch(url);
      const showData = await data.json();
      setShow(showData);
    };

    fetchShow();
  }, [id]);

  async function fetchShowVideo(id) {
    const videoResponse = await fetch(`https://api.themoviedb.org/3/tv/${id}/videos?api_key=767874e4be6a4070cadafe7de418a5cd&language=uk`);
    const videoData = await videoResponse.json();
    console.log(videoData);
    return videoData;
  }

  useEffect(() => {
    async function fetchVideo() {
      const videoData = await fetchShowVideo(id);
      setVideo(videoData); 
      console.log(videoData);
    }
    fetchVideo();

  }, [id])

  if (!show || !video) {
    return null; 
  }

  return (
    <>
      <Box sx={{height:"fit-content", minHeight: "110vh",
                backgroundImage: `url(${`https://image.tmdb.org/t/p/w500${show.poster_path}`})`,
                position: 'relative',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
      }}>
        <Header handleMenu={() => setIsMenuOpen(true)}/>
        <NavBar menuOpen={isMenuOpen} closeMenu={() => setIsMenuOpen(false)}/>
        <Box sx={{ padding: '2rem' }}>
          <Box sx={{ display: 'flex' }}>
            {windowWidth<1000 ? null : <Box sx={{ paddingRight: '2rem', marginTop: "30px", }}>
              <img src={`https://image.tmdb.org/t/p/w500${show.poster_path}`} alt={show.name} 
              style={{ boxShadow: "0 0 30px 12px black", }}/>
            </Box>}
            <Box backgroundColor='rgba(0,0,0,0.7)' height='fit-content' sx={{borderRadius: "30px", marginTop: "80px",}}>
              <Typography variant='h4' gutterBottom padding="30px" textAlign='center' color="#FCA311">
              {show.name}
              </Typography>
              <Typography variant='subtitle1' gutterBottom paddingLeft="50px" paddingRight="50px" textAlign='center'>
                Рік: {show.first_air_date}
              </Typography>
              <Typography variant='subtitle1' gutterBottom paddingLeft="50px" paddingRight="50px" textAlign='center'>
                Жанр: {show.genres.map((genre) => genre.name).join(', ')}
              </Typography>
              <Typography variant='subtitle1' gutterBottom paddingLeft="50px" paddingRight="50px" textAlign='center'>
                Рейтинг: {show.vote_average} ({show.vote_count} голосів)
              </Typography>
              <Typography variant='subtitle1' gutterBottom paddingLeft="50px" paddingRight="50px"
              padding="30px" textAlign='center'>
                {show.overview}
              </Typography>
              {auth ? <Box sx={{justifyContent: 'center', display: 'flex', marginBottom: '30px',}}>
                <SaveMovie id={id} type="tv" />
              </Box> : null}
              <CastCard isMovie={false} id={id} />
              {video.results.length > 0 && (
                <Box sx={{display: 'flex', justifyContent: 'center', marginBottom: "30px"}}>
                  <iframe
                    title={video.results[0].name}
                    width="560"
                    height="300"
                    frameBorder="0"
                    src={`https://www.youtube.com/embed/${video.results[0].key}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
}

export default SerialDetailPage;