import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router";

import { StationIndex } from "./pages/StationIndex.jsx";
import { StationDetails } from "./pages/StationDetails";
import { AppHeader } from "./cmps/AppHeader";
import { Search } from "./pages/Search";
import { PlayerFooter } from "./cmps/PlayerFooter";
import { UserMsg } from "./cmps/UserMsg.jsx";
import { LoginSignup } from "./pages/LoginSignup.jsx";
import { Login } from "./pages/Login.jsx";
import { Signup } from "./pages/Signup.jsx";
import { Library } from "./cmps/Library.jsx";
import { loadStations } from "./store/actions/station.actions.js";
import { LikedSongs } from "./pages/LikedSongs.jsx";

export function RootCmp() {
  const [isLibraryOpen, setIsLibraryOpen] = useState(true);
  const location = useLocation();

  useEffect(() => {
    loadStations();
  }, []);

  const isAuthRoute = location.pathname.startsWith("/login");
  const layoutClass = isLibraryOpen
    ? "main-layout"
    : "main-layout library-closed";

  if (isAuthRoute) {
    return (
      <div className="auth-container">
        <UserMsg />
        <Routes>
          <Route path="login" element={<LoginSignup />}>
            <Route index element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>
        </Routes>
      </div>
    );
  }

  return (
    <div className="main-container">
      <AppHeader />
      <UserMsg />

      <main className={layoutClass}>
        <Library
          isLibraryOpen={isLibraryOpen}
          onToggleLibrary={() => setIsLibraryOpen(!isLibraryOpen)}
        />

        <Routes>
          <Route path="" element={<StationIndex />} />
          <Route path="search" element={<Search />} />
          <Route path="station/:stationId" element={<StationDetails />} />
          <Route path="liked" element={<LikedSongs />} />
        </Routes>
      </main>

      <PlayerFooter />
    </div>
  );
}
