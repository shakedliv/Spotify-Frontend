import React, { useEffect } from 'react'
import { Routes, Route } from "react-router"

import { HomePage } from "./pages/HomePage"
import { AboutUs, AboutTeam, AboutVision } from "./pages/AboutUs"
import { StationIndex } from "./pages/StationIndex.jsx"

import { ChatApp } from "./pages/Chat.jsx"
import { AdminIndex } from "./pages/AdminIndex.jsx"

import { StationDetails } from "./pages/StationDetails"
import { UserDetails } from "./pages/UserDetails"


import { AppHeader } from "./cmps/AppHeader"
import { Search } from "./pages/Search"
import { PlayerFooter } from "./cmps/PlayerFooter"
import { AppFooter } from "./cmps/AppFooter"
import { UserMsg } from "./cmps/UserMsg.jsx"
import { LoginSignup } from "./pages/LoginSignup.jsx"
import { Login } from "./pages/Login.jsx"
import { Signup } from "./pages/Signup.jsx"
import { Library } from './cmps/Library.jsx'
import { loadStations } from './store/actions/station.actions.js'
import { LikedSongs } from './pages/LikedSongs.jsx'

export function RootCmp() {

  useEffect(() => {
    loadStations()
  }, [])

  return (
    <div className="main-container">
      <AppHeader />
      <UserMsg />

      <main className='main-layout'>
        <Library />
        <Routes>
          <Route path="" element={<HomePage />} />
          <Route path="search" element={<Search />} />
          <Route path="about" element={<AboutUs />}>
            <Route path="team" element={<AboutTeam />} />
            <Route path="vision" element={<AboutVision />} />
          </Route>
          <Route path="station" element={<StationIndex />} />
          <Route path="station/:stationId" element={<StationDetails />} />
          <Route path="user/:id" element={<UserDetails />} />
          <Route path="/liked" element={<LikedSongs/>} />
          <Route path="chat" element={<ChatApp />} />
          <Route path="admin" element={<AdminIndex />} />
          <Route path="login" element={<LoginSignup />}>
            <Route index element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>
        </Routes>
      </main>

      <PlayerFooter />
      <AppFooter />
    </div>
  )
}
