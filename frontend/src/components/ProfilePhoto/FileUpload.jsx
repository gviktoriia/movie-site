import { Button, Grid, Input } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'

function FileUpload() {
  const [file, setFile] = useState(null);

  const handleFile = (e) => {
    setFile(e.target.files[0])
  }

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('image', file);
    axios.post('http://localhost:8081/upload', formData)
    .then(res => {
      if(res.data.Status === "Success"){ 
        console.log("Succeded");
        window.location.reload();
      }
      else {
        console.log("Failed");
      }
    })
    .catch(err => console.log(err));
  }

  return (
    <Grid container direction='column'>
        <Grid item xs={1} textAlign='center'>
          <Input type='file' accept="image/*" sx={{color: 'white', marginTop: '30px' }} onChange={handleFile}></Input>
        </Grid>
        <Grid item xs={1} textAlign='center'>
          <Button onClick={handleUpload} sx={{backgroundColor:"#FCA311",
              color: "black",
              textTransform: "none",
              borderRadius: "1.875rem",
              fontFamily: 'Montserrat',
              fontSize: "18px",
              fontWeight: 500,
              lineHeight: "20px",
              marginTop: '15px',
              '&:hover': {
                backgroundColor: 'white',
              }}}>Змінити фото</Button>
        </Grid>
    </Grid>
  )
}

export default FileUpload