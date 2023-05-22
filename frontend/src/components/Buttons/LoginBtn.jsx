import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { login_route } from '../Routing/Routes';
import React from 'react';

const linkStyle = {
  textDecoration: "none",
  verticalAlign: 'center',
  marginLeft: 'auto',
};

function LoginBtn() {
  return (
    <Link to={login_route} style={linkStyle}>
      <Button variant="contained"
        sx={{ backgroundColor:"#FCA311",
              color: "black",
              textTransform: "none",
              borderRadius: "1.875rem",
              fontFamily: 'Montserrat',
              fontSize: "1.375rem",
              fontWeight: 600,
              lineHeight: "1.688rem",
              '&:hover': {
                backgroundColor: 'white',
              }
        }}>Увійти</Button>
    </Link>
  )
}

export default LoginBtn