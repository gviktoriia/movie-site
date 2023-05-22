import { Typography, Box, Grid } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react'
import Header from "../Header/Header"
import Footer from "../Footer/Footer"
import CustomTextField from './CustomTextField';
import NavBar from '../NavBar/NavBar';
import { signup_route } from '../Routing/Routes';
import LoginAction from '../Buttons/LoginAction';
import Validation from '../../LoginValidation';
import axios from 'axios';

const linkStyle = {
  color: 'white', 
  fontFamily: "Montserrat",
  fontWeight: 400,
  fontSize: "24px",
}

function LoginPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [values, setValues] = useState({
    email: '',
    password: ''
  })
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const [errors, setErrors] = useState({})
  const handleInput = (event) => {
    setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const err = Validation(values);
    setErrors(err);
    if(err.email === "" && err.password === "") {
      axios.post('http://localhost:8081/login', values)
      .then(res => {
        if(res.data.Status === "Success") {
          navigate('/profile');
        } else {
          alert(res.data.Error);
        }
      })
      .catch(err => console.log(err));
    }
  }

  return (
    <>
    <Box backgroundColor="#080620" height="100vh">
      <Header handleMenu={() => setIsMenuOpen(true)}/>
      <NavBar menuOpen={isMenuOpen} closeMenu={() => setIsMenuOpen(false)}/>
      <Typography sx={{
        fontFamily: "Montserrat",
        fontWeight: 500,
        fontSize: "34px",
        color: "white",
        textAlign: 'center',
        paddingTop: "18vh",
      }}>Вхід</Typography>
      <form action="" onSubmit={handleSubmit}>
        <CustomTextField title="E-mail" type="email" name='email' onChange={handleInput} />
        {errors.email && <span style={{color: 'red', textAlign: 'center', display: 'block'}}>
          {errors.email}</span>}
        <CustomTextField title="Пароль" type="password" name='password' onChange={handleInput} />
        {errors.password && <span style={{color: "red", textAlign: 'center', display: 'block'}}>
          {errors.password}</span>}
        <Grid textAlign='center' paddingTop="8vh">
          <LoginAction />
        </Grid>
      <Typography sx={{
        fontFamily: "Montserrat",
        fontWeight: 300,
        fontSize: "22px",
        color: "white",
        textAlign: 'center',
        paddingTop: "8vh",
      }}>Все-ще не маєте акаунта?</Typography>
      <Grid textAlign='center' paddingTop="2vh">
        <Link to={signup_route} style={linkStyle}>Зареєструватись</Link>
      </Grid>
      </form>
    </Box>
    <Footer />
    </>

  )
}

export default LoginPage;