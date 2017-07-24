import { Howl } from 'howler';

export const getSoundDetailId = routerReducer => routerReducer.location.pathname.replace('/sound/', '');

export const playSound = (audioSrc) => {
  const sound = new Howl({
    src: [audioSrc],
  });

  sound.play();
};
