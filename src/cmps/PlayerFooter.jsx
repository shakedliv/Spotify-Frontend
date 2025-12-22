import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useMemo, useState } from "react";
import { useYoutubePlayer } from "../customHooks/useYoutubePlayer";
import { setIsPlaying } from "../store/actions/system.actions";
import { adaptTrackForPlayer } from "../services/track/track.util";

import { PlayIcon } from "../assets/svg/PlayIcon.jsx";
import { PauseIcon } from "../assets/svg/PauseIcon.jsx";
import { PrevIcon } from "../assets/svg/PrevIcon.jsx";
import { NextIcon } from "../assets/svg/NextIcon.jsx";
import { VolumeIcon } from "../assets/svg/VolumeIcon.jsx";
import { ShuffleIcon } from "../assets/svg/ShuffleIcon.jsx";
import { RepeatIcon } from "../assets/svg/RepeatIcon.jsx";
import { AddIcon } from "../assets/svg/AddIcon.jsx";
import { LyricsIcon } from "../assets/svg/LyricsIcon.jsx";
import { QueueIcon } from "../assets/svg/QueueIcon.jsx";
import { ConnectIcon } from "../assets/svg/ConnectIcon.jsx";
import { FullscreenIcon } from "../assets/svg/FullscreenIcon.jsx";
import { PictureInPictureIcon } from "../assets/svg/PictureInPictureIcon.jsx";

const FALLBACK_VIDEO_ID = "dQw4w9WgXcQ";

export function PlayerFooter() {
  const dispatch = useDispatch();

  const currentTrack = useSelector((state) => state.systemModule.currentTrack);
  const isPlaying = useSelector((state) => state.systemModule.isPlaying);
  const stations = useSelector((state) => state.stationModule.stations);

  const playerContainerRef = useRef(null);

  const {
    loadVideo,
    play,
    pause,
    currentTime,
    duration,
    seekTo,
    volume,
    setVolume,
  } = useYoutubePlayer(playerContainerRef);

  const [isSeeking, setIsSeeking] = useState(false);
  const [seekValue, setSeekValue] = useState(0);

  useEffect(() => {
    loadVideo(FALLBACK_VIDEO_ID);
  }, [loadVideo]);

  useEffect(() => {
    if (!currentTrack?.videoId) return;
    setSeekValue(0);
    loadVideo(currentTrack.videoId);
  }, [currentTrack?.videoId, loadVideo]);

  useEffect(() => {
    if (isPlaying) play();
    else pause();
  }, [isPlaying, play, pause]);

  useEffect(() => {
    if (!isSeeking) setSeekValue(currentTime);
  }, [currentTime, isSeeking]);

  const randomSpotifyTrack = useMemo(() => {
    if (!stations?.length) return null;
    const stationsWithTracks = stations.filter(
      (station) => Array.isArray(station.tracks) && station.tracks.length
    );
    if (!stationsWithTracks.length) return null;
    const station =
      stationsWithTracks[Math.floor(Math.random() * stationsWithTracks.length)];
    return station.tracks[Math.floor(Math.random() * station.tracks.length)];
  }, [stations]);

  const displayTrack = useMemo(() => {
    if (currentTrack) return currentTrack;
    if (!randomSpotifyTrack) return null;
    return adaptTrackForPlayer(randomSpotifyTrack);
  }, [currentTrack, randomSpotifyTrack]);

  function formatTime(seconds = 0) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${String(secs).padStart(2, "0")}`;
  }

  const progressPercent =
    duration > 0 ? `${(seekValue / duration) * 100}%` : "0%";

  const volumePercent = `${volume}%`;

  return (
    <footer className="player-footer">
      <div className="player-footer-left">
        {displayTrack && (
          <>
            <img src={displayTrack.imgUrl} alt="track cover" />
            <div className="track-info">
              <span className="track-title">{displayTrack.title}</span>
              <span className="track-artist">
                {displayTrack.artists.join(", ")}
              </span>
            </div>
            <button className="add-btn">
              <AddIcon />
            </button>
          </>
        )}
      </div>

      <div className="player-footer-center">
        <div className="player-controls">
          <button>
            <ShuffleIcon />
          </button>

          <button disabled={!currentTrack}>
            <PrevIcon />
          </button>

          {isPlaying ? (
            <button
              className="play-btn is-playing"
              onClick={() => dispatch(setIsPlaying(false))}
            >
              <PauseIcon />
            </button>
          ) : (
            <button
              className="play-btn"
              onClick={() => dispatch(setIsPlaying(true))}
            >
              <PlayIcon />
            </button>
          )}

          <button disabled={!currentTrack}>
            <NextIcon />
          </button>

          <button>
            <RepeatIcon />
          </button>
        </div>

        <div className="player-progress">
          <span>{formatTime(seekValue)}</span>

          <input
            type="range"
            min="0"
            max={duration || 0}
            value={seekValue}
            style={{ "--fill-percent": progressPercent }}
            onMouseDown={() => setIsSeeking(true)}
            onMouseUp={() => {
              seekTo(seekValue);
              setIsSeeking(false);
            }}
            onChange={(e) => setSeekValue(+e.target.value)}
          />

          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="player-footer-right">
        <button>
          <LyricsIcon />
        </button>
        <button>
          <QueueIcon />
        </button>
        <button>
          <ConnectIcon />
        </button>

        <VolumeIcon />
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          style={{ "--fill-percent": volumePercent }}
          onChange={(e) => setVolume(+e.target.value)}
        />
        <button>
          <PictureInPictureIcon />
        </button>
        <button>
          <FullscreenIcon />
        </button>
      </div>

      <div ref={playerContainerRef} style={{ display: "none" }} />
    </footer>
  );
}
