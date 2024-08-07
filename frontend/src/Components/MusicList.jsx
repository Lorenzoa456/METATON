import React from 'react';
import {
  Container,
  Typography,
  Box,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const musics = [{
  id: 0,
  name: 'Show',
  author: 'ADO',
}, {
  id: 1,
  name: 'Idol',
  author: 'Yoasobi',
}, {
  id: 2,
  name: 'FightSong',
  author: 'E ve',
}, {
  id: 3,
  name: 'Hollow Hunger',
  author: 'Oxt',  
}, {
  id: 4,
  name: 'DATABASE',
  author: 'MAN WITH A MISSION',
}];

const background = {
  backgroundColor: "#a6a0a0",
};

const TitleStyle = {
  display: "flex",
  justifyContent: "center",
  marginBottom: "16px"
};

const ListItemStyle = {
  display: "flex",
  alignItems: "center",
  border: "1px solid #000",
  padding: "8px",
  marginBottom: "8px",
  borderRadius: "4px",
  backgroundColor: "#f5a609",
  position: 'relative',
  '&.Mui-selected': {
    backgroundColor: "#ff7b00", // Change the background color when selected
    '&:hover': {
      backgroundColor: "#fe9838", // Change the background color on hover
    }
  },
  '&:hover': {
    backgroundColor: "#f7bc5d", // Change the background color on hover
  }
};

const MusicTextStyle = {
  marginBottom: "-4px"
};

const AuthorTextStyle = {};

const MusicList = ({ onMusicSelect }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(null);
  
  const handleListItemClick = (event, index, name, author) => {
    setSelectedIndex(index);
    onMusicSelect(name, author);

  };

  return (
    <Container sx={background}>
      <Typography sx={TitleStyle}>MusicList</Typography>
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
                <ListItemText primary={music.name} sx={MusicTextStyle}/>
                <ListItemText primary={music.author} sx={AuthorTextStyle}/>
              </Box>
              <MoreVertIcon sx={{fontSize: "2rem", position: 'absolute', right: '8px'}}/>
            </Box>
          </ListItemButton>
        ))}
      </List>
    </Container>
  );
};

export default MusicList;
