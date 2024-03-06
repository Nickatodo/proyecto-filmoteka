import { allMov } from './peliculas_populares';

setTimeout(() => {
    
    const gallery = document.querySelector(".gallery");
    //console.log(gallery);
    
    gallery.addEventListener("click", abriendo);
    function abriendo(e) {
        e.preventDefault();
        //console.log(gallery);

    }
    


}, 500);