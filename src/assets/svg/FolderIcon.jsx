export function FolderIcon({ className = "" }) {
    return (
        <svg
            viewBox="0 0 16 16"
            className={`folder-icon ${className}`}
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
            <path d="M1.75 1A1.75 1.75 0 0 0 0 2.75v11.5C0 15.216.784 16 1.75 16h12.5A1.75 1.75 0 0 0 16 14.25v-9.5A1.75 1.75 0 0 0 14.25 3H7.82l-.65-1.125A1.75 1.75 0 0 0 5.655 1zM1.5 2.75a.25.25 0 0 1 .25-.25h3.905a.25.25 0 0 1 .216.125L6.954 4.5h7.296a.25.25 0 0 1 .25.25v9.5a.25.25 0 0 1-.25.25H1.75a.25.25 0 0 1-.25-.25z"></path>
        </svg>
    )
}