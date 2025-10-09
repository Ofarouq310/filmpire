import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchMovie } from "../features/currentGenreOrCategory";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  const currentGenreOrCategory = useSelector(
    (state) => state.currentGenreOrCategory.genreOrCategoryName
  );

  useEffect(() => {
    setQuery("");
  }, [currentGenreOrCategory]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) return;

    const timeout = setTimeout(() => {
      dispatch(searchMovie(trimmed));
      navigate(`/?search=${encodeURIComponent(trimmed)}&page=1`);
    }, 300);

    return () => clearTimeout(timeout);
  }, [query, dispatch, navigate]);

  const handleSearch = () => {
    const trimmed = query.trim();
    if (trimmed) {
      dispatch(searchMovie(trimmed));
      navigate(`/?search=${encodeURIComponent(trimmed)}&page=1`);
    }
  };

  const handleClear = () => {
    setQuery("");
    navigate(`/`);
  };

  return (
    <div className="flex items-center border-b border-gray-400 dark:border-gray-600 py-1">
      <SearchIcon
        className="text-gray-400 dark:text-gray-300 cursor-pointer hover:scale-110 transition-transform"
        onClick={handleSearch}
      />
      <input
        name="search-input"
        type="text"
        placeholder={
          isMobile ? "Search movies..." : "Search through thousands of movies"
        }
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch();
        }}
        className="ml-2 bg-transparent text-base placeholder:text-sm placeholder:text-center focus:outline-none placeholder-gray-300 dark:placeholder-gray-700 text-gray-900 dark:text-white w-30 sm:w-65"
      />
      {query && (
        <CloseIcon
          onClick={handleClear}
          className="text-gray-400 dark:text-gray-300 cursor-pointer hover:rotate-90 transition-transform"
          fontSize="small"
        />
      )}
    </div>
  );
}
