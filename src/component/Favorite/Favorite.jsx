import './Favorite.css'

const Favorite = ( { favorite } ) => {
  const { timezone} = favorite
  return (
    <div className="fav-item">
      <span className="item-name">{timezone}</span>
    </div>
  )
}

export default Favorite