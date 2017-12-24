//search ->basdeurl + "search/movie?api_key"=<KEY>&query=<search words>
//recommended ->baseurl + "movie/" + <movie_id> "recommendations?api_key=" +<KEY> ++ "&language=en=US"
let app = {
    URL: 'http://api.themoviedb.org./3/',
    imgURL: 'http://image.tmdb.org/t/p/w500/',
    init: function () {
        //focus on the text field 
        let input = document.getElementById('search-input');
        input.focus();

        setTimeout(app.addHandlers, 1234);
    },
    addHandlers: function () {
        //add the click listener
        let btn = document.getElementById('search-button');
        btn.addEventListener('click', app.runSearch);
        //add a listener for <ENTER>
        document.addEventListener('keypress', function (ev) {
            let char = ev.char || ev.charCode || ev.which;
            let str = String.fromCharCode(char);
            console.log(char, str);
            if (char == 10 || char == 13) {
                //we have enter or return key
                btn.dispatchEvent(new MouseEvent('click'));
            }
        });
    },
    runSearch: function (ev) {
        //do the fetch to get the list of movies

        console.log(ev.type);
        ev.preventDefault();
        //let page=1;
        let input = document.getElementById('search-input');
        if (input.value) {
            //code will not run if the value is an empty string
            // let url=app.URL + "search /movie?api_key=" + KEY + "&query=" + input.value;
            //input.value + "&page" + page;
            let url = `${app.URL}search/movie?api_key=${KEY}&query=${input.value}`; //same as above line of url
            fetch(url)

                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    app.showMovies(data);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    },
    showMovies: function (movies) {
        let container = document.querySelector('#search-results .content');
        let df = document.createDocumentFragment();
        movies.innerHTML = "";

        movies.results.forEach(function (movie) {
            let div = document.createElement('div');
            div.classList.add('movie');

            let img = document.createElement('img');
            img.setAttribute('src', app.imgURL + movie.poster_path);
            img.backgroundAttachment
            img.classList.add('poster');
            img.setAttribute('id', movie.id);

            let h2 = document.createElement('h2');
            h2.textContent = movie.title;
            h2.classList.add('movie-title');
            h2.setAttribute('id', movie.id);

            let p = document.createElement('p');
            p.textContent = movie.overview;
            p.classList.add('movie-desc');
            //ad click listener for getting recommended movies
            df.appendChild(div);
            df.appendChild(img);
            df.appendChild(h2);
            df.appendChild(p);
            img.addEventListener('click', app.getRecommended);
            h2.addEventListener('click', app.getRecommended);

        });
        container.appendChild(df);
    },
    getRecommended: function (ev) {
        let movieId = ev.currentTarget.getAttribute('id');
        console.log(movieId);
        let url = `${app.URL}movie/${movieId}/recommendations?api_key=${KEY}&language=en=US`; //same as above line of url
        //recommended ->baseurl + "movie/" + <movie_id> "recommendations?api_key=" +<KEY> ++ "&language=en=US"
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                app.showRecommended(data);
            })
            .catch(err => {
                console.log(err);
            })
    },
    showRecommended: function (movies) {
          document.getElementById('search-results').classList.remove('active');
            document.getElementById('recommend-results').classList.add('active');
        console.log(movies);
        let container = document.querySelector('#recommend-results .content');
        let df = document.createDocumentFragment();
        movies.innerHTML = "";
        movies.results.forEach(function (movie) {
            let div = document.createElement('div');
            div.classList.add('movie');

            let img = document.createElement('img');
            img.setAttribute('src', app.imgURL + movie.poster_path);
            img.backgroundAttachment
            img.classList.add('poster');
            img.setAttribute('id', movie.id);

            let h2 = document.createElement('h2');
            h2.textContent = movie.title;
            h2.classList.add('movie-title');
            h2.setAttribute('id', movie.id);

            let p = document.createElement('p');
            p.textContent = movie.overview;
            p.classList.add('movie-desc');
            //ad click listener for getting recommended movies
            df.appendChild(div);
            df.appendChild(img);
            df.appendChild(h2);
            df.appendChild(p);

        });
        container.appendChild(df);
    }
};


document.addEventListener('DOMContentLoaded', app.init);
//DOMContentLoaded listener
//get image config info with fetch
//autofocus on text field


//click listener on search butoon


// keypress listener for enter






//both click and enter call search function 

// Do a fetch call to run the search 

// handle the result - build a list of movies

// new movie content has click listener
//click movie to do a fetch call for recommended
//with recommened redsults back
//navigate to recomend page
//build and display the list of movie recommendations
