import axios from "axios";

// API key para themoviedb.org
const API_KEY = "7ee5fc24ca1969f8996327675779dab1";

// URL base para la API de themoviedb.org
const BASE_URL = "https://api.themoviedb.org/3";

// Arreglo para almacenar todas las películas
let allMovies = [];
let allGenres = [];

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
      
    }

    const dataGenres = await axios.get(`${BASE_URL}/genre/movie/list`, {
      params: {
        api_key: API_KEY,
        language: "es-ES",
      },
    });
    allGenres.push(...dataGenres.data.genres);
    // Mostrar las primeras 20 películas
    //displayMovies(allMovies.slice(0, 20));
    
    // ****************

    const data = [...allMovies];// Tu conjunto de datos
    let itemsPerPage = 20; // Número de elementos por página
    let currentPage = 1; // Página actual

    // Función para renderizar los datos de la página actual
    function renderData() {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const currentData = data.slice(startIndex, endIndex);

      const dataContainer = document.getElementById('data-container');
      dataContainer.innerHTML = ''; // Limpiar contenedor de datos

      currentData.forEach(item => {
      const div = document.createElement('div');
      div.textContent = item;
      }); 
      return currentData;
    }
  
    // Función para renderizar la paginación
    function renderPagination() {
      const totalPages = Math.ceil(data.length / itemsPerPage);
      const paginationContainer = document.getElementById('pagination-container');
      paginationContainer.innerHTML = ''; // Limpiar contenedor de paginación

      // Agregar flecha para pagina anterior
      const prevButton = document.createElement('button');
      prevButton.textContent = '<';
      prevButton.classList.add('pagination-button');
      prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
          currentPage--;
          renderData();
          renderPagination();
        }
      });
      paginationContainer.appendChild(prevButton);

      const firstButton = document.createElement('button');
        firstButton.textContent = '1';
        firstButton.classList.add('pagination-button');
        firstButton.addEventListener('click', () => {
        currentPage = 1;
        renderData();
        renderPagination();
      });
      paginationContainer.appendChild(firstButton);

      if (currentPage > 3) {
        const ellipsis1 = document.createElement('span');
        ellipsis1.textContent = '...';
        paginationContainer.appendChild(ellipsis1);
      }

      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
      const button = document.createElement('button');
      button.textContent = i;
      button.classList.add('pagination-button');
      if (i === currentPage) {
        button.classList.add('current-page'); // Agregar clase CSS para la página actual
      }
      button.addEventListener('click', () => {
        currentPage = i;
        renderData();
        renderPagination();
      });
      paginationContainer.appendChild(button);
      }

      if (currentPage < totalPages - 2) {
        const ellipsis2 = document.createElement('span');
        ellipsis2.textContent = '...';
        paginationContainer.appendChild(ellipsis2);
      }

      if (totalPages > 1) {
        const lastButton = document.createElement('button');
        lastButton.textContent = totalPages;
        lastButton.classList.add('pagination-button');
        lastButton.addEventListener('click', () => {
          currentPage = totalPages;
          renderData();
          renderPagination();
        });
        paginationContainer.appendChild(lastButton);
      }
      // Agregar flecha para pagina siguiente
      const nextButton = document.createElement('button');
      nextButton.textContent = '>';
      nextButton.classList.add('pagination-button');
      nextButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
          currentPage++;
          renderData();
          renderPagination();
        }
      });
      paginationContainer.appendChild(nextButton);

        
        displayMovies(renderData());

    }

    // Renderizar la primera página de datos y la paginación
    renderData();
    renderPagination();


    // *******************
        
  } catch (error) {
    console.error("Error al obtener las películas populares. Por favor, inténtalo de nuevo más tarde.");
  }
}

// Función para mostrar las películas
function displayMovies(movies) {
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

    const paragraph = document.createElement("p");
    paragraph.classList.add("txtTitulo");
    paragraph.textContent = `${movie.title}`;

    const paragraph2 = document.createElement("p");
    paragraph2.classList.add("txtTitulo");

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

        // Configurar la paginación
        //setupPagination();
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
        //displayMovies(allMovies.slice(0, 20));
        //return allMovies;
      
      const data = [...allMovies];// Tu conjunto de datos
      if (data.length === 0) { 
        throw new Error("erferv");
      }
      let itemsPerPage = 20; // Número de elementos por página
      let currentPage = 1; // Página actual

    // Función para renderizar los datos de la página actual
    function renderData() {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const currentData = data.slice(startIndex, endIndex);

      const dataContainer = document.getElementById('data-container');
      dataContainer.innerHTML = ''; // Limpiar contenedor de datos

      currentData.forEach(item => {
      const div = document.createElement('div');
      div.textContent = item;
      }); 
      return currentData;
    }
  
    // Función para renderizar la paginación
    function renderPagination() {
      const totalPages = Math.ceil(data.length / itemsPerPage);
      const paginationContainer = document.getElementById('pagination-container');
      paginationContainer.innerHTML = ''; // Limpiar contenedor de paginación

      // Agregar flecha para pagina anterior
      const prevButton = document.createElement('button');
      prevButton.textContent = '<';
      prevButton.classList.add('pagination-button');
      prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
          currentPage--;
          renderData();
          renderPagination();
        }
      });
      paginationContainer.appendChild(prevButton);

      const firstButton = document.createElement('button');
        firstButton.textContent = '1';
        firstButton.classList.add('pagination-button');
        firstButton.addEventListener('click', () => {
        currentPage = 1;
        renderData();
        renderPagination();
      });
      paginationContainer.appendChild(firstButton);

      if (currentPage > 3) {
        const ellipsis1 = document.createElement('span');
        ellipsis1.textContent = '...';
        paginationContainer.appendChild(ellipsis1);
      }

      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
      const button = document.createElement('button');
      button.textContent = i;
      button.classList.add('pagination-button');
      if (i === currentPage) {
        button.classList.add('current-page'); // Agregar clase CSS para la página actual
      }
      button.addEventListener('click', () => {
        currentPage = i;
        renderData();
        renderPagination();
      });
      paginationContainer.appendChild(button);
      }

      if (currentPage < totalPages - 2) {
        const ellipsis2 = document.createElement('span');
        ellipsis2.textContent = '...';
        paginationContainer.appendChild(ellipsis2);
      }

      if (totalPages > 1) {
        const lastButton = document.createElement('button');
        lastButton.textContent = totalPages;
        lastButton.classList.add('pagination-button');
        lastButton.addEventListener('click', () => {
          currentPage = totalPages;
          renderData();
          renderPagination();
        });
        paginationContainer.appendChild(lastButton);
      }
      // Agregar flecha para pagina siguiente
      const nextButton = document.createElement('button');
      nextButton.textContent = '>';
      nextButton.classList.add('pagination-button');
      nextButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
          currentPage++;
          renderData();
          renderPagination();
        }
      });
      paginationContainer.appendChild(nextButton);

        
        displayMovies(renderData());

    }

    // Renderizar la primera página de datos y la paginación
    renderData();
    renderPagination();


    // *******************

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
