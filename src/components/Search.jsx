import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchMovie } from "../features/currentGenreOrCategory";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const currentGenreOrCategory = useSelector(
    (state) => state.currentGenreOrCategory.genreOrCategoryName
  );

  const [placeholder, setPlaceholder] = useState(
    "Search through thousands of movies"
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia("(max-width: 640px)").matches) {
        setPlaceholder("Search movies...");
      } else {
        setPlaceholder("Search through thousands of movies");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setQuery("");
  }, [currentGenreOrCategory]);

  const handleSearch = () => {
    if (query.trim()) {
      dispatch(searchMovie(query.trim()));
      navigate(`/?search=${encodeURIComponent(query)}&page=1`);
    }
  };

  return (
    <div className="flex items-center border-b border-gray-400 dark:border-gray-600 py-1">
      <SearchIcon
        className="text-gray-300 dark:text-white cursor-pointer hover:scale-110 transition-transform"
        onClick={handleSearch}
      />
      <input
        name="search-input"
        type="text"
        placeholder= {placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch();
        }}
        className="ml-2 bg-transparent text-base placeholder:text-sm placeholder:text-center focus:outline-none placeholder-gray-300 dark:placeholder-gray-700 text-gray-900 dark:text-white w-30 sm:w-65"
      />
    </div>
  );
}
