import Notiflix from 'notiflix';

// Para seleccionar todos los botones con clase 'watched-button'
const watchedButtons = document.querySelectorAll('.watched-button');

// Se le agrega a cada boton el event listener
watchedButtons.forEach(button => { 
  button.addEventListener('click', function () {
    const movieId = document.querySelector(".information__id").innerText;
    marcarComoVista(movieId);
  });
});


// Para seleccionar todos los botones con clase 'watched-button'
const addToQueueButtons = document.querySelectorAll('.addToQueue-button');

// Se le agrega a cada boton el event listener
addToQueueButtons.forEach(button => {
  button.addEventListener('click', function () {
    const movieId = document.querySelector(".information__id").innerText;
    marcarParaVer(movieId);
    });
});

function marcarComoVista(id) {
  let watched = JSON.parse(localStorage.getItem('watched')) || [];
  // Verificar si la película ya está marcada como favorita
  if (watched.includes(id)) {
    Notiflix.Notify.warning('Esta pelicula ya ha sido guardada como vista.');
    return;
   }
  watched.push(id);
  localStorage.setItem('watched', JSON.stringify(watched));
  Notiflix.Notify.success("Pelicula guardada como vista.");
}

function marcarParaVer(id) {
  let queue = JSON.parse(localStorage.getItem('queue')) || [];
  // Verificar si la película ya está marcada como favorita
  if (queue.includes(id)) {
    Notiflix.Notify.warning('Esta pelicula ya ha sido guardada para ver mas tarde.');
    return;
   }
  queue.push(id);
  localStorage.setItem('queue', JSON.stringify(queue));
  Notiflix.Notify.success("Pelicula guardada para ver mas tarde.");
}