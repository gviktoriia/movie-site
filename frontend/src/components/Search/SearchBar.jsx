import React, { useState } from 'react'
import { IconButton, Input, InputAdornment } from '@mui/material'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (event) => {
    if (event.key === 'Enter' && searchTerm.trim() !== '') {
      navigate(`/search/${searchTerm}`); 
    }
  };
  console.log(searchTerm);  

  return (
    <Input variant="standart" 
      placeholder="Шукати..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      onKeyPress={handleSearch}
      sx={{fontFamily: 'Montserrat',
          fontStyle: 'normal',
          fontWeight: 200,
          fontSize: "1rem",
          lineHeight: "1.25rem",
          verticalAlign: 'center',
          marginLeft: "auto",
          color: "white",
          borderBottom: 'white',
      }}
      endAdornment={<InputAdornment position="end" sx={{ color: "white" }}>
      <IconButton onClick={ () => {handleSearch();}}>
        <SearchOutlinedIcon sx={{ color: "white" }} />
      </IconButton>
    </InputAdornment>}/>
  )
}

export default SearchBar