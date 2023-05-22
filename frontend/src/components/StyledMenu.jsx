import { styled } from '@mui/system';
import { Menu } from '@mui/material';

const StyledMenu = styled((props) => (
  <Menu 
  PaperProps={{
    elevation: 0,
    sx: {
      color: "white",
      backgroundColor: "black",
      overflow: 'visible',
      mt: 1.5,
    }
  }}
  transformOrigin={{
    horizontal: 'right',
    vertical: 'top'
  }}
  {...props}
  />
)) (({theme}) => ({
  '&:before': {
    content:'""',
    display: 'block',
    position: 'absolute',
    top: 0,
    right: 14,
    width: 10,
    height: 10,
    transform: 'translateY(-50%) rotate(45deg)',
    zIndex: 0,
    color: "white",
    backgroundColor: "black"
  }
}))

export default StyledMenu