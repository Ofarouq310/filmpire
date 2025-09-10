import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import HamburgerMenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import AccountCircle from '@mui/icons-material/AccountCircle';


export default function Navbar( { toggleSidebar, setToggleSidebar, toggleMode, setToggleMode } ) {

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderBottom: '1px solid #ffffff78',
        color: '#ffffff78',
        marginLeft: 0,
        width: '50%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    }));
    
    const SearchIconWrapper = styled('div')(({ theme }) => ({
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));
    
    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        width: '100%',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            [theme.breakpoints.up('sm')]: {
                width: '18ch',
                '&:focus': {
                    width: '22ch',
                },
            },
        },
    }));
    
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
        <div className='md:w-[calc(100%-240px)] h-20 w-full md:ml-60 bg-[#1D1E2C] sm:p-5 p-3 flex items-center justify-between text-white text-2xl font-bold fixed top-0 z-10'>
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

        <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              inputProps={{ 'aria-label': 'search' }}
            />
        </Search>
        
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
