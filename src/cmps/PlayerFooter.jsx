import { useSelector } from "react-redux";

export function PlayerFooter() {
  const currentTrack = useSelector((state) => state.systemModule.currentTrack);

  if (!currentTrack) {
    return (
      <footer className="player-footer player-footer--empty">
        <div className="player-footer-center">
          <span>Select a song to play</span>
        </div>
      </footer>
    );
  }

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
