export function AlbumIcon({ className = "" }) {
    return (
        <svg
            viewBox="0 0 16 16"
            className={`album-icon ${className}`}
            data-encore-id="icon"
            role="img"
            aria-hidden="true"
            fill="currentColor"
            style={{
                width: '16px',
                height: '16px',
                display: 'inline-block',
                flexShrink: 0
            }}
        >
            <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8"></path>
            <path d="M8 6.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M5 8a3 3 0 1 1 6 0 3 3 0 0 1-6 0"></path>
        </svg>
    )
}