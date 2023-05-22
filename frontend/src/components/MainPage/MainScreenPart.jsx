import React from 'react'
import img from '../../img/main.png'
import { Box } from '@mui/material'
import MainPageCatalogue from './MainPageCatalogue';
import MainScreen from './MainScreen';

function MainScreenPart() {
  return (
    <Box sx={{
        backgroundImage: `url(${img})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        minHeight: "100vh",
    }}>
      <MainScreen />
      <MainPageCatalogue />
    </Box>
  )
}

export default MainScreenPart