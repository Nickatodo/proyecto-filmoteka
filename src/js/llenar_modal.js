import { allMov } from './peliculas_populares';

setTimeout(() => {
    
    const gallery = document.querySelector(".gallery");

    gallery.addEventListener("click", abriendo);
    
    function abriendo(e) {
        let movieId = e.target.parentElement.id;

        allMov.forEach((movie) => { 
            if (movie.id == movieId) {

                const movieImage = document.querySelector(".movie_img");
                movieImage.src = `https://image.tmdb.org/t/p/w300${movie.poster_path}`;
                movieImage.alt = movie.title
                
                const movieTitle = document.querySelector(".information__title");
                movieTitle.textContent = `${movie.title}`;

                const movieVote = document.querySelector(".vote");
                movieVote.textContent = `${movie.vote_average} / ${ movie.vote_count}`;

                const moviePopu = document.querySelector(".popu");
                moviePopu.textContent = `${movie.popularity}`;
                
                const movieO_title = document.querySelector(".o_title");
                movieO_title.textContent = `${movie.original_title}`;
                
                const movieGenre = document.querySelector(".genre");
                movieGenre.textContent = `${movie.genre_ids}`;
                
                const movieAbout = document.querySelector(".information__about-text");
                movieAbout.textContent = `${movie.overview}`;

            }
        });

    }

}, 150);