export function llenarmodal(movies,genres) { 

    const gallery = document.querySelector(".gallery");

    gallery.addEventListener("click", abriendo);
    
    function abriendo(e) {
        let movieId = e.target.parentElement.id;

        movies.forEach((movie) => { 
            if (movie.id == movieId) {

                const movieId = document.querySelector(".information__id");
                movieId.textContent = `${movie.id}`;

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
                movie.genre_ids.forEach((genreId) => { 
                    for (let i = 0; i < genres.length; i++) {
                        if (genreId == genres[i].id) {
                            movieGenre.append(genres[i].name + " ");   
                            
                        }      
                    }
                });
                
                const movieAbout = document.querySelector(".information__about-text");
                movieAbout.textContent = `${movie.overview}`;

            }
        });
    }
}
