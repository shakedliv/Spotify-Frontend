import { useEffect, useState } from "react";
import { trackService } from "../services/track";

export function PlayerFooter() {
  const [currentTrack, setCurrentTrack] = useState(null);

  useEffect(() => {
    loadInitialTrack();
  }, []);

  async function loadInitialTrack() {
    const tracks = await trackService.query();
    if (!tracks.length) return;
    setCurrentTrack(tracks[0]);
  }

  if (!currentTrack) return null;

  return (
    <footer className="player-footer">
      <div className="player-footer-left">
        <img src={currentTrack.imgUrl} alt="track cover" />
        <div className="track-info">
          <span className="track-title">{currentTrack.title}</span>
          <span className="track-artist">
            {currentTrack.artists.join(", ")}
          </span>
        </div>
      </div>

      <div className="player-footer-center">
        <div className="player-controls">
          <button>⏮</button>
          <button>▶</button>
          <button>⏭</button>
        </div>
        <div className="player-progress">
          <span>0:00</span>
          <input type="range" min="0" max="100" />
          <span>
            {Math.floor(currentTrack.durationMs / 60000)}:
            {String(
              Math.floor((currentTrack.durationMs % 60000) / 1000)
            ).padStart(2, "0")}
          </span>
        </div>
      </div>

      <div className="player-footer-right">
        <button>🔊</button>
        <input type="range" min="0" max="100" />
      </div>
    </footer>
  );
}
