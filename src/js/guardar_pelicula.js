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
    alert('Esta película ya está marcada como vista.');
    return;
   }
  watched.push(id);
  localStorage.setItem('watched', JSON.stringify(watched));
}

function marcarParaVer(id) {
  let queue = JSON.parse(localStorage.getItem('queue')) || [];
  // Verificar si la película ya está marcada como favorita
  if (queue.includes(id)) {
    alert('Esta película ya está marcada como para ver.');
    return;
   }
  queue.push(id);
  localStorage.setItem('queue', JSON.stringify(queue));
}