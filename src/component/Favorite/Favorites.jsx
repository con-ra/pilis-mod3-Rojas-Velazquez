import Favorite from './Favorite';
import { FavoritesContext } from '../../context/FavoritesContext';
import './Favorites.css';
import { useContext } from 'react';

const Favorites = () => {
  const { favorites } = useContext(FavoritesContext);

  return (
    <div className="favorite-container">
      <h2 className="fav-title">Favorite cities</h2>

      {favorites.length === 0 ? (
        <span className="about-none">There are no cities here...</span>
      ) : (
        favorites.map((favorite) => (
          <Favorite key={favorite.id} favorite={favorite} />
        ))
      )}
    </div>
  );
};

export default Favorites;
