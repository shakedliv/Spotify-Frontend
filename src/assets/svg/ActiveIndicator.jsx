export function ActiveIndicator() {
    return (
        <div className="active-indicator" style={{
            position: 'absolute',
            bottom: '-8px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '4px',
            height: '4px',
            backgroundColor: '#1ed760',
            borderRadius: '50%',
            display: 'block'
        }}></div>
    )
}