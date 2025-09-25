import { useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Outlet } from 'react-router-dom';

export default function App() {

  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [toggleMode, setToggleMode]  = useState('dark');

  return (
    <>
      <header>
        <Navbar toggleSidebar={toggleSidebar} setToggleSidebar={setToggleSidebar} toggleMode={toggleMode} setToggleMode={setToggleMode} />  
      </header>
      <Sidebar toggleSidebar={toggleSidebar} />
      
      <main>
        <Outlet />
      </main>
    </>
  )
}
