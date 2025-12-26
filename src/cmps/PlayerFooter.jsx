import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useMemo, useState, useCallback } from "react";
import { useYoutubePlayer } from "../customHooks/useYoutubePlayer";
import {
  setCurrentTrack,
  setIsPlaying,
  toggleRepeat,
  toggleShuffle,
} from "../store/actions/system.actions";
import { adaptTrackForPlayer } from "../services/track/track.util";

import { PlayIcon } from "../assets/svg/PlayIcon.jsx";
import { PauseIcon } from "../assets/svg/PauseIcon.jsx";
import { PrevIcon } from "../assets/svg/PrevIcon.jsx";
import { NextIcon } from "../assets/svg/NextIcon.jsx";
import { VolumeIcon } from "../assets/svg/VolumeIcon.jsx";
import { ShuffleIcon } from "../assets/svg/ShuffleIcon.jsx";
import { RepeatIcon } from "../assets/svg/RepeatIcon.jsx";
import { LyricsIcon } from "../assets/svg/LyricsIcon.jsx";
import { QueueIcon } from "../assets/svg/QueueIcon.jsx";
import { ConnectIcon } from "../assets/svg/ConnectIcon.jsx";
import { FullscreenIcon } from "../assets/svg/FullscreenIcon.jsx";
import { PictureInPictureIcon } from "../assets/svg/PictureInPictureIcon.jsx";
import { youtubeService } from "../services/youtube.service.js";
import { ActiveIndicator } from "../assets/svg/ActiveIndicator.jsx";
import { getRandomIntInclusive } from "../services/util.service.js";
import { RemoveFromLikedSongs } from "../assets/svg/RemoveFromLikedSongs.jsx";
import { AddToLikedSongs } from "../assets/svg/AddToLikedSongs.jsx";
import { toggleLikedSong } from "../store/actions/user.actions.js";

const FALLBACK_VIDEO_ID = "dQw4w9WgXcQ";

export function PlayerFooter() {
  const dispatch = useDispatch();
  const isShuffle = useSelector((state) => state.systemModule.isShuffle);
  const isRepeat = useSelector((state) => state.systemModule.isRepeat);
  const currentTrack = useSelector((state) => state.systemModule.currentTrack);
  const isPlaying = useSelector((state) => state.systemModule.isPlaying);
  const tracks = useSelector((state) => state.systemModule.tracks);
  const user = useSelector((state) => state.userModule.user);
  const isLiked = !!user?.likedSongs?.some((t) => t.id === currentTrack?.id);
  const currentTrackIndex = useSelector(
    (state) => state.systemModule.currentTrackIndex
  );
  const stations = useSelector((state) => state.stationModule.stations);

  const playerContainerRef = useRef(null);

  const onNextTrack = useCallback(async () => {
    if (!tracks || tracks.length === 0) return;

    let nextIndex = isShuffle
      ? getRandomIntInclusive(0, tracks.length - 1)
      : currentTrackIndex + 1;

    if (nextIndex >= tracks.length) {
      if (isRepeat) nextIndex = 0;
      else return;
    }

    const nextTrack = tracks[nextIndex];
    try {
      const videoId = await youtubeService.resolveVideoId(nextTrack);
      const adaptedTrack = { ...adaptTrackForPlayer(nextTrack), videoId };
      dispatch(setCurrentTrack(adaptedTrack, nextIndex));
      dispatch(setIsPlaying(true));
    } catch (err) {
      console.error("Failed to play next track:", err);
    }
  }, [tracks, currentTrackIndex, isShuffle, isRepeat, dispatch]);

  const onPrevTrack = useCallback(async () => {
    if (!tracks || tracks.length === 0) return;

    let prevIndex = currentTrackIndex - 1;
    if (prevIndex < 0) {
      if (isRepeat) prevIndex = tracks.length - 1;
      else return;
    }

    const prevTrack = tracks[prevIndex];
    try {
      const videoId = await youtubeService.resolveVideoId(prevTrack);
      const adaptedTrack = { ...adaptTrackForPlayer(prevTrack), videoId };
      dispatch(setCurrentTrack(adaptedTrack, prevIndex));
      dispatch(setIsPlaying(true));
    } catch (err) {
      console.error("Failed to play prev track:", err);
    }
  }, [tracks, currentTrackIndex, isRepeat, dispatch]);

  const {
    loadVideo,
    play,
    pause,
    currentTime,
    duration,
    seekTo,
    volume,
    setVolume,
  } = useYoutubePlayer(playerContainerRef, onNextTrack);

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
  }, [isPlaying, currentTrack?.videoId, play, pause]);

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

  function handleLike() {
    if (currentTrackIndex == null) return;
    const originalTrack = tracks[currentTrackIndex];
    if (!originalTrack) return;
    toggleLikedSong(originalTrack);
  }

  // function handleLike() {
  //    console.log('displayTrack:', displayTrack)
  //    console.log('currentTrack:', currentTrack)
  //     if (!displayTrack) return
  //     toggleLikedSong(displayTrack)
  // }

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
            <button className="like-btn" onClick={handleLike}>
              {isLiked ? <RemoveFromLikedSongs /> : <AddToLikedSongs />}
            </button>
          </>
        )}
      </div>

      <div className="player-footer-center">
        <div className="player-controls">
          <button
            className="btn-shuffle"
            onClick={() => dispatch(toggleShuffle(isShuffle))}
            style={{
              color: isShuffle ? "#1ed760" : "#b3b3b3",
            }}
          >
            <ShuffleIcon />
            {isShuffle && <ActiveIndicator />}
          </button>

          <button
            className="btn-prev"
            disabled={!currentTrack}
            onClick={onPrevTrack}
          >
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

          <button
            className="btn-next"
            disabled={!currentTrack}
            onClick={onNextTrack}
          >
            <NextIcon />
          </button>
          <button
            className="btn-repeat"
            onClick={() => dispatch(toggleRepeat(isRepeat))}
            style={{
              color: isRepeat ? "#1ed760" : "#b3b3b3",
            }}
          >
            <RepeatIcon />
            {isRepeat && <ActiveIndicator />}
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
        <button className="btn-lyrics">
          <LyricsIcon />
        </button>
        <button className="btn-queue">
          <QueueIcon />
        </button>
        <button className="btn-connection">
          <ConnectIcon />
        </button>
        <button className="btn-volume">
          <VolumeIcon />
        </button>

        <div className="volume-range">
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            style={{ "--fill-percent": volumePercent }}
            onChange={(e) => setVolume(+e.target.value)}
          />
        </div>
        <button className="btn-pip">
          <PictureInPictureIcon />
        </button>
        <button className="btn-fulls">
          <FullscreenIcon />
        </button>
      </div>

      <div ref={playerContainerRef} style={{ display: "none" }} />
    </footer>
  );
}
