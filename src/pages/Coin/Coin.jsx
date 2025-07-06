import React, { useContext, useEffect, useState } from 'react'
import './Coin.css'
import { useParams } from "react-router-dom"
import { Coincontext } from "../../context/Coincontext";
import Linechart from "../../components/Linechart/Linechart";
const Coin = () => {
  const { coinId } = useParams();
  const [coindata, setcoindata] = useState();
  const [historicaldata, sethistoricaldata] = useState();
  const {currency}=useContext(Coincontext)
  const fetchCoinData = async () => {
    const options = { method: "GET", headers: { accept: "application/json" } };

    await fetch(`http://localhost:5000/api/coins/${coinId}`, options)
      .then((res) => res.json())
      .then((res) => setcoindata(res))
      .catch((err) => console.error(err));
  }
  const fetchhistory = async () => {
    const options = { method: "GET", headers: { accept: "application/json" } };

    await fetch(`http://localhost:5000/api/coins/history/${coinId}`, options)
      .then((res) => res.json())
      .then((res) => sethistoricaldata(res))
      .catch((err) => console.error(err));
  };
  
  useEffect(() => {
    fetchCoinData();
    fetchhistory();
  }, [currency])
  if ((coindata && historicaldata)) {
    return (
      <div className="coin">
        <div className="coin-name">
          <img src={coindata.image.large} alt={coindata.name} />
          <p>
            <b>
              {coindata.name}({coindata.symbol.toUpperCase()})
            </b>
          </p>
        </div>

        <div className="coin-chart">
          <Linechart historicaldata={historicaldata} />
        </div>
        <div className="coin-info">
          <ul>
            <li>Crypto Market Rank</li>
            <li>{coindata.market_cap_rank }</li>
          </ul>
          <ul>
            <li>Current Price</li>
            <li>{currency.symbol}{coindata.market_data.current_price['usd'].toLocaleString()}</li>
          </ul>
          <ul>
            <li>Market cap</li>
            <li>{currency.symbol}{coindata.market_data.market_cap[currency.name].toLocaleString()}</li>
          </ul>
          <ul>
            <li>24 Hour high</li>
            <li>{currency.symbol}{coindata.market_data.high_24h[currency.name].toLocaleString()}</li>
          </ul>
          <ul>
            <li>24 Hour low</li>
            <li>{currency.symbol}{coindata.market_data.low_24h[currency.name].toLocaleString()}</li>
          </ul>
        </div>
      </div>
    );
  } else {
    return (
      <div className="spinner">
        <div className="spin"></div>
      </div>
    );
  }
}

export default Coin
