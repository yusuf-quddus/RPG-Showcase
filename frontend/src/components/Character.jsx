import { Card, CardContent, CardMedia, Typography, CardActionArea } from "@mui/material"

const Character = ({character}) => {
    return (
        <Card sx={{ minWidth: 200, maxWidth: 400, color: "primary.main"}}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={`images/${character.img}`}
            />
            <CardContent >
              <Typography gutterBottom variant="h5" component="div">
                {character.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                level: {character.level} <br></br>
                race: {character.race} <br></br> 
                class: {character.subclass.length > 1 ? character.subclass.map(s => s + '  ') : 
                       character.subclass.map(s => s)} <br></br> 
                <i>by {character.publicUserName}</i>
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
    )
}

export default Character

/*
<div>
          <p>{character.name} a level {character.level} {character.race} {character.subclass.length > 1 ? 
              character.subclass.map(s => s + '  ') : 
              character.subclass.map(s => s)} 
          </p>
          <p><i>by {character.publicUserName}</i></p>
          <img src={`images/${character.img}`} width="200" height="auto" alt="test"/>
        </div>
*/