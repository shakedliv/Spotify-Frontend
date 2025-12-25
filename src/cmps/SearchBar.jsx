import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useState, useRef } from "react";
import { SearchIcon } from "../assets/svg/SearchIcon.jsx";
import { BrowseIcon } from "../assets/svg/BrowseIcon.jsx";
import { BrowseIconNotActive } from "../assets/svg/BrowseNotActive.jsx";

export function SearchBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const searchTerm = searchParams.get("q") || "";
  // const isSearchPage = location.pathname === "/search"; ----
  const hasSearchQuery = !!searchTerm;
  const isSearchPage = location.pathname === "/search" && !hasSearchQuery;

  const [isFocused, setIsFocused] = useState(false);
  const didRedirectFromHomeRef = useRef(false);

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
   }

   function getDisplayQuery(rawQuery) {
    if (!rawQuery) return ''
    
      if (rawQuery.startsWith('genre:"')) {
      //   const genre = rawQuery.match(/"([^"]+)"/)?.[1] || ''
      //      return genre.charAt(0).toUpperCase() + genre.slice(1) + ' songs'
         return ''
    }
    
    return rawQuery
}

  function handleBrowseClick(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    navigate("/search");
  }

  function handleChange(ev) {
    const value = ev.target.value;

    if (!value) {
      setSearchParams({});

      if (didRedirectFromHomeRef.current) {
        navigate("/", { replace: true });
        didRedirectFromHomeRef.current = false;
      }

      return;
    }

    if (!isSearchPage) {
      didRedirectFromHomeRef.current = true;
      navigate(`/search?q=${value}`, { replace: true });
    } else {
      setSearchParams({ q: value });
    }
  }

  return (
    <section className={`search-bar ${isFocused ? "active" : ""}`}>
      <label htmlFor="main-search">
        <div className="search-icon">
          <SearchIcon />
        </div>
      </label>

      <input
        id="main-search"
        type="text"
        placeholder="What do you want to play?"
        value={ getDisplayQuery(searchTerm) }
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onChange={handleChange}
      />

      <span className="search-divider" />

      <button
        type="button"
        className={`search-extra-icon ${isSearchPage ? "active" : ""}`}
        onMouseDown={(e) => e.preventDefault()}
        onClick={handleBrowseClick}
        aria-label="Browse"
      >
        {isSearchPage ? <BrowseIcon /> : <BrowseIconNotActive />}
      </button>
    </section>
  );
}
