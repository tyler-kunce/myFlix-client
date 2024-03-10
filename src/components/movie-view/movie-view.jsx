import { useParams } from 'react-router';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const movie = movies.find((movie) => movie._id === movieId);

  return (
    <>
      <Row>
        <Col md={5}>
          <img src={movie.ImagePath} />
        </Col>
      </Row>
      <Row>
        <Col md={5}>
          <div>
            <span>Title: </span>
            <span>{movie.Title}</span>
          </div>
          <div>
            <span>Description: </span>
            <span>{movie.Description}</span>
          </div>
          <div>
            <span>Genre: </span>
            <span>{movie.Genre}</span>
          </div>
          <div>
            <span>Director: </span>
            <span>{movie.Director}</span>
          </div>
          <Link to={`/`}>
            <Button>Back</Button>
          </Link>
        </Col>
      </Row>
    </>
  );
};
