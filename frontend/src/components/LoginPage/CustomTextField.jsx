import React from 'react'
import {Grid, TextField} from "@mui/material"

function CustomTextField(props) {
  return (
    <Grid textAlign='center' paddingTop="6vh">
        <TextField id="outlined-basic" label={props.title} variant="outlined" type={props.type}
        name={props.name}
        onChange={props.onChange}
        sx={{backgroundColor: "white", 
        borderRadius: "10px", 
        width: { xs: 210, sm: 390, md: 420, xl: 450 },
        "& .MuiInputBase-root": {height: 50}, 
        justifyContent: 'center'}}/>
    </Grid>
  )
}

export default CustomTextField