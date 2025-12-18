import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

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
    <section className="search-bar">
      <input
        type="text"
        placeholder="What do you want to listen to?"
        value={searchTerm}
        readOnly={!isSearchPage}
        onFocus={onFocus}
        onChange={handleChange}
      />
    </section>
  );
}
