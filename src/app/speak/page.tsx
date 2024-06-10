/* eslint-disable jsx-a11y/media-has-caption */
"use client";

import * as googleTTS from "@sefinek/google-tts-api";
import { useEffect, useRef, useState } from "react";

export default function Speak() {
  const [audioUrl, setAudioUrl] = useState("");
  const audioRef = useRef<HTMLAudioElement>(null); // Specify the type here

  const playAudio = () => {
    audioRef.current?.play();
  };

  const pauseAudio = () => {
    audioRef.current?.pause();
  };

  const getUrl = async () => {
    const url = await googleTTS.getAudioUrl("Hello world!", {
      lang: "en",
      slow: false,
      host: "https://translate.google.com",
    });
    setAudioUrl(url);
    console.log(url);
  };

  useEffect(() => {
    getUrl();
  }, []); // Add an empty dependency array here

  return (
    <>
      <div>
        <h1>React Audio Player</h1>
        <audio
          ref={audioRef}
          src={
            "https://translate.google.com/translate_tts?ie=UTF-8&q=Hello%20world!&tl=en&total=1&idx=0&textlen=12&client=tw-ob&prev=input&ttsspeed=1"
          }
          controls
        />
        <div>
          <button onClick={playAudio}>Play</button>
          <button onClick={pauseAudio}>Pause</button>
        </div>
      </div>
    </>
  );
}
