let currentMusic = {};
let listMusic= {};
let musicState= false;

export const setListMusic = (listMusicData) => {
  listMusic = listMusicData;
};

export const getListMusic = () => {
  return listMusic;
};

export const setCurrentMusic = (musicData) => {
  currentMusic = musicData;
};

export const getCurrentMusic = () => {
  return currentMusic;
};

export const setMusicState = (state) => {
  musicState = state;
};

export const getMusicState = () => {
  return musicState;
};
