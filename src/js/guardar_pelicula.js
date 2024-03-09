// Para seleccionar todos los botones con clase 'watched-button'
const watchedButtons = document.querySelectorAll('.watched-button');

// Se le agrega a cada boton el event listener
watchedButtons.forEach(button => { 
  button.addEventListener('click', function () {
    const movieId = document.querySelector(".information__id").innerText;
    const movieTitle = document.querySelector(".information__title").innerText;  
    const movieImg = document.querySelector(".movie_img").src;
        markAsWatched(); // Llama a markAsWatched con el titulo de la pelicula
        this.disabled = true; //Deshabilita el boton para evitar mas clicks
        this.classList.add('clicked');
        marcarComoFavorita(movieId,movieTitle,movieImg);
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
    const movieId = document.querySelector(".information__id").innerText;
    const movieTitle = document.querySelector(".information__title").innerText;
    const movieImg = document.querySelector(".movie_img").innerText;

      
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

function marcarComoFavorita(id,title,img) {
  let favoritas = JSON.parse(localStorage.getItem('peliculasFavoritas')) || [];

  // Verificar si la película ya está marcada como favorita
  if (favoritas.includes(id)) {
     alert('Esta película ya está marcada como favorita.');
     return;
   }

  dattos = [id, title, img];
  console.log(dattos);
  favoritas.push(dattos);
  localStorage.setItem('peliculasFavoritas', JSON.stringify(favoritas));
  // alert('Película marcada como favorita.');
}