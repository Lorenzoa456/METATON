import React from 'react';
import {
  Container,
  Typography,
  Box,
  List,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddMusic from './AddMusic';
const musics = [
{
  id: 0,
  name: 'Death by Glamour',
  author: 'Tobifox',
},
  {
  id: 1,
  name: 'Show',
  author: 'ADO',
}, {
  id: 2,
  name: 'Idol',
  author: 'Yoasobi',
}, {
  id: 3,
  name: 'FightSong',
  author: 'E ve',
}, {
  id: 4,
  name: 'Hollow Hunger',
  author: 'Oxt',  
}, {
  id: 5,
  name: 'DATABASE',
  author: 'MAN WITH A MISSION',
},{
  id: 6,
  name: 'Zoltraak',
  author: 'Evan Call',
},{
  id: 7,
  name: 'Life Will Change',
  author: 'Lyn',
},{
  id: 8,
  name: 'Layers',
  author: 'Hiroyuki Sawano',
},
{
  id: 9,
  name: 'King',
  author: 'Kanaria',
},
];

const background = {
  paddingTop:"1rem",
  paddingBottom:"1rem",
  border: '5px solid white',
  height: "30rem",
  width: "30rem",
};

const TitleStyle = {
  display: "flex",
  justifyContent: "center",
  marginBottom: "16px",
  fontFamily: "DeterminationSansWeb",
  fontSize: "30px"
};

const ListItemStyle = {
  display: "flex",
  alignItems: "center",
  border: "1px solid #000",
  padding: "8px",
  marginBottom: "8px",
  borderRadius: "4px",
  position: 'relative',
  '&.Mui-selected': {
    backgroundColor: "#ffffff", // Change the background color when selected
    color: "#000000",
    '&:hover': {
      backgroundColor: "#ffffff", // Change the background color on hover
      color: "#000000",
    }
  },
  '&:hover': {
    backgroundColor: "#ffffff", // Change the background color on hover
    color: "#000000",
  }
};

const MusicTextStyle = {
  marginBottom: "-4px",
  fontFamily: "DeterminationSansWeb"
};

const AuthorTextStyle = {
  fontFamily: "DeterminationSansWeb"
};

const MusicList = ({ onMusicSelect }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(null);
  
  const handleListItemClick = (event, index, name, author) => {
    setSelectedIndex(index);
    onMusicSelect(name, author);
  };

  return (
    <Container sx={background}>
      <Typography sx={TitleStyle}>MusicList</Typography>
      <Box sx={{ maxHeight: '325px', overflowY: 'auto',}}>
        <List>
          {musics.map((music, index) => (
            <ListItemButton 
              key={music.id} 
              sx={ListItemStyle}
              selected={selectedIndex === index}
              onClick={(event) => handleListItemClick(event, index, music.name, music.author)}
            >
              <Box sx={{display: "flex", alignItems: "center", flexGrow: 1}}>
                <AudiotrackIcon sx={{fontSize: "2.5rem", marginRight: "0.5rem"}}/>
                <Box sx={{display: "flex", flexDirection: "column", alignItems: "flex-start", flexGrow: 1}}>
                  <Typography sx={{fontFamily: "DeterminationSansWeb", marginBottom: "-4px", fontSize: "1.5rem"}}>{music.name}</Typography>
                  <Typography sx={{fontFamily: "DeterminationSansWeb", fontSize: "1.2rem"}}>{music.author}</Typography>
                </Box>
                <MoreVertIcon sx={{fontSize: "2rem", position: 'absolute', right: '8px'}}/>
              </Box>
            </ListItemButton>
          ))}
        </List>
      </Box>
      <hr
        style={{
            margin: 0,
            color: "#ffffff",
            backgroundColor: "#ffffff",
            height: 5,
            marginTop: "0.5rem",
            marginBottom: "0.5rem",
        }}
    />
      <AddMusic/>
    </Container>
  );
};

export default MusicList;
