import { Card, CardContent, CardMedia, Typography, CardActionArea } from "@mui/material"

const Character = ({character}) => {
    return (
      <div className="card">
        <Card sx={{ minWidth: 250, maxWidth: 500, color: "primary.main"}}>
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
                class: {character.subclass.length === 0 ? 
                        ("n/a") : character.subclass.map(s => s + '  ')} 
                <br></br> 
                <i>by {character.publicUserName}</i>
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    )
}

export default Character