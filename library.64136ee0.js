let e=[],t=[],l=[],o=[],a=[];if(localStorage.getItem("generos")?l=JSON.parse(localStorage.getItem("generos")):console.log("El dato no existe en localStorage."),localStorage.getItem("watched")?e=JSON.parse(localStorage.getItem("watched")):console.log("El dato no existe en localStorage."),localStorage.getItem("peliculas")){let l=JSON.parse(localStorage.getItem("peliculas"));for(const o in e)for(let a=0;a<l.length;a++)e[o]==l[a].id&&t.push(l[a])}else console.log("El dato no existe en localStorage.");if(localStorage.getItem("queue")?o=JSON.parse(localStorage.getItem("queue")):console.log("El dato no existe en localStorage."),localStorage.getItem("peliculas")){let e=JSON.parse(localStorage.getItem("peliculas"));for(const t in o)for(let l=0;l<e.length;l++)o[t]==e[l].id&&a.push(e[l])}else console.log("El dato no existe en localStorage.");function n(e){const t=document.querySelector(".gallery");t.innerHTML="",e.forEach((e=>{const o=document.createElement("li");o.setAttribute("data-modal-open",""),o.classList.add("gallery__item"),o.setAttribute("id",`${e.id}`);const a=document.createElement("img");a.src=`https://image.tmdb.org/t/p/w400${e.poster_path}`,a.alt=e.title;const n=document.createElement("h3");n.classList.add("movie-tittle"),n.textContent=`${e.title}`;const s=document.createElement("p");s.classList.add("movie-gender");for(const t in l)for(let o=0;o<e.genre_ids.length;o++)l[t].id==e.genre_ids[o]&&s.append(`${l[t].name} `);s.append(`| (${e.release_date.substring(0,4)})`),o.appendChild(a),o.appendChild(n),o.appendChild(s),t.appendChild(o)}))}n(t);const s=document.getElementById("watched"),c=document.getElementById("queue");s.addEventListener("click",(async e=>{e.preventDefault(),n(t),s.classList.toggle("button_selected"),c.classList.toggle("button_selected")})),c.addEventListener("click",(async e=>{e.preventDefault(),n(a),s.classList.toggle("button_selected"),c.classList.toggle("button_selected")}));
//# sourceMappingURL=library.64136ee0.js.map
