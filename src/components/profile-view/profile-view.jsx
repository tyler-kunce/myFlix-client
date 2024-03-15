import { useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const ProfileView = ({ user, token, movies, setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');

  const favoriteMovies = movies.filter((m) =>
    user.FavoriteMovies.includes(m._id)
  );

  const handleUpdate = (event) => {
    event.preventDefault();

    const user = JSON.parse(localStorage.getItem('user'));

    const data = {
      Username: username,
      Email: email,
      Birthdate: birthdate,
    };

    fetch(
      `https://sports-movies-b0988f99dc86.herokuapp.com/users/${user.Username}`,
      {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          alert('Update successful');
        } else {
          alert('Update failed');
        }
      })
      .then((updatedUser) => {
        if (updatedUser) {
          localStorage.setItem('user', JSON.stringify(updatedUser));
          setUser(updatedUser);
        }
      });
  };

  const deregAccount = () => {
    fetch(
      `https://sports-movies-b0988f99dc86.herokuapp.com/users/${user.Username}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((response) => {
      if (response.ok) {
        setUser(null);
        alert('User de-registration successful');
        localStorage.clear();
      } else {
        alert("Something didn't go right");
      }
    });
  };

  return (
    <Container>
      <Row>
        <h2>Your Favorites</h2>
        {favoriteMovies.map((movie) => {
          return (
            <Col key={movie._id}>
              <MovieCard
                movie={movie}
                setUser={setUser}
                token={token}
                user={user}
              />
            </Col>
          );
        })}
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Great Sports Movies: User Profile</Card.Title>
              <Form onSubmit={handleUpdate}>
                <Form.Group controlID="profileUsername">
                  <Form.Label>Username:</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    minLength="5"
                  />
                </Form.Group>

                <Form.Group controlID="profilePassword">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlID="profileEmail">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlID="formBirthdate">
                  <Form.Label>Birthdate:</Form.Label>
                  <Form.Control
                    type="date"
                    value={birthdate}
                    onChange={(e) => setBirthdate(e.target.value)}
                  />
                </Form.Group>
                <Button variant="success" type="submit" onClick={handleUpdate}>
                  Submit Updates!
                </Button>
                <Link to="/login">
                  <Button variant="danger" onClick={deregAccount}>
                    De-Register Your Account
                  </Button>
                </Link>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
