import './Favorite.css'

const Favorite = ( { favorite } ) => {
  const { name} = favorite
  return (
    <div className="fav-item">
      <span className="item-name">{name}</span>
    </div>
  )
}

export default Favorite