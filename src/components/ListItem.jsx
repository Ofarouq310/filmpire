import { Link } from 'react-router-dom';

export default function ListItem({category, onClick, genre}) {
    const data = category || genre;
  return (
    <Link to={`/${data.title}`}>
      <li className='categories__list-items' onClick={onClick}>{data.logo} {data.title}</li>
    </Link>
  )
}
