import React from 'react'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { profile_route } from '../Routing/Routes'

const linkStyle = {
    textDecoration: "none",
    verticalAlign: 'center',
    marginLeft: 'auto',
};

function LoginAction() {
  return (
    <Button variant="contained" type='submit'
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
  )
}

export default LoginAction