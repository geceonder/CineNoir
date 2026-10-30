
const movieGrid = document.querySelector("#movie-grid");


function renderMovies(movies) {
  movieGrid.innerHTML = "";

  movies.forEach(function (movie) {
    const card = document.createElement("article");
    card.className = "movie-card";

    const poster = document.createElement("img");
    poster.src = movie.poster_path
      ? "https://image.tmdb.org/t/p/w500" + movie.poster_path
      : movie.poster || "";
    poster.alt = movie.title + " poster";

    const title = document.createElement("h2");
    title.textContent = movie.title;

    const year = document.createElement("p");
    year.textContent = "Year: " +
      (movie.release_date
        ? movie.release_date.slice(0, 4)
        : movie.year || "Unknown");

    const rating = document.createElement("p");
    rating.textContent = "★ " +
      (movie.vote_average ?? movie.rating ?? "N/A") + " / 10";

    const description = document.createElement("p");
    description.textContent = movie.overview || "";

    card.append(poster, title, year, rating, description);
    movieGrid.appendChild(card);
  });
}


let allMovies = [];



async function getMovies() {
  const movieGrid = document.getElementById("movie-grid");

  movieGrid.innerHTML = "<p>Filmler yükleniyor...</p>";

  try {
    const response = await fetch("/api/movies");

    if (!response.ok) {
      throw new Error("Film verileri alınamadı.");
    }

    const data = await response.json();
    allMovies = data.results;
    renderMovies(allMovies);

  } catch (error) {
    console.error("Hata:", error.message);

    movieGrid.innerHTML = `
      <div class="error-message">
        <h3>Bir şeyler ters gitti!</h3>
        <p>Filmler yüklenemedi. İnternet bağlantını kontrol et.</p>
        <button id="retry-button">Tekrar dene</button>
      </div>
    `;

    document
      .getElementById("retry-button")
      .addEventListener("click", getMovies);

  } finally {
    console.log("Film yükleme işlemi tamamlandı.");
  }
}




getMovies();

const searchInput = document.querySelector("#movie-search");

searchInput.addEventListener("input", async function () {
  console.log("Arama çalıştı!");

  const searchText = searchInput.value.trim();

  if (searchText === "") {
    renderMovies(allMovies);
    return;
  }

  try {
    
const searchURL = `/api/search?query=${encodeURIComponent(searchText)}`;

const response = await fetch(searchURL);


    if (!response.ok) {
      throw new Error("Arama başarısız oldu.");
    }

    const data = await response.json();

if (data.results.length === 0) {
  movieGrid.innerHTML = "<p>Film bulunamadı. Başka bir film deneyebilirsin.</p>";
} else {
  renderMovies(data.results);
}

 } catch (error) {
  console.error("Hata:", error.message);

  movieGrid.innerHTML = `
    <div class="error-message">
      <h3>Bir şeyler ters gitti!</h3>
      <p>Filmler yüklenemedi. İnternet bağlantını kontrol et.</p>
      <button id="retry-button">Tekrar dene</button>
    </div>
  `;
  document
  .getElementById("retry-button")
  .addEventListener("click", getMovies);
}

finally {
  console.log("Film yükleme işlemi tamamlandı.");
}
});  

