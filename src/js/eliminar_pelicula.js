import Notiflix from 'notiflix';

// Para seleccionar todos los botones con clase 'watched-button'
const watchedButtons = document.querySelectorAll('.watched-button');

// Se le agrega a cada boton el event listener
watchedButtons.forEach(button => { 
  button.addEventListener('click', function () {
    const movieId = document.querySelector(".information__id").innerText;
    eliminarComoVista(movieId);
  });
});


// Para seleccionar todos los botones con clase 'watched-button'
const addToQueueButtons = document.querySelectorAll('.addToQueue-button');

// Se le agrega a cada boton el event listener
addToQueueButtons.forEach(button => {
  button.addEventListener('click', function () {
    const movieId = document.querySelector(".information__id").innerText;
    eliminarParaVer(movieId);
    });
});

function eliminarComoVista(id) {
  let watched = JSON.parse(localStorage.getItem('watched')) || [];
  // Verificar si la película ya está marcada como favorita
  if (watched.includes(id)) {
    let num = watched.indexOf(id);
    watched.splice(num, 1);
    localStorage.setItem('watched', JSON.stringify(watched));
    Notiflix.Notify.success("Pelicula eliminada en vistas.");
  }
}

function eliminarParaVer(id) {
  let queue = JSON.parse(localStorage.getItem('queue')) || [];
  // Verificar si la película ya está marcada como favorita
  if (queue.includes(id)) {
    let num = queue.indexOf(id);
    queue.splice(num, 1);
    localStorage.setItem('queue', JSON.stringify(queue));
    Notiflix.Notify.success("Pelicula eliminada para ver mas tarde.");
  }
}