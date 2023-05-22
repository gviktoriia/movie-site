import React from 'react'
import logo from "../../img/logo.png"
import { Box } from '@mui/system'
import { Link } from 'react-router-dom';
import { home_route } from '../Routing/Routes';

const linkStyle = {
  textDecoration: "none",
  verticalAlign: 'center',
  marginLeft: 'auto',
};

function Logo() {
  return (
    <Link to={home_route} style={linkStyle}>
      <Box
        component = "img"
        sx={{ height:48, 
          verticalAlign: 'center', 
          textAlign: 'left',
          marginLeft: '3%'
        }}
        alt="Logo"
        href=""
        src={logo} 
      />
    </Link>  
  )
}

export default Logo