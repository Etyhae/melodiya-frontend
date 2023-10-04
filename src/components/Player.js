import React, { useState, useEffect } from "react";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import {
  BiSkipNext,
  BiSkipPrevious,
  BiSolidVolumeFull,
  BiSolidVolumeLow,
  BiSolidVolumeMute,
} from "react-icons/bi";
import { IconContext } from "react-icons";

const useAudio = (url) => {
  const [audio] = useState(new Audio(url));
  const [isPlaying, setPlaying] = useState(false);

  const toggle = () => setPlaying(!isPlaying);

  const [volume, setVolume] = useState(1.0);
  const changeVolume = (event) => {
    setVolume((audio.volume = event.target.value));
  };
  useEffect(() => {
    isPlaying ? audio.play() : audio.pause();
  }, [isPlaying, audio]);

  useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  }, [audio]);

  return [isPlaying, toggle, volume, changeVolume];
};

const useClickHandler = () => {
  const toggleHide = () => setHidden(!toHide);

  const [toHide, setHidden] = useState(true);
  return [toHide, toggleHide];
};

const Player = ({ url, size }) => {
  const [isPlaying, toggle, volume, changeVolume] = useAudio(url);

  const getIcon = (volume) => {
    //поменять название
    if (volume == 0) {
      return <BiSolidVolumeMute />;
    } else if ((volume <= 0.5) & (volume > 0)) {
      return <BiSolidVolumeLow />;
    } else if (volume >= 0.5) {
      return <BiSolidVolumeFull />;
    }
    return <BiSolidVolumeFull />;
  };

  const [toHide, toggleHide] = useClickHandler();

  return (
      <div className="flex flex-row align-middle overflow-hidden">
        <button className="playButton">
          <IconContext.Provider value={{ size: size + "vh", color: "#27AE60" }}>
            <BiSkipPrevious />
          </IconContext.Provider>
        </button>
        {!isPlaying ? (
          <button className="playButton" onClick={toggle}>
            <IconContext.Provider
              value={{ size: size + "vh", color: "#27AE60" }}
            >
              <AiFillPlayCircle />
            </IconContext.Provider>
          </button>
        ) : (
          <button className="playButton" onClick={toggle}>
            <IconContext.Provider
              value={{ size: size + "vh", color: "#27AE60" }}
            >
              <AiFillPauseCircle />
            </IconContext.Provider>
          </button>
        )}
        <button className="playButton">
          <IconContext.Provider value={{ size: size + "vh", color: "#27AE60" }}>
            <BiSkipNext />
          </IconContext.Provider>
        </button>
        <button className="playButton scale-75" onClick={toggleHide}>
          <IconContext.Provider value={{ size: size + "vh", color: "#27AE60" }}>
            {getIcon(volume)}
          </IconContext.Provider>
        </button>
        <input
          type="range"
          onChange={changeVolume}
          min={0}
          max={1.0}
          step={0.01}
          value={volume}
          className={`${toHide ? "invisible" : "visible"} flex bg-none border-none align-top`}
        />
      </div>
  );
};

export default Player;
