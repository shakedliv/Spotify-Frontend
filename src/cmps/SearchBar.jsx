import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";

export function SearchBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const isSearchPage = location.pathname === "/search";
  const searchTerm = searchParams.get("q") || "";

  function onFocus() {
    if (!isSearchPage) {
      navigate("/search");
    }
  }

  function handleChange(ev) {
    if (!isSearchPage) return;

    const value = ev.target.value;
    if (!value) {
      setSearchParams({});
    } else {
      setSearchParams({ q: value });
    }
  }

  return (
    <section className={`search-bar ${isSearchPage ? "active" : ""}`}>
      <label htmlFor="main-search">
        <div className="search-icon" aria-label="Search">
          <SearchIcon />
        </div>{" "}
      </label>

      <input
        id="main-search"
        type="text"
        placeholder="What do you want to listen to?"
        value={searchTerm}
        readOnly={!isSearchPage}
        onFocus={onFocus}
        onChange={handleChange}
      />

      <TuneIcon className="search-extra-icon" />
    </section>
  );
}
