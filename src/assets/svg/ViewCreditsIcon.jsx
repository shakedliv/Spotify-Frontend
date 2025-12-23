export function ViewCreditsIcon({ className = "" }) {
    return (
        <svg
            viewBox="0 0 16 16"
            className={`view-credits-icon ${className}`}
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
            <path d="M16 8.328V1h-1.5v4.828h-1a2.5 2.5 0 1 0 2.5 2.5m-2.5-1h1v1a1 1 0 1 1-1-1m-4.5 3V4H7.5v3.828h-1a2.5 2.5 0 1 0 2.5 2.5m-2.5-1h1v1a1 1 0 1 1-1-1M0 14.5h16V16H0zM2 10H0v1.5h2zM0 5.5h4V7H0zM12 1H0v1.5h12z"></path>
        </svg>
    )
}