const API_KEY = "790229c3";
const d = document;
const principal = d.querySelector('#principal');
const button = d.getElementById("buscar");
const form =  document.getElementById('form');
const search = document.getElementById('search');
let listado = [];

if (localStorage.saved) {
  listado = JSON.parse(localStorage.saved);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  getMovies('https://www.omdbapi.com/?s='+searchTerm+'&apikey=790229c3')
})

function getMovies(url) {
lastUrl = url;
  fetch(url)
  .then(res => res.json())
  .then(data => {
      console.log(data.Search)
      showMovies(data.Search);
  })
}

function showMovies(data) {
  principal.innerHTML = '';
  data.forEach(movie => {
      const {Title, Poster, Year, imdbID} = movie;
      const div = d.createElement('div');
      div.className = "tarjetita col-sm-6 col-lg-3 mb-3 m-sm-4 text-center p-2 d-inline-block";

      let h2 = d.createElement('h2');
      h2.innerHTML = Title;

      let p = d.createElement('p');
      p.innerHTML = Year;

      let img = d.createElement('img');
      img.className = "img-fluid"
      img.src = Poster;

      let fav = d.createElement('button');
        fav.className = "px-3 py-2 d-block m-auto mt-3 boton";
        if (listado.includes(imdbID)){
            fav.className = "fa fa-star px-3 py-2 d-block m-auto mt-3 boton";
          } else {
            fav.className = "far fa-star px-3 py-2 d-block m-auto mt-3 boton";
          }
    
        fav.onclick = function(){
          var indice = listado.indexOf(imdbID);
          if (indice == -1){ 
            listado.push(imdbID);
            fav.className = "fa fa-star px-3 py-2 d-block m-auto mt-3 boton";
          } else { 
            listado.splice(indice, 1);
            fav.className = "far fa-star px-3 py-2 d-block m-auto mt-3 boton";
          }
          localStorage.setItem("saved", JSON.stringify(listado));
        };

      principal.appendChild(div);
      div.appendChild(h2);
      div.appendChild(p);
      div.appendChild(img);
      div.appendChild(fav);
  })
}
