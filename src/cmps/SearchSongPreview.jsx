export function SearchSongPreview({ track }) {
  const imgUrl = track.album.images[2]?.url || track.album.images[0]?.url;
  const artistName = track.artists.map((artist) => artist.name).join(", ");

  return (
    <article className="search-song-preview">
      <img src={imgUrl} alt={track.name} />

      <div className="song-info">
        <p>{track.name}</p>
        <p>{artistName}</p>
      </div>
    </article>
  );
}
