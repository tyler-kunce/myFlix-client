import { useParams } from 'react-router';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

export const MovieView = () => {
  const movies = useSelector((state) => state.movies.data);
  const dispatch = useDispatch();

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
