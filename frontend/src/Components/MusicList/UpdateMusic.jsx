import React from 'react';
import {
  IconButton,
  Menu,
  MenuItem
} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ModalUpdateMusic from './ModalUpdateMusic';

const MenuItemStyle = {
  color: "#ffffff",
  fontFamily: "DeterminationSansWeb",
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

const MenuStyle = {
  '& .MuiPaper-root': {
    backgroundColor: "#000000",
    border: '3px solid white',
  }
};

const UpdateMusic = ({musicData, onMusicUpdated}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isModalOpen, setModalOpen] = React.useState(false);
  
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUpdateClick = () => {
    setModalOpen(true);
    handleClose(); // Close the menu when opening the modal
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <IconButton
        aria-label="menu"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon sx={{fontSize: "2rem", right: '8px', color: "#ffffff"}}/>
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        sx={MenuStyle}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleUpdateClick} sx={MenuItemStyle}>Update</MenuItem>
        <MenuItem onClick={handleClose} sx={MenuItemStyle}>Delete</MenuItem>
      </Menu>
      
      <ModalUpdateMusic open={isModalOpen} handleClose={handleModalClose} musicData={musicData} onMusicUpdated={onMusicUpdated}/>
    </>
  );
};

export default UpdateMusic;
