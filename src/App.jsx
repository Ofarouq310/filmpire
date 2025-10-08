import { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";

export default function App() {
  const [toggleSidebar, setToggleSidebar] = useState(false);

  return (
    <>
      <header>
        <Navbar
          toggleSidebar={toggleSidebar}
          setToggleSidebar={setToggleSidebar}
        />
      </header>
      <Sidebar
        toggleSidebar={toggleSidebar}
        setToggleSidebar={setToggleSidebar}
      />

      <main>
        <Outlet />
      </main>
    </>
  );
}
