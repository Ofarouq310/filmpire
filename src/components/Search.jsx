import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { searchMovie } from '../features/currentGenreOrCategory';

export default function Search() {

    const dispatch = useDispatch();
    const [query, setQuery] = useState('');
    const currentGenreOrCategory = useSelector(
        (state) => state.currentGenreOrCategory.genreOrCategoryName
    );

    useEffect(() => {
        setQuery('');
  }, [currentGenreOrCategory]);

    return (
        <div className="search">
            <div>
                <SearchIcon className="text-gray-200" />
                <input 
                    name="search input"
                    type="text"
                    placeholder="Search through thousands of movies"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && query.trim()) {
                     dispatch(searchMovie(query));
                     }
                    }}
                />
            </div>
        </div>
    )
}