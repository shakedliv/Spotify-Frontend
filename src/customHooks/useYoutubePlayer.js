import { useEffect, useRef, useState } from 'react'

let youtubeApiPromise = null

function loadYoutubeIframeApi() {
    if (youtubeApiPromise) return youtubeApiPromise

    youtubeApiPromise = new Promise((resolve) => {
        if (window.YT && window.YT.Player) {
            resolve(window.YT)
            return
        }

        const tag = document.createElement('script')
        tag.src = 'https://www.youtube.com/iframe_api'
        document.body.appendChild(tag)

        const prev = window.onYouTubeIframeAPIReady

        window.onYouTubeIframeAPIReady = () => {
            prev?.()
            resolve(window.YT)
        }

    })

    return youtubeApiPromise
}

export function useYoutubePlayer(containerRef) {
    const playerRef = useRef(null)
    const intervalRef = useRef(null)

    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)

    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
            if (playerRef.current) {
                playerRef.current.destroy()
            }
        }
    }, [])

    async function loadVideo(videoId) {
        const YT = await loadYoutubeIframeApi()

        if (playerRef.current) {
            playerRef.current.loadVideoById(videoId)
            return
        }

        playerRef.current = new YT.Player(containerRef.current, {
            videoId,
            playerVars: {
                controls: 0,
                rel: 0,
                modestbranding: 1,
            },
            events: {
                onReady: onPlayerReady,
                onStateChange: onPlayerStateChange,
            },
        })
    }

    function onPlayerReady(event) {
        const player = event.target
        setDuration(player.getDuration())
    }

    function onPlayerStateChange(event) {
        const player = event.target
        const YTState = window.YT.PlayerState

        if (event.data === YTState.PLAYING) {
            setIsPlaying(true)
            startTrackingTime(player)
        }

        if (event.data === YTState.PAUSED || event.data === YTState.ENDED) {
            setIsPlaying(false)
            stopTrackingTime()
        }
    }

    function startTrackingTime(player) {
        stopTrackingTime()

        intervalRef.current = setInterval(() => {
            setCurrentTime(player.getCurrentTime())
        }, 500)
    }

    function stopTrackingTime() {
        if (!intervalRef.current) return
        clearInterval(intervalRef.current)
        intervalRef.current = null
    }

    function play() {
        playerRef.current?.playVideo()
    }

    function pause() {
        playerRef.current?.pauseVideo()
    }

    return {
        loadVideo,
        play,
        pause,
        isPlaying,
        currentTime,
        duration,
    }
}
