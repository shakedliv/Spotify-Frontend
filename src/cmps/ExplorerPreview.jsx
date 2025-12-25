import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

export function ExplorerPreview({ item }) {
    const [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate()

    function handleGenreClick() {
       const genreQuery = `genre:"${item.searchKey.toLowerCase()}"`
       const encodedQuery = encodeURIComponent(genreQuery)
       navigate(`/search?q=${encodedQuery}`)
    }

    return (
        <article
            className='explorer-preview'
            style={{ backgroundColor: item.bgColor }}
            onClick={handleGenreClick}
        >
            <div className='explorer-img-wrapper'>
                <img src={item.imgUrl} alt={item.name} />
            </div>

            <h3 className='explorer-title'>{item.name}</h3>
        </article>
    )
}
