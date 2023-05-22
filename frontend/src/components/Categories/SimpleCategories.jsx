import { Link, Typography } from '@mui/material'
import React from 'react'

function SimpleCategories() {
  const simpleCategories = ["Фільми", "Серіали", "Новинки"]

  return (
      <Typography sx={{
        fontFamily: 'Montserrat',
        fontStyle: 'normal',
        fontSize: "1.25rem",
        lineHeight: "1.5rem",
        fontWeight: 500,
        verticalAlign: 'center',
        }}>
        {simpleCategories.map((simpleCategory, index) => (
          <Link href={"/" + simpleCategory.toLowerCase()} 
          underline="none" color="inherit" key={index}
          sx={{
            marginLeft: "20px",
            "&:hover": {
              fontSize: "22px",
            }
          }} 
          >{simpleCategory}</Link>
        ))}
      </Typography>
  )
}

export default SimpleCategories
