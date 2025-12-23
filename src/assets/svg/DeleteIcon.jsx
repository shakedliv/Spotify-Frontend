export function DeleteIcon({ className = "" }) {
    return (
        <svg
            viewBox="0 0 16 16"
            className={`delete-icon ${className}`}
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
            <path d="M12 8.75H4v-1.5h8z"></path>
        </svg>
    )
}