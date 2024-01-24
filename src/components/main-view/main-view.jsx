import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([
        {
            id: 1,
            title: "Without Limits",
            description: "The life of renowned runner Steve Prefontaine and his relationship with legendary coach Bill Bowerman.",
            genre: "Biographical",
            director: "Robert Towne",
            image: "https://m.media-amazon.com/images/I/91YC3FdMc8L._AC_UY218_.jpg"
        },
        {
            id: 2,
            title: "Rudy",
            description: "Rudy has always been told that he was too small to play college football. But he is determined to overcome the odds and fulfill his dream of playing for Notre Dame.",
            genre: "Drama",
            director: "David Anspaugh",
            image: "https://m.media-amazon.com/images/I/81ictuM2oLL._AC_UY218_.jpg"
        },
        {
            id: 3,
            title: "The Replacements",
            description: "During a pro football strike, the owners hire substitute players.",
            genre: "Comedy",
            director: "Howard Deutch",
            image: "https://m.media-amazon.com/images/I/81btY-YR8mL._AC_UY218_.jpg"
        }
    ]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    if (selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        );
    }

    if (movies.length === 0) {
        return <div>The list is empty!</div>;
    }

    return (
        <div>
            {movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }}
                />
            ))}
        </div>
    );
};