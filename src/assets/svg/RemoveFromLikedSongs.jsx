export const RemoveFromLikedSongs = ({ size = 20, className = "like-btn", color = "#1ed760" }) => (
    <svg 
        viewBox="0 0 16 16" 
        width={size} 
        height={size} 
        fill={color}
        className={className}
        role="img" 
        aria-hidden="true"
    >
        <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m11.748-1.97a.75.75 0 0 0-1.06-1.06l-4.47 4.47-1.405-1.406a.75.75 0 1 0-1.061 1.06l2.466 2.467 5.53-5.53z"></path>
    </svg>
)