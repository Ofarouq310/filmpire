import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import HamburgerMenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Search from '../components/Search';
import { useEffect } from 'react';
import { fetchToken, createSessionID, logout } from '../utils';
import { useSelector, useDispatch } from 'react-redux';
import {setUser, logoutUser} from '../features/auth';
import { moviesApi } from '../utils';

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

    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((state) => state.auth || {});
    
useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const token = localStorage.getItem("request_token");
  const savedSession = localStorage.getItem("session_id");

  if (!savedSession && token && params.get("approved") === "true") {
    (async () => {
      const session_id = await createSessionID();
      if (session_id) {
        console.log("✅ Logged in, session:", session_id);

        window.history.replaceState({}, document.title, window.location.pathname);
        const { data: userData } = await moviesApi.get(`/account?session_id=${session_id}`);
        console.log(userData)
        dispatch(setUser({ user: userData, session_id }));
      }
    })();
  } else if (savedSession) {
    console.log("✅ Restored existing session:", savedSession);
  }
}, []);

   const handleLogout = async () => {
    const success = await logout();
    if (success) {
        console.log("Logged out ✅");
        dispatch(logoutUser());
    } else {
        console.log("Logout failed ❌");
    }};

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
            { isAuthenticated 
            ? <Button variant="text" color="inherit" onClick={handleLogout}>Logout
              <AccountCircle fontSize="medium" style={{ cursor: "pointer", marginLeft: "5px" }} />
              </Button>
            : <Button variant="text" color="inherit" onClick={fetchToken}>Login
              <AccountCircle fontSize="medium" style={{ cursor: "pointer", marginLeft: "5px" }} />
              </Button>
            }  
        </div>
    </div>
  )
}
