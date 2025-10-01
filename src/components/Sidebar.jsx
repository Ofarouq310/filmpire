import { categories, genres } from '../constants';
import ListItem from './ListItem';
import { selectGenreOrCategory, resetState }  from '../features/currentGenreOrCategory'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Sidebar( { setToggleSidebar, toggleSidebar } ) {

  const dispatch = useDispatch();

  const handlClick= (category) => {
    dispatch(selectGenreOrCategory(category));
    setToggleSidebar(false);
  }

  return (
    <div className={`
        fixed z-9 top-0 left-0 h-full w-60 bg-primary-color shadow-lg
        transform transition-transform duration-300 ease-in-out
        ${toggleSidebar ? "translate-x-0 max-md:top-20" : "-translate-x-full"}
        md:translate-x-0
    fixed w-0 md:w-60 h-dvh bg-primary-color overflow-y-scroll scrollbar-class`}>
      
        <Link to={`/`} onClick={() => {dispatch(resetState());}}>
      <div className='w-full text-center p-10 border-b-2 border-[#b5bec638] flex items-center justify-center'>
          <img
            src="/icon.png"
            alt="logo"
            className='size-6 mx-auto mr-1'
            />
          <h1 className='uppercase text-4xl text-white font-black'>
            Fil
            <span className='text-transparent bg-clip-text bg-no-repeat bg-center bg-cover bg-[url("/icon.png")]'>m</span>
            pire
          </h1>
        </div>
        </Link>

      <section className='py-5 text-white border-b-2 border-[#b5bec638]'>
        <h2 className='mb-3 text-tertiary-color text-base px-4 '>Categories</h2>
        <ul className='space-y-1 text-lg'>
          {
          categories.map((category) => (
            (
            <ListItem key={category.title} category={category} onClick= {()=> handlClick(category.label)} />
          )))
          }
        </ul>
      </section>

      <section className='py-5 text-white border-b-2 border-[#b5bec638]'>
        <h2 className='mb-3 text-tertiary-color text-base px-4 '>Genres</h2>
        <ul className='space-y-1 text-lg'>
          {
            genres.map((genre) => (
            <ListItem key={genre.title} genre={genre}  onClick= {()=> handlClick(genre.id)} />
            ))
          }
        </ul>
      </section>
    </div>
  )
}
