import { Avatar } from '@mui/material'
import axios from 'axios';
import { useEffect, useState } from 'react';

function ProfilePhoto(props) {

  const [message, setMessage] = useState('')
  const [avatar, setAvatar] = useState(null);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get('http://localhost:8081/')
    .then(res => {
      if(res.data.Status === "Success") {
         setAvatar(res.data.avatar)
       } else{
        setMessage(res.data.Error)
      }
    })
    .catch(err => console.log(err));
  }, [])

  
  return (
    <Avatar src={`http://localhost:8081/images/${avatar}`} 
    sx={{
      width: props.width,
      height: props.height,
      marginLeft: props.ml,
      marginRight: props.mr,
      display: props.display,
    }}></Avatar>
  )
}

export default ProfilePhoto