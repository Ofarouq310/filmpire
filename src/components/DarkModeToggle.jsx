import { useEffect, useState } from "react";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";

export default function DarkModeToggle() {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || (prefersDark ? "dark" : "light")
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="relative w-10 h-10 cursor-pointer flex items-center justify-center rounded-md bg-gray-800 dark:bg-[#6A9C89] text-[white] overflow-hidden"
      aria-label="Toggle dark mode"
    >
      <div
        className={`flex absolute transition-all duration-300 ${
          theme === "light"
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-5"
        }`}
      >
        <Brightness4Icon />
      </div>

      <div
        className={`flex absolute transition-all duration-300 ${
          theme === "dark"
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-5"
        }`}
      >
        <Brightness7Icon />
      </div>
    </button>
  );
}
