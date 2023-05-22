import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { signup_route } from '../Routing/Routes'

const linkStyle = {
    textDecoration: "none",
    verticalAlign: 'center',
    marginLeft: 'auto',
};

function SignupBtn() {
  return (
    <Link to={signup_route} style={linkStyle}>
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
        }}>Зареєструватись</Button>
    </Link>
  )
}

export default SignupBtn