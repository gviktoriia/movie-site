import { Box, Grid, Typography, } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ProfilePhoto from '../ProfilePhoto/ProfilePhoto';
import FileUpload from '../ProfilePhoto/FileUpload';
import NavBar from '../NavBar/NavBar';
import SavedMovies from './SavedMovies';

function ProfilePage() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
  })

  const [auth, setAuth] = useState(false)
  const [message, setMessage] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [savedMovies, setSavedMovies] = useState([]);

  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8081/')
    .then(res => {
      if(res.data.Status === "Success") {
         setAuth(true)
         setName(res.data.name)
         setEmail(res.data.email)
       } else{
        setAuth(false)
        navigate('/');
        setMessage(res.data.Error)
      }
    })
    .catch(err => console.log(err));
  }, [])


  useEffect(() => {
        axios.get('http://localhost:8081/movies')
          .then(res => {
            if (res.data.Status === "Success") {
              setSavedMovies(res.data.data);
              console.log(res.data.data);
            } else {
              setMessage(res.data.Error);
            }
          })
          .catch(err => console.log(err));
  }, []);


  const size = {xs: '200px', md: '300px'}

  return (
    <>
    <Box sx={{backgroundColor:"#080620", height:"fit-content", minHeight: "100vh",}}>
        <Header handleMenu={() => setIsMenuOpen(true)} />
        <NavBar menuOpen={isMenuOpen} closeMenu={() => setIsMenuOpen(false)}/>
        {windowWidth>1000 ? (
        <>
        <Grid container direction='row' paddingTop="130px">
            <Grid item xs={6}>
                <ProfilePhoto ml='200px' width={size} height={size} />
                <FileUpload />
            </Grid>
            <Grid item xs={6}>
                <Typography sx={{fontFamily: 'Montserrat',
                                fontStyle: 'normal',
                                fontWeight: 500,
                                fontSize: '34px',
                                lineHeight: '41px',
                                color: '#FCA311',
                                marginTop: "50px"}}>{name}</Typography>
                <Typography sx={{fontFamily: 'Montserrat',
                                fontStyle: 'normal',
                                fontWeight: 400,
                                fontSize: '30px',
                                lineHeight: '41px',
                                marginTop: "50px"}}>{email}</Typography>
            </Grid>
        </Grid>
        <Typography sx={{fontFamily: 'Montserrat',
                                fontStyle: 'normal',
                                fontWeight: 400,
                                fontSize: '34px',
                                lineHeight: '41px',
                                marginTop: "80px",
                                textAlign: 'center',}}>
          Збережені фільми
        </Typography>
        {savedMovies.length > 0 ? <SavedMovies data={savedMovies} /> : 
        <Typography paddingTop="40px" textAlign="center" paddingBottom="40px" variant="h5">Ви не зберегли жодного фільму</Typography>}
        </>) : (
        <>
        <Grid container direction='column' paddingTop="130px">
            <Grid item>
                <ProfilePhoto ml='auto' width={size} height={size} mr='auto' display='block' />
                <FileUpload />
            </Grid>
            <Grid item sx={{
                textAlign: 'center',
            }}>
                <Typography sx={{fontFamily: 'Montserrat',
                                fontStyle: 'normal',
                                fontWeight: 500,
                                fontSize: '34px',
                                lineHeight: '41px',
                                color: '#FCA311',
                                marginTop: "50px"}}>{name}</Typography>
                <Typography sx={{fontFamily: 'Montserrat',
                                fontStyle: 'normal',
                                fontWeight: 400,
                                fontSize: '30px',
                                lineHeight: '41px',
                                marginTop: "50px"}}>{email}</Typography>
            </Grid>
        </Grid>
        <Typography sx={{fontFamily: 'Montserrat',
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '34px',
                lineHeight: '41px',
                marginTop: "80px",
                textAlign: 'center',}}>Збережені фільми</Typography>
        {savedMovies.length > 0 ? <SavedMovies data={savedMovies} /> : 
        <Typography paddingTop="40px" textAlign="center" paddingBottom="40px" variant="h5">Ви не зберегли жодного фільму</Typography>}
        </>
        )}
    </Box>
    <Footer />
    </>
  )
}

export default ProfilePage