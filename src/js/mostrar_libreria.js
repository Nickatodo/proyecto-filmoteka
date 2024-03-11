import { hacerPaginacion } from "./paginacion_library";
import { modales } from "./modal_pelicula";
import { llenarmodal } from "./llenar_modal";

let watched = [];
let pelisvistas = [];
let generos = [];
let queue = [];
let pelisparaver = [];

// Espera a que la página se cargue completamente
window.addEventListener("load", function() {
    // Oculta el spinner después de 4 segundos
    setTimeout(function() {
        document.getElementById("loader").style.display = "none";
    }, 3000); // 4000 ms = 4 segundos
});

// SE RECUPERAN LOS GENEROS
if (localStorage.getItem('generos')) {
    generos = JSON.parse(localStorage.getItem('generos'));
} else {
    console.log('El dato no existe en localStorage.');
}

// PARA PELICULAS VISTAS
if (localStorage.getItem('watched')) {
    watched = JSON.parse(localStorage.getItem('watched'));
} else {
    console.log('El dato no existe en localStorage.');
}

if (localStorage.getItem('peliculas')) {
    let movies = JSON.parse(localStorage.getItem('peliculas'));
    for (const id in watched) {
        for (let i = 0; i < movies.length; i++) {
            if (watched[id] == movies[i].id) {
                pelisvistas.push(movies[i]);
            }
        }
    }
} else {
    console.log('El dato no existe en localStorage.');
}

// PARA PELICULAS POR VER
if (localStorage.getItem('queue')) {
    queue = JSON.parse(localStorage.getItem('queue'));
} else {
    console.log('El dato no existe en localStorage.');
}

if (localStorage.getItem('peliculas')) {
    let movies = JSON.parse(localStorage.getItem('peliculas'));
    for (const id in queue) {
        for (let i = 0; i < movies.length; i++) {
            if (queue[id] == movies[i].id) {
                pelisparaver.push(movies[i]);
            }
        }
    }
} else {
    console.log('El dato no existe en localStorage.');
}

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

        for (const id in generos) {
            for (let i = 0; i < movie.genre_ids.length; i++) {
                if (generos[id].id == movie.genre_ids[i]) {
                    paragraph2.append(`${generos[id].name} `);
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
    llenarmodal(movies,generos);
}

hacerPaginacion(pelisvistas);

//displayMovies(pelisvistas);

const btnwatched = document.getElementById("watched");
const btnqueue = document.getElementById("queue");

btnwatched.addEventListener("click", async (event) => {
    event.preventDefault(); // Evitar que se recargue la página
    displayMovies(pelisvistas);
    btnwatched.classList.toggle("button_selected");
    btnqueue.classList.toggle("button_selected");
});

btnqueue.addEventListener("click", async (event) => {
    event.preventDefault(); // Evitar que se recargue la página
    displayMovies(pelisparaver);
    btnwatched.classList.toggle("button_selected");
    btnqueue.classList.toggle("button_selected");
});

