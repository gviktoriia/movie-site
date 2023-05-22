import { Box, Link, Grid, Typography } from '@mui/material'
import React from 'react'
import SimpleCategories from '../Categories/SimpleCategories'
import Logo from '../Logo/Logo'

function Footer() {

  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth)

  React.useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
  })

  return (
    <Box sx={{
      backgroundColor: "#050413",
    }}>
      <Grid container  paddingTop="2%" direction="row" justifyContent='center'
      sx={{
        textAlign: 'center',
        width: "100%",
        margin: "0",
        direction: "row",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <Grid item xs={5} md={2}>
          <Logo />
        </Grid>
        {windowWidth>1000 ? (<Grid item xs={8}>
          <SimpleCategories />
        </Grid>) : null}
        <Grid item xs={5} md={2}>
          <Link href='#' color="inherit" underline="none" sx={{
            fontSize: "20px",
            fontFamily: 'Montserrat',
            fontWeight: 500,
            "&:hover": {
              fontSize: "22px",
            }
          }}>Підтримка</Link>
        </Grid>
      </Grid>
      <Typography textAlign='center' paddingBottom="1.5%" paddingTop="2%">© 2023 Movie.tv</Typography>
    </Box>
  )
}

export default Footer