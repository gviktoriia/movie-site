import React, { useEffect, useState } from 'react'
import Logo from '../Logo/Logo'
import LoginBtn from '../Buttons/LoginBtn'
import SearchBar from '../Search/SearchBar'
import { AppBar, Toolbar, Grid, IconButton, Button } from '@mui/material'
import NavBar from '../NavBar/NavBar'
import { Dehaze } from "@mui/icons-material";
import axios from 'axios'
import SimpleCategories from '../Categories/SimpleCategories'
import ProfileMenu from './ProfileMenu'

function Header({handleMenu}) {
  const [auth, setAuth] = useState(false)
  const [message, setMessage] = useState('')
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

  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  React.useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
  })

  const handleLogout = () => {
    axios.get('http://localhost:8081/logout')
    .then(res => {
      window.location.reload(true);
    }).catch(err => console.log(err));
  }
  
  return (
        <React.Fragment>
          {auth ?
            <AppBar sx={{ background: 'rgb(0, 0, 0, 0.5)',  }}>
              <Toolbar>
                <Grid container sx={{
                  width: "100%",
                }}>
                  {windowWidth<1000 ? 
                  (<Grid item xs={3}>
                    <IconButton
                              size="large"
                              edge="start"
                              color="inherit"
                              aria-label="menu"
                              onClick={handleMenu}
                              sx={{ ml: 5}}>
                              <Dehaze />
                      </IconButton>
                  </Grid>) : null}
                  {windowWidth<1000 ? (<Grid item xs={3}>
                    <NavBar />
                    <Logo />
                  </Grid>) : (<Grid item xs={2}>
                    <NavBar />
                    <Logo />
                  </Grid>)}
                  {windowWidth>1000 ? (<Grid item xs={6} paddingTop="2vh">
                    <SimpleCategories />
                  </Grid>) : null}
                  {window.location.href.includes('profile') ? 
                  (<Grid item sx={2}>
                    <Button variant='text' sx={{color: 'white', fontSize:  '18px', marginTop: '6px'}} onClick={handleLogout}>
                      Вийти
                    </Button>
                  </Grid>)
                   : (<><Grid item xs={3} md={2} paddingTop="1vh">
                    <SearchBar />
                  </Grid>
                  <Grid item xs={2}>
                    <ProfileMenu />
                  </Grid></>)}
                </Grid>
              </Toolbar>
          </AppBar>
          :
          <AppBar sx={{ background: 'rgb(0, 0, 0, 0.5)',  }}>
              <Toolbar>
                <Grid container sx={{
                  width: "100%",
                }}>
                  {windowWidth<1000 ? 
                  (<Grid item xs={3}>
                    <IconButton
                              size="large"
                              edge="start"
                              color="inherit"
                              aria-label="menu"
                              onClick={handleMenu}
                              sx={{ ml: 5}}>
                              <Dehaze />
                      </IconButton>
                  </Grid>) : null}
                  {windowWidth<1000 ? (<Grid item xs={3}>
                    <NavBar />
                    <Logo />
                  </Grid>) : (<Grid item xs={2}>
                    <NavBar />
                    <Logo />
                  </Grid>)}
                  {windowWidth>1000 ? (<Grid item xs={6} paddingTop="2vh">
                    <SimpleCategories />
                  </Grid>) : null}
                  {window.location.href.includes('login') || window.location.href.includes('signup') ? null : 
                  (<Grid item xs={3} md={2} paddingTop="1vh">
                    <SearchBar />
                  </Grid>)}
                  {windowWidth<1000 ? (<Grid item xs={3}>
                    <LoginBtn />
                  </Grid>) : (<Grid item xs={2} paddingTop="1vh">
                    <LoginBtn />
                  </Grid>)}
                </Grid>
              </Toolbar>
          </AppBar>}
        </React.Fragment>
  )
}
  

export default Header