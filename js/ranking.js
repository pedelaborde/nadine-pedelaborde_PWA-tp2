const API_KEY = 'api_key=69ded3fe575072fb797aeb047e98179c';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const d = document;
const main = d.getElementById('ranking');


if (navigator.onLine) {
    document.getElementById("offline").classList.add("d-none");
    document.getElementById("cuerpo").classList.remove("d-none");
  } else {
    document.getElementById('offline').classList.remove('d-none');
    document.getElementById("cuerpo").classList.add('d-none');
  }

getMovies('https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&'+API_KEY);

function getMovies(url) {
    fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data.results)
        showMovies(data.results);
    })
}

function showMovies(data) {
    data.forEach(movie => {
        const {title, poster_path, vote_average} = movie;
        const div = d.createElement('div');
        div.className = "tarjetita col-sm-6 col-lg-3 mb-3 m-sm-4 text-center p-2 d-inline-block";

        let h2 = d.createElement('h2');
        h2.innerHTML = title;

        let p = d.createElement('p');
        p.innerHTML = `rating: ${vote_average}`;

        let img = d.createElement('img');
        img.className = "img-fluid"
        img.src = IMG_URL+poster_path;

        main.appendChild(div);
        div.appendChild(h2);
        div.appendChild(p);
        div.appendChild(img);
    })
}
