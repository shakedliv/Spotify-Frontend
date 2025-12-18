export function TracksHeader({onSort}) {
    return (
        <section className='tracks-header-container'>
            <section>
                <span>#</span>
                {/* <span onClick={() => handleSort('name')}>Title</span> */}
            </section>
            <span>Album</span>
            <span>Date added</span>
            <span>🕑</span>
            <span>ℹ️</span>
        </section>
    )
}
