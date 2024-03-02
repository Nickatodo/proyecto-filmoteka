const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '31105a6b8ebd34e8f5577c23e6678fa8'; 

'use strict';

const searchingBox = document.querySelector('.searching-box');
const searchQuery = document.querySelector('input[name="searchQuery"]');
const upBtn = document.querySelector('.up-btn');
const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const clear = elems => [...elems.children].forEach(div => div.remove());
const loadBtn = document.querySelector('.load-more');
const lightbox = () => new SimpleLightbox('.gallery a', {});
let perPage = 40;
let page = 0;
let query = searchQuery.value;

loadBtn.style.display = 'none';
upBtn.style.display = 'none';

async function fetchMovies(query, page) {
  try {
    const response = await axios.get(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function eventHandler(ev) {
  ev.preventDefault();
  clear(gallery);
  loadBtn.style.display = 'none';
  page = 1;
  query = searchQuery.value;
  console.log(query);
  fetchMovies(query, page)
    .then(data => {
      console.log(`Number of results: ${data.results.length}`);
      console.log(`Total results: ${data.total_results}`);
      let totalPages = Math.ceil(data.total_results / perPage);
      console.log(`Total pages: ${totalPages}`);

      if (data.results.length > 0) {
        Notiflix.Notify.success(`Hooray! We found ${data.total_results} movies.`);
        renderGallery(data.results);
        console.log(`Current page: ${page}`);
        lightbox();
        upBtn.style.display = 'block';
        upBtn.addEventListener('click', () => {
          searchingBox.scrollIntoView({
            behavior: 'smooth',
          });
        });

        if (page < totalPages) {
          loadBtn.style.display = 'block';
        } else {
          loadBtn.style.display = 'none';
          console.log('There are no more movies');
          Notiflix.Notify.info(
            "We're sorry, but you've reached the end of search results."
          );
        }
      } else {
        Notiflix.Notify.failure(
          'Sorry, there are no movies matching your search query. Please try again.'
        );
        clear(gallery);
      }
    })
    .catch(error => console.log(error));
}

searchForm.addEventListener('submit', eventHandler);

function renderGallery(results) {
  const markup = results
    .map(movie => {
      return `<div class="movie-card">
        <a class="gallery__item" href="#"><img class="gallery__image" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" loading="lazy" /></a>
        <div class="info">
          <p class="info-item"><b>Title:</b> ${movie.title}</p>
          <p class="info-item"><b>Release Date:</b> ${movie.release_date}</p>
          <p class="info-item"><b>Overview:</b> ${movie.overview}</p>
          <p class="info-item"><b>Popularity:</b> ${movie.popularity}</p>
        </div>
      </div>`;
    })
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
}

loadBtn.addEventListener(
  'click',
  () => {
    query = searchQuery.value;
    console.log('load more movies');
    page += 1;
    fetchMovies(query, page).then(data => {
      let totalPages = Math.ceil(data.total_results / perPage);
      renderGallery(data.results);
      const { height: cardHeight } = document
        .querySelector('.gallery')
        .firstElementChild.getBoundingClientRect();

      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
      lightbox().refresh();
      console.log(`Current page: ${page}`);

      if (page >= totalPages) {
        loadBtn.style.display = 'none';
        console.log('There are no more movies');
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
      }
    });
  },
  true
);
