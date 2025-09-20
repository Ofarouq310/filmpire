
export default function ListItem({category, onClick, genre}) {
    const data = category || genre;
  return (
    <li className='categories__list-items' onClick={onClick}>{data.logo} {data.title}</li>
  )
}
