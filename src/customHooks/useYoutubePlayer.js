import { useEffect, useRef, useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { setIsPlaying } from '../store/actions/system.actions'

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

export function useYoutubePlayer(containerRef, onTrackEnd) {
    const dispatch = useDispatch()
    const playerRef = useRef(null)
    const intervalRef = useRef(null)
    const onTrackEndRef = useRef(onTrackEnd)

    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [volume, setVolumeState] = useState(100)

    const stopTrackingTime = useCallback(() => {
        if (!intervalRef.current) return
        clearInterval(intervalRef.current)
        intervalRef.current = null
    }, [])

    const startTrackingTime = useCallback(
        (player) => {
            stopTrackingTime()
            intervalRef.current = setInterval(() => {
                setCurrentTime(player.getCurrentTime())
            }, 500)
        },
        [stopTrackingTime]
    )
    useEffect(() => {
        onTrackEndRef.current = onTrackEnd
    }, [onTrackEnd])
    useEffect(() => {
        return () => {
            stopTrackingTime()
            if (playerRef.current) {
                playerRef.current.destroy()
                playerRef.current = null
            }
        }
    }, [stopTrackingTime])

    const loadVideo = useCallback(
        async (videoId) => {
            if (!videoId) return
            const el = containerRef?.current
            if (!el) return

            const YT = await loadYoutubeIframeApi()

            if (playerRef.current) {
                setCurrentTime(0)
                setDuration(0)
                playerRef.current.loadVideoById(videoId)
                return
            }

            playerRef.current = new YT.Player(el, {
                videoId,
                playerVars: {
                    controls: 0,
                    rel: 0,
                    modestbranding: 1,
                },
                events: {
                    onReady: (e) => {
                        setDuration(e.target.getDuration())
                        e.target.setVolume(volume)
                    },
                    onStateChange: (e) => {
                        const YTState = window.YT.PlayerState

                        if (e.data === YTState.PLAYING) {
                            setDuration(e.target.getDuration())
                            setCurrentTime(e.target.getCurrentTime())
                            dispatch(setIsPlaying(true))
                            startTrackingTime(e.target)
                        }

                        if (e.data === YTState.ENDED) {
                            stopTrackingTime()
                            if (onTrackEndRef.current) onTrackEndRef.current()
                        }
                    },
                },
            })
        },
        [containerRef, dispatch, startTrackingTime, stopTrackingTime]
    )

    const play = useCallback(() => {
        playerRef.current?.playVideo()
    }, [])

    const pause = useCallback(() => {
        playerRef.current?.pauseVideo()
    }, [])

    const seekTo = useCallback((seconds) => {
        playerRef.current?.seekTo(seconds, true)
        setCurrentTime(seconds)
    }, [])

    const setVolume = useCallback((value) => {
        setVolumeState(value)
        playerRef.current?.setVolume(value)
    }, [])

    return {
        loadVideo,
        play,
        pause,
        seekTo,
        setVolume,
        currentTime,
        duration,
        volume,
    }
}
