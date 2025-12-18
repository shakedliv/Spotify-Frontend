import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { spotifyService } from "../services/spotify.service";
import { TrackList } from "../cmps/TrackList";

export function Search() {
  const [searchParams] = useSearchParams();
  const [tracks, setTracks] = useState([]);

  const query = searchParams.get("q") || "";

  useEffect(() => {
    if (!query) {
      setTracks([]);
      return;
    }

    const results = spotifyService.searchTracks(query);
    setTracks(results);
  }, [query]);

  return (
    <section className="search-page">
      <TrackList tracks={tracks} />
    </section>
  );
}
