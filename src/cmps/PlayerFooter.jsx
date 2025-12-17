export function PlayerFooter() {
  const currentTrack = {
    title: "Song name",
    artist: "Artist name",
    imgUrl: "https://via.placeholder.com/56",
  };

  return (
    <footer className="player-footer">
      <div className="player-footer-left">
        <img src={currentTrack.imgUrl} alt="track cover" />
        <div className="track-info">
          <span className="track-title">{currentTrack.title}</span>
          <span className="track-artist">{currentTrack.artist}</span>
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
          <span>3:30</span>
        </div>
      </div>

      <div className="player-footer-right">
        <button>🔊</button>
        <input type="range" min="0" max="100" />
      </div>
    </footer>
  );
}
