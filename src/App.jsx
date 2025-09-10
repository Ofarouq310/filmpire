import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { use, useState } from 'react'

export default function App() {

  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [toggleMode, setToggleMode]  = useState('dark');

  return (
    <>
      <header>
        <Navbar toggleSidebar={toggleSidebar} setToggleSidebar={setToggleSidebar} toggleMode={toggleMode} setToggleMode={setToggleMode} />  
      </header>
      <Sidebar toggleSidebar={toggleSidebar} />

      <main className='container mx-auto h-dvh'>

      </main>
    </>
  )
}
