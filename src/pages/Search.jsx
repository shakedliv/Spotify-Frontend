import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { spotifyService } from "../services/spotify.service";
import { TrackList } from "../cmps/TrackList";
import { ExplorerList } from "../cmps/ExplorerList";
import { StationList } from "../cmps/StationList";

export function Search() {
  const [searchParams] = useSearchParams();
  const [tracks, setTracks] = useState([]);
  const [explorerItems, setExplorerItems] = useState([]);

  const query = searchParams.get("q") || "";

  useEffect(() => {
    if (!query) {
      setTracks([]);
      setExplorerItems(spotifyService.getExplorerItems());
      return;
    }

    let isActive = true;
    const timeoutId = setTimeout(() => {
      spotifyService
        .searchTracksRemote(query)
        .then((results) => {
          if (!isActive) return;
          setTracks(results);
        })
        .catch((err) => {
          console.error("Spotify search failed:", err);
        });
    }, 400);

    return () => {
      isActive = false;
      clearTimeout(timeoutId);
    };
  }, [query]);

  return (
    <section className="search-page">
      {!query && <ExplorerList items={explorerItems} />}
      {query && <TrackList tracks={tracks} isSearch={true} />}
    </section>
  );
}

//--------------------------------------------------------------
// import { useEffect, useState } from "react";
// import { useSearchParams } from "react-router-dom";
// import { spotifyService } from "../services/spotify.service";
// import { TrackList } from "../cmps/TrackList";
// import { ExplorerList } from "../cmps/ExplorerList";
// import { StationList } from "../cmps/StationList";

// export function Search() {
//   const [searchParams] = useSearchParams();
//   const [tracks, setTracks] = useState([]);
//   const [explorerItems, setExplorerItems] = useState([]);

//   const query = searchParams.get("q") || "";

//   useEffect(() => {
//     if (!query) {
//       setTracks([]);
//       setExplorerItems(spotifyService.getExplorerItems());
//       return;
//     }

//     const localResults = spotifyService.searchTracks(query);
//     setTracks(localResults);

//     let isActive = true;

//     spotifyService
//       .searchTracksRemote(query)
//       .then((remoteResults) => {
//         if (!isActive) return;
//         if (!remoteResults.length) return;
//         setTracks(remoteResults);
//       })
//       .catch(() => {});

//     return () => {
//       isActive = false;
//     };
//   }, [query]);

//   return (
//     <section className="search-page">
//       {!query && <ExplorerList items={explorerItems} />}
//       {query && <TrackList tracks={tracks} isSearch={true} />}
//     </section>
//   );
// }

//-------------------------------------------------------------------------------
// import { useEffect, useState } from 'react'
// import { useSearchParams } from 'react-router-dom'
// import { spotifyService } from '../services/spotify.service'
// import { TrackList } from '../cmps/TrackList'
// import { ExplorerList } from '../cmps/ExplorerList'
// import { StationList } from '../cmps/StationList'

// export function Search() {
//     const [searchParams] = useSearchParams()
//     const [tracks, setTracks] = useState([])
//     const [explorerItems, setExplorerItems] = useState([])

//     const query = searchParams.get('q') || ''
//     useEffect(() => {
//         if (!query) {
//             setTracks([])
//             setExplorerItems(spotifyService.getExplorerItems())
//             return
//         }

//         const results = spotifyService.searchTracks(query)
//         setTracks(results)
//     }, [query])

//     return (
//         <section className='search-page'>
//             {!query && <ExplorerList items={explorerItems} />}
//             {query && <TrackList tracks={tracks} isSearch={true} />}
//         </section>
//     )
// }
