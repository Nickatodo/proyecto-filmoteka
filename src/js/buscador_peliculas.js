import axios from "axios";

// API key para themoviedb.org
const API_KEY = "7ee5fc24ca1969f8996327675779dab1";

// URL base para la API de themoviedb.org
const BASE_URL = "https://api.themoviedb.org/3";

// Arreglo para almacenar todas las películas
let allMovies = [];

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


// Escuchar el evento de envío del formulario
const searchForm = document.getElementById("search-form");
searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const searchQuery = document.querySelector('input[name="searchQuery"]').value;
    buscarPeliculasPorPalabraClave(searchQuery);
});