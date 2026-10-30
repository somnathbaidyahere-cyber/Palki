"use client";

import { Howl } from "howler";

const sounds = {
  discount: new Howl({
    src: ["/sounds/discount-reveal.mp3"],
    volume: 0.75,
    preload: true,
  }),
   codeCopied: new Howl({
    src: ["/sounds/cuopon-copied.mp3"],
    volume: 0.75,
    preload: true,
  }),
};

export const playSound = (name) => {
  sounds[name]?.play();
};