import express from 'express'
import cors from 'cors'
import axios from 'axios'



const app = express();
app.use(cors());

app.get("/api/coins", async (req, res) => {
  const vs_currency = req.query.vs_currency || "usd";
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets`,
      {
        params: { vs_currency },
        headers: { accept: "application/json" },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to fetch data from CoinGecko" });
  }
});
app.get("/api/coins/:id", async (req, res) => {
  const coinId = req.params.id;
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${coinId}`,
      {
        headers: { accept: "application/json" },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Coin data error:", error.message);
    res.status(500).json({ error: "Failed to fetch coin data" });
  }
});



app.listen(5000, () => console.log("Server running at http://localhost:5000"));
