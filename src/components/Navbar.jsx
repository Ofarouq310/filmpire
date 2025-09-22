import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import HamburgerMenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Search from '../components/Search';


export default function Navbar( { toggleSidebar, setToggleSidebar, toggleMode, setToggleMode } ) {
    
    const HamburgerWrapper = styled('div')(({ theme }) => ({
        cursor: 'pointer',
        display: 'flex',
        ":hover": {
            traform: 'scale(1.1)',
            transition: 'all 0.3s ease-in-out',
        },
        '@media (min-width: 768px)' : {
            display: 'none',
        }, 
    }));
    
    
    function handleToggleSidebar() {
        setToggleSidebar(prev => !prev);
    }

    function handleToggleMode() {
        setToggleMode((prevMode) => {
            return prevMode === 'dark' ? 'light' : 'dark';
    });
    }

    
    return (
        <div className='md:w-[calc(100%-240px)] h-20 w-full md:ml-60 bg-secondary-color sm:p-5 p-3 flex items-center justify-between text-white text-2xl font-bold fixed top-0 z-10'>
        <div className='sm:flex-row flex-col-reverse flex flex-wrap-reverse gap-3 items-center'>
            <HamburgerWrapper onClick={handleToggleSidebar}>
                <HamburgerMenuIcon />
            </HamburgerWrapper>
            <div onClick={handleToggleMode} className='cursor-pointer'>
                {toggleMode === 'dark' ?
                    <Brightness7Icon /> : <Brightness4Icon /> 
                }
            </div>
        </div>
        
        <Search />
        
        <div className='flex-col-reverse flex flex-wrap sm:flex-row items-center justify-center text-center gap-0.5'>
            <Button variant="text" color='inherit'
            >
            Login
            </Button>
            <AccountCircle fontSize='medium' style={{cursor:'pointer'}} />
        </div>
    </div>
  )
}
