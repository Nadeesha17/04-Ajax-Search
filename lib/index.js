const omdbapiUrl = "http://www.omdbapi.com/";
const apiKey = "adf1f2d7";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("search-movies");
  const input = document.getElementById("movie-name");
  const movieCardsContainer = document.getElementById("movie-cards");

  function displayMovies(movies) {
    movieCardsContainer.innerHTML = ""; // Clear previous results
    movies.forEach((movie) => {
      const movieCard = document.createElement("div");
      movieCard.className = "col-lg-3 col-md-4 col-sm-6 col-12";
      movieCard.innerHTML = `
        <div class="card mb-2 movie-card">
          <img src="${movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Image"}" class="card-img-top" alt="${movie.Title}">
          <div class="card-body">
            <span class="badge bg-primary mb-2">${movie.Year}</span>
            <h5 class="card-title">${movie.Title}</h5>
          </div>
        </div>
      `;
      movieCardsContainer.appendChild(movieCard);
    });
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const movieTitle = input.value.trim();
    if (!movieTitle) return;

    movieCardsContainer.innerHTML = "<p class='text-center text-info'>🔍 Searching...</p>"; // Show loading message

    try {
      const response = await fetch(`${omdbapiUrl}?s=${encodeURIComponent(movieTitle)}&apikey=${apiKey}`);
      const data = await response.json();

      if (data.Response === "True") {
        displayMovies(data.Search);
      } else {
        movieCardsContainer.innerHTML = `<p class='text-center text-danger'>${data.Error}</p>`;
      }
    } catch (error) {
      console.error("Error fetching movie data:", error);
      movieCardsContainer.innerHTML = "<p class='text-center text-danger'>⚠️ Error fetching data. Please try again.</p>";
    }
  });
});
