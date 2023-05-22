import { Card, CardMedia, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { ScrollingCarousel } from '@trendyol-js/react-carousel';

function CastCard(props) {
    const [cast, setCast] = useState(null);
    const linkPrefix = props.isMovie ? '/movie' : '/tv';

    async function fetchMovieCast(id) {
        const castResponse = await fetch(`https://api.themoviedb.org/3/${linkPrefix}/${id}/credits?api_key=767874e4be6a4070cadafe7de418a5cd&language=uk`);
        const castData = await castResponse.json();
        const castArray = castData.cast; 
        return castArray;
      }
  
      useEffect(() => {
        async function fetchCast() {
          const castData = await fetchMovieCast(props.id);
          setCast(castData);
        }
        fetchCast();
      }, [props.id]);

  return (
    <>
        {cast && 
        <Grid container justifyContent="flex-start" mb="30px">
        <ScrollingCarousel >
            {cast.map(actors => {
                return (
                <Grid item key={actors.id}>
                <Card>
                    {actors.profile_path && <CardMedia
                    component="img"
                    height="140"
                    image={`https://image.tmdb.org/t/p/w500${actors.profile_path}`}/>}
                </Card>
                </Grid>)
            })}
        </ScrollingCarousel>
        </Grid>
    }
    </>
  )
}

export default CastCard