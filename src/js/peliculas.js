import axios from "axios";
import { modales } from './modal_pelicula';
import { llenarmodal } from "./llenar_modal";
import { hacerPaginacion } from './paginacion';


// API key para themoviedb.org
const API_KEY = "7ee5fc24ca1969f8996327675779dab1";

// URL base para la API de themoviedb.org
const BASE_URL = "https://api.themoviedb.org/3";

// Arreglo para almacenar todas las películas
let allMovies = [];
let allGenres = [];

// Función para obtener las películas más populares
export async function obtenerPeliculasPopulares() {
  try {
    // Obtener las primeras 5 páginas de películas populares
    
    for (let page = 1; page <= 350; page++) {
      const respuesta = await axios.get(`${BASE_URL}/movie/popular`, {
        params: {
          api_key: API_KEY,
          language: "es-ES",
          page: page,
        },
      });
      allMovies.push(...respuesta.data.results);
    }

    const dataGenres = await axios.get(`${BASE_URL}/genre/movie/list`, {
      params: {
        api_key: API_KEY,
        language: "es-ES",
      },
    });
  
    allGenres.push(...dataGenres.data.genres);
    localStorage.setItem('peliculas', JSON.stringify(allMovies));
    localStorage.setItem('generos', JSON.stringify(allGenres));
    hacerPaginacion(allMovies);

  } catch (error) {
    console.error("Error al obtener las películas populares. Por favor, inténtalo de nuevo más tarde.");
  }
}

// Función para mostrar las películas
export function displayMovies(movies) {
  const galleryDiv = document.querySelector(".gallery");
  galleryDiv.innerHTML = ""; // Limpiar el contenido existente
  movies.forEach((movie) => {
    const movieDiv = document.createElement("li");
    movieDiv.setAttribute("data-modal-open", "");
    movieDiv.classList.add("gallery__item");
    movieDiv.setAttribute("id", `${movie.id}`);
    
    const image = document.createElement("img");
    image.src = `https://image.tmdb.org/t/p/w400${movie.poster_path}`;
    image.alt = movie.title;

    const paragraph = document.createElement("h3");
    paragraph.classList.add("movie-tittle");
    paragraph.textContent = `${movie.title}`;

    const paragraph2 = document.createElement("p");
    paragraph2.classList.add("movie-gender");

    for (const id in allGenres) {
      for (let i = 0; i < movie.genre_ids.length; i++) { 
        if (allGenres[id].id == movie.genre_ids[i]) { 
          paragraph2.append(`${allGenres[id].name} `);
        }
      }
    }

    paragraph2.append(`| (${movie.release_date.substring(0, 4)})`);

    movieDiv.appendChild(image);
    movieDiv.appendChild(paragraph);
    movieDiv.appendChild(paragraph2);
    galleryDiv.appendChild(movieDiv);
  });

  modales();
  llenarmodal(movies,allGenres);

}

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

      
      const datos = [...allMovies];// Tu conjunto de datos
      if (datos.length === 0) { 
        throw new Error("erferv");
      }
      hacerPaginacion(datos);

  } catch (error) {

    console.error("Error al obtener las películas relacionadas con la palabra clave. Por favor, inténtalo de nuevo más tarde.");
    if (error instanceof Error) {
      const errorDiv = document.getElementById('searchResults');
      errorDiv.classList.add("txtError");
      const errorTxt = document.createElement("p");
      errorTxt.textContent = "Search result not successful. Enter the correct movie name.";
      
      errorDiv.appendChild(errorTxt);
        
    }
  }
}

// Llamar a la función para obtener las películas populares
obtenerPeliculasPopulares();
