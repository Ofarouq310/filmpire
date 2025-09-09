import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { useState } from 'react'

export default function App() {

  const [toggleSidebar, setToggleSidebar] = useState(false);

  return (
    <>
      <header>
        <Navbar toggleSidebar={toggleSidebar} setToggleSidebar={setToggleSidebar} />  
      </header>
      <Sidebar toggleSidebar={toggleSidebar} />

      <main className='container mx-auto h-dvh'>

      </main>
    </>
  )
}
