let currentMusic = {};

export const setCurrentMusic = (musicData) => {
  currentMusic = musicData;
};

export const getCurrentMusic = () => {
  return currentMusic;
};
