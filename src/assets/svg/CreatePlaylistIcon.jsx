export function CreatePlaylistIcon({ className = "" }) {
    return (
        <svg
            viewBox="0 0 16 16"
            className={`create-playlist-icon ${className}`}
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
            <path d="M2 0v2H0v1.5h2v2h1.5v-2h2V2h-2V0zm11.5 2.5H8.244A5.5 5.5 0 0 0 7.966 1H15v11.75A2.75 2.75 0 1 1 12.25 10h1.25zm0 9h-1.25a1.25 1.25 0 1 0 1.25 1.25zM4 8.107a5.5 5.5 0 0 0 1.5-.593v5.236A2.75 2.75 0 1 1 2.75 10H4zM4 11.5H2.75A1.25 1.25 0 1 0 4 12.75z"></path>
        </svg>
    )
}