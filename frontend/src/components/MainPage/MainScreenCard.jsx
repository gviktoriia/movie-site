import { Card, CardActionArea, CardMedia, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

function MainScreenCard(props) {
  const linkPrefix = props.isMovie ? '/movies' : '/serials';
  return (
    <Link to={`${linkPrefix}/${props.id}`}>
      <Card sx={{ maxWidth: "320px",
                  borderRadius: "50px",
                  "&:hover": {
                    opacity: "50%",
                  } }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="100%"
            image={props.image}
            alt={props.title}
          />
        </CardActionArea>
      </Card>
      <Typography sx={{
        color: "#FCA311",
        fontSize: "22px",
        fontWeight: 700,
        fontFamily: "Montserrat",
        textDecorationLine: 'underline',
        maxWidth: '300px',
      }}>
        {props.title}
      </Typography>
    </Link>
  )
}

export default MainScreenCard