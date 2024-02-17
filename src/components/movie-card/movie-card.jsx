import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card
      className="h-100 text-center"
      onClick={() => {
        onMovieClick(movie);
      }}
    >
      <Card.Img variant="top" src={movie.ImagePath} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Director}</Card.Text>
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
  onMovieClick: PropTypes.func.isRequired,
};
