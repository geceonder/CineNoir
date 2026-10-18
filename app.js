const movieTitle= "Inception";
console.log(movieTitle);

let movieRating = 8.8;
console.log(movieRating);

movieRating = 9.0;
console.log(movieRating);


const movieGenre = "Science Fiction";
const releaseYear = 2010;

console.log(movieGenre);
console.log(releaseYear);


console.log("Movie: " + movieTitle);
console.log("Genre: " + movieGenre);
console.log("Year: " + releaseYear);
console.log("Rating: " + movieRating);


const movieOutput = document.querySelector("#movie-output");

movieOutput.textContent =
  "Movie: " + movieTitle +
  " | Genre: " + movieGenre +
  " | Year: " + releaseYear +
  " | Rating: " + movieRating;

  
function updateMovieRating(newRating) {
  movieRating = newRating;

  movieOutput.textContent =
    "Movie: " + movieTitle +
    " | Genre: " + movieGenre +
    " | Year: " + releaseYear +
    " | Rating: " + movieRating;
}

// updateMovieRating(9.2);


const movieList =[
    {
        title:"Inception",
        rating:8.8,
        year:2010,
    },
    {
    title: "Interstellar",
    rating: 8.7,
    year: 2014,
    genre: "Science Fiction"
  },
  {
    title: "The Dark Knight",
    rating: 9.0,
    year: 2008,
    genre: "Action"
  }
];

console.log(movieList);
console.log(movieList[0].title);
console.log(movieList[1].rating);


const movieGrid = document.querySelector("#movie-grid");

movieList.forEach(function(movie) {
  const card = document.createElement("article");
  card.classList.add("movie-card");

  card.innerHTML = `
    <div class="movie-info">
      <h2>${movie.title}</h2>
      <p>Year: ${movie.year}</p>
      <p>Genre: ${movie.genre}</p>
      <p>Rating: ${movie.rating}</p>
    </div>
  `;

  movieGrid.appendChild(card);
});
