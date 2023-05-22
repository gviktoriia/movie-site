import React, { useState } from 'react'
import {Box, Grid, Typography} from "@mui/material"
import CustomTextField from '../LoginPage/CustomTextField'
import { Link, useNavigate } from 'react-router-dom'
import { login_route } from '../Routing/Routes'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import NavBar from '../NavBar/NavBar'
import SignupAction from '../Buttons/SignupAction'
import Validation from "../../SignupValidation"
import axios from 'axios'

const linkStyle = {
    color: 'white', 
    fontFamily: "Montserrat",
    fontWeight: 400,
    fontSize: "24px",
}

function SignupPage() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    confirm_password: ''
  })
  const navigate = useNavigate();
  const [errors, setErrors] = useState({})

  const handleInput = (event) => {
    setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const err = Validation(values);
    setErrors(err);
    if(err.name === "" && err.email === "" && err.password === "" && err.confirm_password === ""){
      axios.post('http://localhost:8081/signup', values)
      .then(res => {
        if(res.data.Status === "Success") {
          navigate('/login')
        } else{
          alert("Error");
        }
      })
      .catch(err => console.log(err));
    }
  }

  return (
    <>
    <Box backgroundColor="#080620" minHeight="100vh">
      <Header handleMenu={() => setIsMenuOpen(true)}/>
      <NavBar menuOpen={isMenuOpen} closeMenu={() => setIsMenuOpen(false)}/>
      <Typography sx={{
        fontFamily: "Montserrat",
        fontWeight: 500,
        fontSize: "34px",
        color: "white",
        textAlign: 'center',
        paddingTop: "18vh",
      }}>Реєстрація</Typography>
      <form action="" onSubmit={handleSubmit}>
        <CustomTextField title="Ім'я / Псевдонім" type="text" name='name' onChange={handleInput}/>
        {errors.name && <span style={{color: 'red', textAlign: 'center', display: 'block'}}>
          {errors.name}</span>}
        <CustomTextField title="E-mail" type="email" name='email' onChange={handleInput}/>
        {errors.email && <span style={{color: 'red', textAlign: 'center', display: 'block'}}>
          {errors.email}</span>}
        <CustomTextField title="Пароль" type="password" name='password' onChange={handleInput}/>
        {errors.password && <span style={{color: 'red', textAlign: 'center', display: 'block'}}>
          {errors.password}</span>}
        <CustomTextField title="Підтвердіть пароль" type="password" name='confirm_password' onChange={handleInput}/>
        {errors.confirm_password && <span style={{color: 'red', textAlign: 'center', display: 'block'}}>
          {errors.confirm_password}</span>}
        <Grid textAlign='center' paddingTop="8vh">
          <SignupAction />
        </Grid>
        <Typography sx={{
          fontFamily: "Montserrat",
          fontWeight: 300,
          fontSize: "22px",
          color: "white",
          textAlign: 'center',
          paddingTop: "8vh",
        }}>Уже зареєстровані?</Typography>
        <Grid textAlign='center' paddingTop="2vh" paddingBottom="10vh">
          <Link to={login_route} style={linkStyle}>Увійти</Link>
        </Grid>
      </form>
    </Box>
    <Footer />
    </>
  )
}

export default SignupPage