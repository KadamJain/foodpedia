import React, { useState } from 'react'
import { AppBar, Button,Container, Grid, TextField, Typography } from '@mui/material'
import FastfoodIcon from '@mui/icons-material/Fastfood';
import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/system';
import Axios from 'axios'
import Recipies from './Recipies'
import foodloader from './images/loader.gif'
import notfound from './images/notfound.gif'
const APP_ID = process.env.REACT_APP_ID
const APP_KEY = process.env.REACT_APP_KEY

function Header() {
  const [query, setQuery] = useState('');
  const [text, setText]= useState('')
  const [data, setData] = useState([]);
  const [loader, setLoader]= useState(false);
  const [found, setFound]= useState(false);


  function setvalue(e) {
    setQuery(e.target.value);
  }

  async function getdata() {
    setFound(false)
    setText('')
    setData([]);
    setLoader(true)
    setText('Recipies are on the way...')
    if (query) {
      const resp = await Axios.get(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
      console.log(resp);
      if(!resp.data.count){
        setLoader(false)
        setText('Sorry! No Recipe found')
        setFound(true);
        return
      }
      setData(resp.data.hits);
    }
    else alert("Field can't be empty");
    setLoader(false)
    setText('Yay! Look we found some Delicious Recipies')

  }



  return (
      <Container>
      <Grid container>
        <AppBar xs={12} style={{height:'300px', background: "#ff3f34", display: 'flex', justifyContent: 'center', alignItems: 'center' }}  position='relative'>
          <Grid item xs={12}>
            <Typography variant='h3'><FastfoodIcon sx={{ fontSize: '50px' }} />&nbsp;FOODPEDIA</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField style={{ width: '265px', marginRight: '5px' }} value={query} type='search' label='Search Reciepe' size='small' onChange={setvalue} />
            <Button variant='contained' onClick={getdata} ><SearchIcon /></Button>
          </Grid>
        </AppBar>
      </Grid>
      <Typography variant='h5' textAlign='center' mt={2}>{text}</Typography>
      <Box sx={{display:'flex', justifyContent: 'center'}}>
      {loader && <img src={foodloader} width='25%' alt='Loading'/>}
      {found && <img src={notfound} width='25%' alt='not found'/>}
      </Box>
      {data && <Recipies all={data}/>}

    </Container>
  )
}

export default Header
