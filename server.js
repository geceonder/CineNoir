
const express = require("express");
require("dotenv").config();

const app = express();
app.use(express.static(__dirname));
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Welcome to CineNoir!");
});


app.get("/api/movies", async (req, res) => {
  try {
    const apiKey = process.env.TMDB_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "TMDB API anahtarı bulunamadı."
      });
    }

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
    );

    if (!response.ok) {
      return res.status(response.status).json({
        error: "TMDB filmleri alınamadı."
      });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Film API hatası:", error.message);

    res.status(500).json({
      error: "Sunucu hatası oluştu."
    });
  }
});


app.get("/api/search", async (req, res) => {
  try {
    const query = req.query.query;

    if (!query) {
      return res.status(400).json({
        error: "Arama kelimesi gerekli."
      });
    }

    const apiKey = process.env.TMDB_API_KEY;

    const url = new URL("https://api.themoviedb.org/3/search/movie");
    url.searchParams.set("api_key", apiKey);
    url.searchParams.set("query", query);
    url.searchParams.set("language", "en-US");

    const response = await fetch(url);

    if (!response.ok) {
      return res.status(response.status).json({
        error: "Film araması başarısız oldu."
      });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Arama API hatası:", error.message);

    res.status(500).json({
      error: "Sunucu hatası oluştu."
    });
  }
});


app.listen(PORT, () => {
  console.log(`CineNoir server is running at http://localhost:${PORT}`);
});

