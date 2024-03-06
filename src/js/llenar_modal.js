import { allMov } from './peliculas_populares';

setTimeout(() => {
    
    const gallery = document.querySelector(".gallery");

    
    gallery.addEventListener("click", abriendo);
    function abriendo(e) {
        e.preventDefault();
        console.log(e.target.offsetParent);
        console.log(e.target.offsetParent.querySelector(".class"));

    }
    


}, 500);