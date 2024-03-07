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
        for (let page = 1; page <= 10; page++) {
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

// Obtener el div de paginación y los elementos de lista
const paginationDiv = document.getElementById("pagination");
const listItems = paginationDiv.querySelectorAll("li");

// Agregar un evento de clic a cada elemento de lista
listItems.forEach((item, index) => {
    item.addEventListener("click", () => {
        // Obtener las películas correspondientes a la página seleccionada (por ejemplo, página 1 -> películas 1-20)
        const startIndex = index * 20;
        const endIndex = startIndex + 20;
        const moviesToShow = allMovies.slice(startIndex, endIndex);

        // Mostrar las películas
        displayMovies(moviesToShow);
    });
});

// Obtener el formulario de búsqueda y el botón
const searchForm = document.getElementById("search-form");
const searchInput = document.querySelector("input[name='searchQuery']");

// Agregar un evento de envío al formulario de búsqueda
searchForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Evitar que se recargue la página

    const keyword = searchInput.value.trim(); // Obtener la palabra clave ingresada

    if (keyword) {
        // Limpiar el arreglo de películas
        allMovies = [];

        // Obtener las películas relacionadas con la palabra clave
        await obtenerPeliculasRelacionadas(keyword);

        // Configurar la paginación
        setupPagination();
    }
});

// Función para obtener las películas relacionadas con la palabra clave
async function obtenerPeliculasRelacionadas(keyword) {
    try {
        // Obtener las primeras 5 páginas de películas relacionadas con la palabra clave
        for (let page = 1; page <= 10; page++) {
            const respuesta = await axios.get(`${BASE_URL}/search/movie`, {
                params: {
                    api_key: API_KEY,
                    language: "es-ES",
                    query: keyword,
                    page: page,
                },
            });
            allMovies.push(...respuesta.data.results);
        }

        // Mostrar las primeras 20 películas
        displayMovies(allMovies.slice(0, 20));

    } catch (error) {
        console.error("Error al obtener las películas relacionadas con la palabra clave. Por favor, inténtalo de nuevo más tarde.");
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

// Función para configurar la paginación
function setupPagination() {
    const paginationDiv = document.getElementById("pagination");
    paginationDiv.innerHTML = ""; // Limpiar el contenido existente

    // Crear elementos de lista para cada página
    for (let page = 1; page <= 10; page++) {
        const listItem = document.createElement("li");
        listItem.textContent = page;
        listItem.addEventListener("click", () => {
            const startIndex = (page - 1) * 20;
            const endIndex = startIndex + 20;
            const moviesToShow = allMovies.slice(startIndex, endIndex);
            displayMovies(moviesToShow);
        });
        paginationDiv.appendChild(listItem);
    }
}


// Llamar a la función para obtener las películas populares
obtenerPeliculasPopulares();
