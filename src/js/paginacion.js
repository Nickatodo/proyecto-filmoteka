import { allMov } from './peliculas_populares';
import { displayMovies } from './peliculas_populares';

setTimeout(() => {
  const data = [...allMov];// Tu conjunto de datos
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
    //dataContainer.appendChild(div);
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

      console.log(renderData());
      displayMovies(renderData());

  }

  // Renderizar la primera página de datos y la paginación
  renderData();
  renderPagination();


}, 650);

