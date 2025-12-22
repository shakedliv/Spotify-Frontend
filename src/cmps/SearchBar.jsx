import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { SearchIcon } from "../assets/svg/SearchIcon.jsx";
import { BrowseIcon } from "../assets/svg/BrowseIcon.jsx";
import { BrowseIconNotActive } from "../assets/svg/BrowseNotActive.jsx";

export function SearchBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const isSearchPage = location.pathname === "/search";
  const searchTerm = searchParams.get("q") || "";
  const [isFocused, setIsFocused] = useState(false);

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
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
        value={searchTerm}
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
