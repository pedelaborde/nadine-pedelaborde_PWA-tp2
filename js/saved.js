let listado = JSON.parse(localStorage.saved);
const d = document;
const lista = d.querySelector('#lista');

for (let item of listado){
    fetch('http://www.omdbapi.com/?i=' + item + '&apikey=790229c3')
        .then(response => response.json())
        .then(data => {
            let div = d.createElement('div');
            div.className = "tarjetita col-sm-6 col-lg-4 mb-3 m-sm-5 text-center p-3 d-inline-block";

            let h2 = d.createElement('h2');
            h2.innerHTML = data['Title'];

            let p = d.createElement('p');
            p.innerHTML = data['Year'];

            let img = d.createElement('img');
            img.className = "img-fluid"
            img.src = data['Poster'];

            let button = d.createElement('button');
            button.className = "fa fa-star px-3 py-2 d-block m-auto mt-3 favo";
        
            button.onclick = function(){
                var indice = listado.indexOf(data['imdbID']);
                listado.splice(indice, 1);
                this.parentNode.remove();
                localStorage.setItem("saved", JSON.stringify(listado));
              };
 
            lista.appendChild(div);
            div.appendChild(h2);
            div.appendChild(p);
            div.appendChild(img);
            div.appendChild(button);
        })
}