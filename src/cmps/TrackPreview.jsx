import { useEffect } from "react";
import { formatDate, formatDuration } from "../services/util.service.js";
import { useSelector, useDispatch } from "react-redux";
import { toggleLikedSong } from "../store/actions/user.actions.js";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { adaptTrackForPlayer } from "../services/track/track.util";
import { setCurrentTrack } from "../store/actions/system.actions";

export function TrackPreview({
  track,
  onAddTrack,
  onRemoveTrack,
  trackNum,
  onToggleOptions,
  isOperationsOpen,
}) {
  const organizedTrack = track.track;
  const user = useSelector((state) => state.userModule.user);
  const isLiked = user?.likedSongs?.some((t) => t.id === track.id);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isOperationsOpen) return;
    const closeMenu = () => onToggleOptions(null);
    window.addEventListener("click", closeMenu);
    return () => window.removeEventListener("click", closeMenu);
  }, [isOperationsOpen, onToggleOptions]);

  function onPlayTrack() {
    dispatch(setCurrentTrack(adaptTrackForPlayer(track)));
  }

  function onLikeClick(ev) {
    ev.stopPropagation();
    toggleLikedSong(track);
  }

  function ToggleOptions(ev) {
    ev.stopPropagation();
    onToggleOptions(track.id);
  }
  return (
    <article className="track-preview" onClick={onPlayTrack}>
      <span className="track-num">{trackNum}</span>
      <section className="basic-info-container">
        <img
          className="track-img"
          src={organizedTrack.album.images[0].url}
          alt=""
          style={{ width: 50, height: 50 }}
        />
        <b className="track-name">{organizedTrack.name} </b>
        <span className="track-artist">{organizedTrack.artists[0].name}</span>
      </section>
      <span>{organizedTrack.album?.name} </span>
      <span>Sep 24, 2024</span>
      <section className={"track-actions"}>
        <button className="like-btn" onClick={onLikeClick}>
          {isLiked ? (
            <CheckCircleIcon color="success" />
          ) : (
            <AddCircleOutlineIcon />
          )}
        </button>
        <div className="time-options">
          <span className={"duration"}>
            {formatDuration(organizedTrack.duration_ms)}
          </span>
          <button className={"options"} onClick={ToggleOptions}>
            <MoreHorizIcon sx={{ display: "block", margin: "0 auto" }} />
          </button>
          {isOperationsOpen && (
            <div
              className="options-menu"
              onClick={(ev) => ev.stopPropagation()}
            >
              <button>Add to playlist</button>
              <button onClick={() => onRemoveTrack(track)}>
                Remove from this playlist
              </button>
              <button onClick={onLikeClick}>Save to your Liked Songs</button>
              <button>Add to queue</button>
              <button>Exclude from your taste profile</button>
              <div className="separator"></div>
              <button>Go to song radio</button>
              <button>Go to artist</button>
              <button>Go to album</button>
              <button>View credits</button>
              <button>Share</button>
              <div className="separator"></div>
              <button>Open in Desktop app</button>
            </div>
          )}
        </div>
      </section>
    </article>
  );
}
