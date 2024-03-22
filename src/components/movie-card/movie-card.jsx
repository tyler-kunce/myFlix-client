import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Row, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const MovieCard = ({ movie, user, token, setUser }) => {
  const storedToken = localStorage.getItem('token');
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    if (user.FavoriteMovies && user.FavoriteMovies.includes(movie._id)) {
      setFavorite(true);
    }
  }, [user]);

  const addFavMovie = () => {
    fetch(
      `https://sports-movies-b0988f99dc86.herokuapp.com/users/${user.Username}/movies/${movie._id}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log("We couldn't add your favorite movie");
        }
      })
      .then((user) => {
        if (user) {
          alert('A new movie was added to your favorites!');
          localStorage.setItem('user', JSON.stringify(user));
          setUser(user);
          setFavorite(true);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  const delFavMovie = () => {
    fetch(
      `https://sports-movies-b0988f99dc86.herokuapp.com/users/${user.Username}/movies/${movie._id}`,
      { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("We couldn't remove it");
        }
      })
      .then((user) => {
        if (user) {
          alert('You deleted a movie from your favorites!');
          localStorage.setItem('user', JSON.stringify(user));
          setUser(user);
          setFavorite(false);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <Card className="h-100 text-center">
      <Card.Img variant="top" src={movie.ImagePath} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Director}</Card.Text>
      </Card.Body>
      <Card.Body>
        <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
          <Button variant="link">Open</Button>
        </Link>
      </Card.Body>
      <Card.Body>
        {!favorite ? (
          <Button variant="success" onClick={addFavMovie}>
            Add?
          </Button>
        ) : (
          <Button variant="danger" onClick={delFavMovie}>
            Remove?
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string,
    Director: PropTypes.string,
  }).isRequired,
};
