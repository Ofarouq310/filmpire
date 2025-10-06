import HamburgerMenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Search from "../components/Search";
import { useEffect } from "react";
import { fetchToken, createSessionID, moviesApi } from "../utils";
import { useSelector, useDispatch } from "react-redux";
import { setUser, setMovies } from "../features/auth";
import DarkModeToggle from "./DarkModeToggle";
import { Link } from "react-router-dom";
import createMoviesLibrary from "../services/createMoviesLibrary";

export default function Navbar({ setToggleSidebar }) {
  const HamburgerWrapper = styled("div")(() => ({
    cursor: "pointer",
    display: "flex",
    ":hover": {
      transform: "scale(1.1)",
      transition: "all 0.3s ease-in-out",
    },
    "@media (min-width: 768px)": {
      display: "none",
    },
  }));

  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth || {});

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = localStorage.getItem("request_token");
    const savedSession = localStorage.getItem("session_id");

    const loadUserAndMovies = async (session_id) => {
      try {
        const { data: userData } = await moviesApi.get(
          `/account?session_id=${session_id}`
        );

        dispatch(setUser({ user: userData, session_id }));

        const moviesLibrary = createMoviesLibrary(userData.id, session_id);

        const [favoritesRes, watchlistRes] = await Promise.all([
          moviesLibrary.get("/favorite/movies"),
          moviesLibrary.get("/watchlist/movies"),
        ]);

        dispatch(
          setMovies({
            favorites: favoritesRes.data.results || [],
            watchlist: watchlistRes.data.results || [],
          })
        );
      } catch (error) {
        console.error("Failed to load user/movies:", error.message);
      }
    };

    if (!savedSession && token && params.get("approved") === "true") {
      (async () => {
        const session_id = await createSessionID();
        if (session_id) {
          window.history.replaceState({}, document.title, window.location.pathname);
          await loadUserAndMovies(session_id);
        }
      })();
    }

    else if (savedSession) {
      loadUserAndMovies(savedSession);
    }
  }, [dispatch]);

  return (
    <div
      className="
      md:w-[calc(100%-240px)] h-20 w-full md:ml-60
      dark:bg-gray-900 bg-[#6A9C89]
      sm:p-5 p-3 flex items-center justify-between
      text-gray-900 dark:text-white
      text-2xl font-bold fixed top-0 z-10
      shadow-lg
    "
    >
      <div className="sm:flex-row flex-col-reverse flex flex-wrap-reverse gap-3 items-center">
        <HamburgerWrapper onClick={() => setToggleSidebar((prev) => !prev)}>
          <HamburgerMenuIcon />
        </HamburgerWrapper>
        <DarkModeToggle />
      </div>

      <Search />

      <div className="flex-col-reverse flex flex-wrap sm:flex-row items-center justify-center text-center gap-0.5">
        {isAuthenticated ? (
          <Link to="/myprofile">
            <Button
              variant="text"
              color="inherit"
              startIcon={<AccountCircle fontSize="medium" />}
            >
              Profile
            </Button>
          </Link>
        ) : (
          <Button
            variant="text"
            color="inherit"
            onClick={fetchToken}
            startIcon={<AccountCircle fontSize="medium" />}
          >
            Login
          </Button>
        )}
      </div>
    </div>
  );
}
