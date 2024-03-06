// API key para themoviedb.org
const API_KEY = "7ee5fc24ca1969f8996327675779dab1";

// URL base para la API de themoviedb.org
const BASE_URL = "https://api.themoviedb.org/3";
// Función para obtener los detalles de una película por su ID
async function obtenerDetallesPelicula(idPelicula) {
    try {
        const respuesta = await axios.get(`${BASE_URL}/movie/${idPelicula}`, {
            params: {
                api_key: API_KEY,
                language: "es-ES",
            },
        });
        return respuesta.data;
    } catch (error) {
        console.error("Error al obtener los detalles de la película:", error);
        return null;
        
    }
    
}

// Función para mostrar los detalles de la película en el modal
function mostrarDetallesPelicula(pelicula) {
    const modal = document.getElementById("modal");
    const detallesPeliculaDiv = document.getElementById("movie-details");
console.log(mostrarDetallesPelicula);
    // Limpiar el contenido existente
    detallesPeliculaDiv.innerHTML = "";

    // Crear elementos para el título, el año, la imagen y la descripción
    const tituloElemento = document.createElement("h2");
    tituloElemento.textContent = pelicula.title;

    const anioElemento = document.createElement("p");
    anioElemento.textContent = `Año: ${pelicula.release_date.substring(0, 4)}`;

    const imagenElemento = document.createElement("img");
    imagenElemento.src = `https://image.tmdb.org/t/p/w400${pelicula.poster_path}`;
    imagenElemento.alt = pelicula.title;

    const descripcionElemento = document.createElement("p");
    descripcionElemento.textContent = pelicula.overview;

    // Agregar elementos al div de detallesPelicula
    detallesPeliculaDiv.appendChild(tituloElemento);
    detallesPeliculaDiv.appendChild(anioElemento);
    detallesPeliculaDiv.appendChild(imagenElemento);
    detallesPeliculaDiv.appendChild(descripcionElemento);

    // Mostrar el modal
    modal.classList.remove("is-hidden");

}

// Evento para hacer clic en una película
document.querySelector(".gallery").addEventListener("click", async (evento) => {
    if (evento.target.tagName === "IMG") {
        const idPelicula = evento.target.parentElement.id;
        const pelicula = await obtenerDetallesPelicula(idPelicula);
        if (pelicula) {
            mostrarDetallesPelicula(pelicula);
        }
    }
});

// Evento para cerrar el modal
document.querySelector("[data-modal-close]").addEventListener("click", () => {
    document.getElementById("modal").classList.add("is-hidden");
});
