import { useEffect } from 'react'

export function useCloseOnOutside(ref, callback, key = 'Escape') {
    useEffect(() => {
        const handleEvent = (event) => {
            if (event.type === 'keydown' && event.key === key) {
                callback()
            }
            if (event.type === 'mousedown') {
                if (ref.current && !ref.current.contains(event.target)) {
                    callback()
                }
            }
        }

        document.addEventListener('mousedown', handleEvent)
        window.addEventListener('keydown', handleEvent)

        return () => {
            document.removeEventListener('mousedown', handleEvent)
            window.removeEventListener('keydown', handleEvent)
        }
    }, [ref, callback, key])
}
