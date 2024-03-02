import axios from "axios";

// API key para themoviedb.org
const API_KEY = "7ee5fc24ca1969f8996327675779dab1";

// URL base para la API de themoviedb.org
const BASE_URL = "https://api.themoviedb.org/3";

// Arreglo para almacenar todas las películas
let allMovies = [];

// Función para obtener las películas más populares
async function obtenerPeliculasPopulares() {
    try {
        // Obtener las primeras 5 páginas de películas populares
        for (let page = 1; page <= 5; page++) {
            const respuesta = await axios.get(`${BASE_URL}/movie/popular`, {
                params: {
                    api_key: API_KEY,
                    language: "es-ES",
                    page: page,
                },
            });
            allMovies.push(...respuesta.data.results);
            console.log(page)
        }

        // Mostrar las primeras 20 películas
        displayMovies(allMovies.slice(0, 20));
   
        
    } catch (error) {
        console.error("Error al obtener las películas populares. Por favor, inténtalo de nuevo más tarde.");
    }
}

// Función para mostrar las películas
function displayMovies(movies) {
    const galleryDiv = document.querySelector(".gallery");
    galleryDiv.innerHTML = ""; // Limpiar el contenido existente
    movies.forEach((movie) => {
        const movieDiv = document.createElement("div");
        movieDiv.classList.add("movie");

        const image = document.createElement("img");
        image.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        image.alt = movie.title;

        const paragraph = document.createElement("p");
        paragraph.textContent = `${movie.title} (${movie.release_date.substring(0, 4)})`;

        movieDiv.appendChild(image);
        movieDiv.appendChild(paragraph);
        galleryDiv.appendChild(movieDiv);
    });
}



// Función para buscar películas por palabra clave
async function buscarPeliculasPorPalabraClave(palabraClave) {
    try {
        // Obtener las primeras 5 páginas de películas relacionadas con la palabra clave
        for (let page = 1; page <= 5; page++) {
            const respuesta = await axios.get(`${BASE_URL}/search/movie`, {
                params: {
                    api_key: API_KEY,
                    language: "es-ES",
                    query: palabraClave,
                    page: page,
                },
            });
            allMovies = respuesta.data.results;
            console.log (page)
        }

        // Mostrar las primeras 20 películas
        displayMovies(allMovies.slice(0, 20));
        
     

    } catch (error) {
        console.error("Error al buscar películas. Por favor, inténtalo de nuevo más tarde.");
    }
}


// Función para mostrar las películas
function displayMovies(movies) {
    const galleryDiv = document.querySelector(".gallery");
    galleryDiv.innerHTML = ""; // Limpiar el contenido existente
    movies.forEach((movie) => {
        const movieDiv = document.createElement("div");
        movieDiv.classList.add("movie");

        const image = document.createElement("img");
        image.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        image.alt = movie.title;

        const paragraph = document.createElement("p");
        paragraph.textContent = `${movie.title} (${movie.release_date.substring(0, 4)})`;

        movieDiv.appendChild(image);
        movieDiv.appendChild(paragraph);
        galleryDiv.appendChild(movieDiv);
    });
}



// Escuchar el evento de envío del formulario
const searchForm = document.getElementById("search-form");
searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const searchQuery = document.querySelector('input[name="searchQuery"]').value;
    buscarPeliculasPorPalabraClave(searchQuery);
});

// Llamar a la función para obtener las películas populares
obtenerPeliculasPopulares();
