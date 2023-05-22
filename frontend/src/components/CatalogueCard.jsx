import { Card, CardActionArea, CardMedia, Typography, CardContent } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'


function CatalogueCard(props) {
  const linkPrefix = props.isMovie ? '/movies' : '/serials';
  return (
    <Card sx={{ borderRadius: "30px", "&:hover":{
      opacity: "50%",
    } }}>
      <Link to={`${linkPrefix}/${props.id}`}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="100%"
            image={props.image}
            alt={props.title}
          />
          <CardContent sx={{
              background: 'rgb(0, 0, 0, 0.8)',
          }}>
            <Typography sx={{
            color: "#FCA311",
            fontSize: "20px",
            fontWeight: 500,
            fontFamily: "Montserrat",
            textDecorationLine: 'underline',
              }}>
              {props.title}
              </Typography>
              <Typography sx={{
                  color: 'white',
                  fontSize: "16px",
                  fontWeight: 400,
                  fontFamily: "Montserrat",
              }}>
                  {props.year}, {props.type}
              </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>

  )
}

export default CatalogueCard