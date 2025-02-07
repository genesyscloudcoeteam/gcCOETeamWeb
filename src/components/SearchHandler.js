import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const SearchHandler = () => {
  const location = useLocation();
  const [searchResult, setSearchResult] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get("search");

    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();

      let matchedPage = null;
      if (lowerCaseQuery === "shop") {
        matchedPage = "/shop";
      } else if (lowerCaseQuery === "about") {
        matchedPage = "/about";
    } else if (lowerCaseQuery === "cart") {
        matchedPage = "/cart";
      } else if (lowerCaseQuery === "home") {
        matchedPage = "/";
      }

      setSearchResult(matchedPage);
    } else {
      setSearchResult(null);
    }
  }, [location]);

  return (
    searchResult && (
      <div className="search-results">
        <p>We found a matching page for your search:</p>
        <Link to={searchResult} className="search-link">
          Go to {searchResult.replace("/", "")}
        </Link>
      </div>
    )
  );
};

export default SearchHandler;
