// Para seleccionar todos los botones con clase 'watched-button'
const watchedButtons = document.querySelectorAll('.watched-button');

// Se le agrega a cada boton el event listener
watchedButtons.forEach(button => { 
    button.addEventListener('click', function () {
        const movieTitle = document.querySelector("h2").innerText;
        markAsWatched(movieTitle); // Llama a markAsWatched con el titulo de la pelicula
        this.disabled = true; //Deshabilita el boton para evitar mas clicks
        this.classList.add('clicked');
        marcarComoFavorita(movieTitle);
    });
});

// Funcion para marcar como Watched
function markAsWatched(title) {
  console.log(`Marked "${title}" as watched`);
  // Aqui entonces envía al server como Watched
}

// Para seleccionar todos los botones con clase 'watched-button'
const addToQueueButtons = document.querySelectorAll('.addToQueue-button');

// Se le agrega a cada boton el event listener
addToQueueButtons.forEach(button => {
    button.addEventListener('click', function () {
        const movieTitle = document.querySelector("h2").innerText;
        addToQueue(movieTitle); // Llama a markAsWatched con el titulo de la pelicula
        this.disabled = true; //Deshabilita el boton para evitar mas clicks
        this.classList.add('clicked');
    });
});

// Funcion para marcar como Watched
function addToQueue(title) {
  console.log(`Marked "${title}" as added to queue`);
  // Aqui entonces envía al server como Watched
}

function marcarComoFavorita(id) {
  let favoritas = JSON.parse(localStorage.getItem('peliculasFavoritas')) || [];

  // Verificar si la película ya está marcada como favorita
  // if (favoritas.includes(id)) {
  //   alert('Esta película ya está marcada como favorita.');
  //   return;
  // }

  favoritas.push(id);
  localStorage.setItem('peliculasFavoritas', JSON.stringify(favoritas));
  // alert('Película marcada como favorita.');
}