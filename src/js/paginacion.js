import { displayMovies } from './peliculas';

export function hacerPaginacion(allMovies) {
  const data = [...allMovies]; // Tu conjunto de datos
  let itemsPerPage = 20; // Número de elementos por página
  let currentPage = 1; // Página actual
  const visiblePages = 3; // Número de botones de paginación visibles

  // Función para renderizar los datos de la página actual
  function renderData() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = data.slice(startIndex, endIndex);
    return currentData;
  }

  // Función para renderizar la paginacion
  function renderPagination() {
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const paginationContainer = document.getElementById('pagination-container');
    paginationContainer.innerHTML = ''; // Limpiar contenedor de paginación

    // Calcular el rango de páginas a mostrar**
    let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    let endPage = Math.min(totalPages, startPage + visiblePages - 1);

    // Ajustar el rango de páginas si no hay suficientes páginas a la izquierda**
    if (endPage - startPage + 1 < visiblePages) {
      startPage = Math.max(1, endPage - visiblePages + 1);
    }

    // Agregar botón para retroceder página
    const prevButton = document.createElement('button');
    prevButton.textContent = '<';
    prevButton.classList.add('pagination-button');
    prevButton.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        renderPagination();
        displayMovies(renderData());
      }
    });
    paginationContainer.appendChild(prevButton);

    // Agregar botones de página
    if (startPage > 1) {
      const firstButton = document.createElement('button');
      firstButton.textContent = '1';
      firstButton.classList.add('pagination-button');
      firstButton.addEventListener('click', () => {
        currentPage = 1;
        renderPagination();
        displayMovies(renderData());
      });
      paginationContainer.appendChild(firstButton);
      if (startPage > 2) {
        const ellipsis1 = document.createElement('span');
        ellipsis1.textContent = '...';
        paginationContainer.appendChild(ellipsis1);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      const button = document.createElement('button');
      button.textContent = i;
      button.classList.add('pagination-button');
      if (i === currentPage) {
        button.classList.add('current-page'); // Agregar clase CSS para la página actual
      }
      button.addEventListener('click', () => {
        currentPage = i;
        renderPagination();
        displayMovies(renderData());
      });
      paginationContainer.appendChild(button);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        const ellipsis2 = document.createElement('span');
        ellipsis2.textContent = '...';
        paginationContainer.appendChild(ellipsis2);
      }
      const lastButton = document.createElement('button');
      lastButton.textContent = totalPages;
      lastButton.classList.add('pagination-button');
      lastButton.addEventListener('click', () => {
        currentPage = totalPages;
        renderPagination();
        displayMovies(renderData());
      });
      paginationContainer.appendChild(lastButton);
    }

    // Agregar botón para avanzar página
    const nextButton = document.createElement('button');
    nextButton.textContent = '>';
    nextButton.classList.add('pagination-button');
    nextButton.addEventListener('click', () => {
      if (currentPage < totalPages) {
        currentPage++;
        renderPagination();
        displayMovies(renderData());
      }
    });
    paginationContainer.appendChild(nextButton);

    displayMovies(renderData());
  }

  // Renderizar la primera página de datos y la paginación
  renderData();
  renderPagination();
}
