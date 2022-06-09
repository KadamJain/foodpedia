import * as React from 'react';
import Card from '@mui/material/Card';
import {Typography,Button, Link,CardContent,CardMedia,CardHeader,CardActions, ListItem, List} from '@mui/material';
import { Box } from '@mui/system';
import Noimg from './images/Noimg.png'

export default function Recipies({all}) {
  const [arr, setArr]= React.useState([]);
  return (
      <Box sx={{display: 'flex', flexWrap: 'wrap',justifyContent: 'space-between', marginBottom: '15px'}}>
      {
          all.map((item,index)=>{ 
            return <Card sx={{ maxWidth: 345, marginTop:'15px'}} key={index} >
            <CardHeader
              title={item.recipe.label}
              subheader={`${item.recipe.dishType[0]} (${item.recipe.mealType[0]})` }
            />
            <CardMedia
              component="img"
              height="194"
              image={item.recipe.image || Noimg}
              alt="Paella dish"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                This {item.recipe.label} reciepe can be prepared using only {item.recipe.ingredients.length} simple ingredients. The step-by-step guide for this reciepe can be accessed through the button below
              </Typography>
            </CardContent>
            <CardActions>
            <Link href={item.recipe.url} color='inherit' underline="none" target='_blank'><Button variant='contained' style={{background: '#ff3f34'}}>View Reciepe</Button></Link>
            </CardActions>
          </Card>
          })
          
      }
      </Box>




  );
}
