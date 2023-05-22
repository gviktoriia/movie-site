import React from 'react'
import ProfilePhoto from '../ProfilePhoto/ProfilePhoto'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { Link } from 'react-router-dom'
import { profile_route } from '../Routing/Routes'
import { Button, Typography } from '@mui/material';
import axios from 'axios';

function ProfileMenu() {

    const handleLogout = () => {
        axios.get('http://localhost:8081/logout')
        .then(res => {
          window.location.reload(true);
        }).catch(err => console.log(err));
      }

  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
                      {(popupState) => (
                        <React.Fragment>
                          <Button sx={{color:'white', marginLeft: '30px'}} {...bindTrigger(popupState)} >
                            <ProfilePhoto width='50px' height='50px' />
                          </Button>
                          <Menu {...bindMenu(popupState)} PaperProps={{
                            style: {
                              backgroundColor: 'black',
                            }
                          }}>
                            <MenuItem onClick={popupState.close}><Link to={profile_route} style={{textDecoration: 'none', color:'white'}}>Мій профіль</Link></MenuItem>
                            <MenuItem onClick={() => {popupState.close(); handleLogout()}}><Typography sx={{color: 'white'}}>Вийти</Typography></MenuItem>
                          </Menu>
                        </React.Fragment>
                      )}
                    </PopupState>
  )
}

export default ProfileMenu